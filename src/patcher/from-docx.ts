import JSZip from "jszip";
import * as XLSX from "xlsx";
import { Element, js2xml } from "xml-js";

import { IdentifierManager } from "@export/packer/identifier-manager";
import { DocumentAttributeNamespaces } from "@file/document";
import { IViewWrapper } from "@file/document-wrapper";
import { File } from "@file/file";
import { FileChild } from "@file/file-child";
import { Media } from "@file/media";
import { ConcreteHyperlink, ExternalHyperlink, ParagraphChild } from "@file/paragraph";
import { RelationshipType, TargetModeType } from "@file/relationships/relationship/relationship";
import { IContext } from "@file/xml-components";
import { uniqueId } from "@util/convenience-functions";
import { OutputByType, OutputType } from "@util/output-type";

import { Formatter } from "@export/formatter";
import { Charts } from "@file/chart/charts";
import xml from "xml";
import { appendContentType } from "./content-types-manager";
import { appendRelationship, getNextRelationshipIndex } from "./relationship-manager";
import { replacer } from "./replacer";
import { toJson } from "./util";

export type InputDataType = Buffer | string | number[] | Uint8Array | ArrayBuffer | Blob | NodeJS.ReadableStream | JSZip;

export const PatchType = {
    DOCUMENT: "file",
    PARAGRAPH: "paragraph",
} as const;

type ParagraphPatch = {
    readonly type: typeof PatchType.PARAGRAPH;
    readonly children: readonly ParagraphChild[];
};

type FilePatch = {
    readonly type: typeof PatchType.DOCUMENT;
    readonly children: readonly FileChild[];
};

type RelationshipAddition = {
    readonly key: string;
    readonly entries: readonly {
        readonly name: string;
        readonly path: string;
        readonly type: RelationshipType;
        readonly repl: string;
    }[];
};

type IHyperlinkRelationshipAddition = {
    readonly key: string;
    readonly hyperlink: { readonly id: string; readonly link: string };
};

export type IPatch = ParagraphPatch | FilePatch;

export type PatchDocumentOutputType = OutputType;

export type PatchDocumentOptions<T extends PatchDocumentOutputType = PatchDocumentOutputType> = {
    readonly outputType: T;
    readonly data: InputDataType;
    readonly patches: Readonly<Record<string, IPatch>>;
    readonly keepOriginalStyles?: boolean;
    readonly placeholderDelimiters?: Readonly<{
        readonly start: string;
        readonly end: string;
    }>;
    readonly recursive?: boolean;
};

const identifierManager = new IdentifierManager();
const UTF16LE = new Uint8Array([0xff, 0xfe]);
const UTF16BE = new Uint8Array([0xfe, 0xff]);

const compareByteArrays = (a: Uint8Array, b: Uint8Array): boolean => {
    if (a.length !== b.length) {
        return false;
    }
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            return false;
        }
    }
    return true;
};

export const patchDocument = async <T extends PatchDocumentOutputType = PatchDocumentOutputType>({
    outputType,
    data,
    patches,
    keepOriginalStyles,
    placeholderDelimiters = { start: "{{", end: "}}" } as const,
    /**
     * Search for occurrences over patched document
     */
    recursive = true,
}: PatchDocumentOptions<T>): Promise<OutputByType[T]> => {
    const zipContent = data instanceof JSZip ? data : await JSZip.loadAsync(data);
    const contexts = new Map<string, IContext>();
    const file = {
        Media: new Media(),
        Charts: new Charts(),
    } as unknown as File;

    const map = new Map<string, Element>();

    const relationshipAdditions: RelationshipAddition[] = [];
    const hyperlinkRelationshipAdditions: IHyperlinkRelationshipAddition[] = [];
    let hasMedia = false;
    let chartCount = 0;

    const binaryContentMap = new Map<string, Uint8Array>();

    for (const [key, value] of Object.entries(zipContent.files)) {
        const binaryValue = await value.async("uint8array");
        const startBytes = binaryValue.slice(0, 2);
        if (compareByteArrays(startBytes, UTF16LE) || compareByteArrays(startBytes, UTF16BE)) {
            binaryContentMap.set(key, binaryValue);
            continue;
        }

        if (!key.endsWith(".xml") && !key.endsWith(".rels")) {
            binaryContentMap.set(key, binaryValue);
            continue;
        }

        const json = toJson(await value.async("text"));

        if (key === "word/document.xml") {
            const document = json.elements?.find((i) => i.name === "w:document");
            if (document && document.attributes) {
                // We could check all namespaces from Document, but we'll instead
                // check only those that may be used by our element types.

                for (const ns of ["mc", "wp", "r", "w15", "m"] as const) {
                    document.attributes[`xmlns:${ns}`] = DocumentAttributeNamespaces[ns];
                }
                document.attributes["mc:Ignorable"] = `${document.attributes["mc:Ignorable"] || ""} w15`.trim();
            }
        }

        if (key.startsWith("word/") && !key.endsWith(".xml.rels")) {
            const context: IContext = {
                file,
                viewWrapper: {
                    Relationships: {
                        createRelationship: (
                            linkId: string,
                            _: string,
                            target: string,
                            __: (typeof TargetModeType)[keyof typeof TargetModeType],
                        ) => {
                            hyperlinkRelationshipAdditions.push({
                                key,
                                hyperlink: {
                                    id: linkId,
                                    link: target,
                                },
                            });
                        },
                    },
                } as unknown as IViewWrapper,
                stack: [],
            };
            contexts.set(key, context);

            if (!placeholderDelimiters?.start.trim() || !placeholderDelimiters?.end.trim()) {
                throw new Error("Both start and end delimiters must be non-empty strings.");
            }

            const { start, end } = placeholderDelimiters;

            for (const [patchKey, patchValue] of Object.entries(patches)) {
                const patchText = `${start}${patchKey}${end}`;
                // TODO: mutates json. Make it immutable
                // We need to loop through to catch every occurrence of the patch text
                // It is possible that the patch text is in the same run
                // This algorithm is limited to one patch per text run
                // We break out of the loop once it cannot find any more occurrences
                // https://github.com/sunertech/docx/issues/2267
                while (true) {
                    const { didFindOccurrence } = replacer({
                        json,
                        patch: {
                            ...patchValue,
                            children: patchValue.children.map((element) => {
                                // We need to replace external hyperlinks with concrete hyperlinks
                                if (element instanceof ExternalHyperlink) {
                                    const concreteHyperlink = new ConcreteHyperlink(element.options.children, uniqueId());
                                    hyperlinkRelationshipAdditions.push({
                                        key,
                                        hyperlink: {
                                            id: concreteHyperlink.linkId,
                                            link: element.options.link,
                                        },
                                    });
                                    return concreteHyperlink;
                                } else {
                                    return element;
                                }
                            }),
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        } as any,
                        patchText,
                        context,
                        keepOriginalStyles,
                    });
                    // What the reason doing that? Once document is patched - it search over patched json again, that takes too long if patched document has big and deep structure.
                    if (!recursive || !didFindOccurrence) {
                        break;
                    }
                }
            }

            const mediaDatas = identifierManager.filter(JSON.stringify(json), context.file.Media.Array, (item) => item.fileName);
            if (mediaDatas.length > 0) {
                hasMedia = true;
                relationshipAdditions.push({
                    key,
                    entries: mediaDatas.map((item) => ({
                        name: item.fileName,
                        path: "media",
                        type: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image",
                        repl: item.fileName,
                    })),
                });
            }
            const chartEntries = identifierManager.filter(JSON.stringify(json), context.file.Charts.Entries, (item) => item[0]);
            if (chartEntries.length > 0) {
                chartCount = chartEntries.length;
                relationshipAdditions.push({
                    key,
                    entries: chartEntries.map(([tempId], index) => ({
                        name: `chart${index + 1}.xml`,
                        path: "charts",
                        type: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/chart",
                        repl: tempId,
                    })),
                });
            }
            chartEntries.forEach(([_, chartWrapper], index) => {
                const chartFilepath = `word/charts/chart${index + 1}.xml`;
                relationshipAdditions.push({
                    key: chartFilepath,
                    entries: [
                        {
                            name: `Microsoft_Excel_Sheet${index + 1}.xlsx`,
                            path: "../embeddings",
                            type: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/package",
                            repl: "embedSheetId",
                        },
                    ],
                });
                // add chart xml file
                const formatter = new Formatter();
                const chartElement = toJson(
                    xml(formatter.format(chartWrapper.View, context), {
                        declaration: { encoding: "UTF-8" },
                    }),
                );
                map.set(chartFilepath, chartElement);
                // create xlsx data for chart
                const wb = XLSX.utils.book_new();
                const ws = XLSX.utils.aoa_to_sheet(chartWrapper.View.dataTable);
                XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
                const xlsxData = XLSX.writeXLSX(wb, { type: "buffer" });
                binaryContentMap.set(`word/embeddings/Microsoft_Excel_Sheet${index + 1}.xlsx`, xlsxData);
            });
        }

        map.set(key, json);
    }

    for (const { key, entries } of relationshipAdditions) {
        const lastIndex = key.lastIndexOf("/");
        const basePath = key.slice(0, lastIndex);
        const fileName = key.slice(lastIndex + 1);
        const relationshipKey = `${basePath}/_rels/${fileName}.rels`;
        const relationshipsJson = map.get(relationshipKey) ?? createRelationshipFile();
        map.set(relationshipKey, relationshipsJson);

        const index = getNextRelationshipIndex(relationshipsJson);
        const newJson = identifierManager.replace(
            JSON.stringify(map.get(key)),
            entries.map((item) => item.repl),
            index,
        );
        map.set(key, JSON.parse(newJson) as Element);

        for (let i = 0; i < entries.length; i++) {
            const { name, path, type } = entries[i];
            appendRelationship(relationshipsJson, index + i, type, `${path}/${name}`);
        }
    }

    for (const { key, hyperlink } of hyperlinkRelationshipAdditions) {
        const relationshipKey = `word/_rels/${key.split("/").pop()}.rels`;

        const relationshipsJson = map.get(relationshipKey) ?? createRelationshipFile();
        map.set(relationshipKey, relationshipsJson);

        appendRelationship(
            relationshipsJson,
            hyperlink.id,
            "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink",
            hyperlink.link,
            TargetModeType.EXTERNAL,
        );
    }

    if (hasMedia) {
        const contentTypesJson = map.get("[Content_Types].xml");

        if (!contentTypesJson) {
            throw new Error("Could not find content types file");
        }

        appendContentType(contentTypesJson, "image/png", "png");
        appendContentType(contentTypesJson, "image/jpeg", "jpeg");
        appendContentType(contentTypesJson, "image/jpeg", "jpg");
        appendContentType(contentTypesJson, "image/bmp", "bmp");
        appendContentType(contentTypesJson, "image/gif", "gif");
        appendContentType(contentTypesJson, "image/svg+xml", "svg");
    }

    if (chartCount > 0) {
        const contentTypesJson = map.get("[Content_Types].xml");

        if (!contentTypesJson) {
            throw new Error("Could not find content types file");
        }
        for (let index = 0; index < chartCount; index++) {
            appendContentType(
                contentTypesJson,
                "application/vnd.openxmlformats-officedocument.drawingml.chart+xml",
                `/word/charts/chart${index + 1}.xml`,
                "Override",
            );
        }
    }

    const zip = new JSZip();

    for (const [key, value] of map) {
        const output = toXml(value);

        zip.file(key, output);
    }

    for (const [key, value] of binaryContentMap) {
        zip.file(key, value);
    }

    for (const { data: stream, fileName } of file.Media.Array) {
        zip.file(`word/media/${fileName}`, stream);
    }

    return zip.generateAsync({
        type: outputType,
        mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        compression: "DEFLATE",
    });
};

const toXml = (jsonObj: Element): string => {
    const output = js2xml(jsonObj, {
        attributeValueFn: (str) =>
            String(str)
                .replace(/&(?!amp;|lt;|gt;|quot;|apos;)/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&apos;"), // cspell:words apos
    });
    return output;
};

const createRelationshipFile = (): Element => ({
    declaration: {
        attributes: {
            version: "1.0",
            encoding: "UTF-8",
            standalone: "yes",
        },
    },
    elements: [
        {
            type: "element",
            name: "Relationships",
            attributes: {
                xmlns: "http://schemas.openxmlformats.org/package/2006/relationships",
            },
            elements: [],
        },
    ],
});
