import JSZip from "jszip";
import * as XLSX from "xlsx";
import xml from "xml";

import { File } from "@file/file";
import { obfuscate } from "@file/fonts/obfuscate-ttf-to-odttf";

import { Formatter } from "../formatter";
import { IdentifierManager } from "./identifier-manager";
import { NumberingReplacer } from "./numbering-replacer";
import { PrettifyType } from "./packer";

export type IXmlifyedFile = {
    readonly data: string;
    readonly path: string;
};

type IXmlifyedFileMapping = {
    readonly Document: IXmlifyedFile;
    readonly Styles: IXmlifyedFile;
    readonly Properties: IXmlifyedFile;
    readonly Numbering: IXmlifyedFile;
    readonly Relationships: IXmlifyedFile;
    readonly Charts: readonly IXmlifyedFile[];
    readonly ChartsRelationships: readonly IXmlifyedFile[];
    readonly ChartsEmbeddings: readonly IXmlifyedFile[];
    readonly FileRelationships: IXmlifyedFile;
    readonly Headers: readonly IXmlifyedFile[];
    readonly Footers: readonly IXmlifyedFile[];
    readonly HeaderRelationships: readonly IXmlifyedFile[];
    readonly FooterRelationships: readonly IXmlifyedFile[];
    readonly ContentTypes: IXmlifyedFile;
    readonly CustomProperties: IXmlifyedFile;
    readonly AppProperties: IXmlifyedFile;
    readonly FootNotes: IXmlifyedFile;
    readonly FootNotesRelationships: IXmlifyedFile;
    readonly Settings: IXmlifyedFile;
    readonly Comments?: IXmlifyedFile;
    readonly CommentsRelationships?: IXmlifyedFile;
    readonly FontTable?: IXmlifyedFile;
    readonly FontTableRelationships?: IXmlifyedFile;
};

export class Compiler {
    private readonly formatter: Formatter;
    private readonly identifierManager: IdentifierManager;
    private readonly numberingReplacer: NumberingReplacer;

    public constructor() {
        this.formatter = new Formatter();
        this.identifierManager = new IdentifierManager();
        this.numberingReplacer = new NumberingReplacer();
    }

    public compile(
        file: File,
        prettifyXml?: (typeof PrettifyType)[keyof typeof PrettifyType],
        overrides: readonly IXmlifyedFile[] = [],
    ): JSZip {
        const zip = new JSZip();
        const xmlifiedFileMapping = this.xmlifyFile(file, prettifyXml);
        const map = new Map<string, IXmlifyedFile | readonly IXmlifyedFile[]>(Object.entries(xmlifiedFileMapping));

        for (const [, obj] of map) {
            if (Array.isArray(obj)) {
                for (const subFile of obj as readonly IXmlifyedFile[]) {
                    zip.file(subFile.path, subFile.data);
                }
            } else {
                zip.file((obj as IXmlifyedFile).path, (obj as IXmlifyedFile).data);
            }
        }

        for (const subFile of overrides) {
            zip.file(subFile.path, subFile.data);
        }

        for (const data of file.Media.Array) {
            if (data.type !== "svg") {
                zip.file(`word/media/${data.fileName}`, data.data);
            } else {
                zip.file(`word/media/${data.fileName}`, data.data);
                zip.file(`word/media/${data.fallback.fileName}`, data.fallback.data);
            }
        }

        for (const { data: buffer, name, fontKey } of file.FontTable.fontOptionsWithKey) {
            const [nameWithoutExtension] = name.split(".");
            zip.file(`word/fonts/${nameWithoutExtension}.odttf`, obfuscate(buffer, fontKey));
        }

        return zip;
    }

    private xmlifyFile(file: File, prettify?: (typeof PrettifyType)[keyof typeof PrettifyType]): IXmlifyedFileMapping {
        const documentRelationshipCount = file.Document.Relationships.RelationshipCount + 1;

        const documentXmlData = xml(
            this.formatter.format(file.Document.View, {
                viewWrapper: file.Document,
                file,
                stack: [],
            }),
            {
                indent: prettify,
                declaration: {
                    standalone: "yes",
                    encoding: "UTF-8",
                },
            },
        );

        const commentRelationshipCount = file.Comments.Relationships.RelationshipCount + 1;
        const commentXmlData = xml(
            this.formatter.format(file.Comments, {
                viewWrapper: {
                    View: file.Comments,
                    Relationships: file.Comments.Relationships,
                },
                file,
                stack: [],
            }),
            {
                indent: prettify,
                declaration: {
                    standalone: "yes",
                    encoding: "UTF-8",
                },
            },
        );

        const documentMediaDatas = this.identifierManager.filter(documentXmlData, file.Media.Array, (item) => item.fileName);
        const commentMediaDatas = this.identifierManager.filter(commentXmlData, file.Media.Array, (item) => item.fileName);

        return {
            Relationships: {
                data: (() => {
                    documentMediaDatas.forEach((mediaData, i) => {
                        file.Document.Relationships.createRelationship(
                            documentRelationshipCount + i,
                            "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image",
                            `media/${mediaData.fileName}`,
                        );
                    });

                    file.Charts.Entries.forEach(([_, chartWrapper], index) => {
                        file.Document.Relationships.createRelationship(
                            file.Document.Relationships.RelationshipCount + 1,
                            "http://schemas.openxmlformats.org/officeDocument/2006/relationships/chart",
                            `charts/chart${index + 1}.xml`,
                        );
                        chartWrapper.Relationships.createRelationship(
                            chartWrapper.Relationships.RelationshipCount + 1,
                            "http://schemas.openxmlformats.org/officeDocument/2006/relationships/package",
                            `../embeddings/Microsoft_Excel_Sheet${index + 1}.xlsx`,
                        );
                    });

                    file.Document.Relationships.createRelationship(
                        file.Document.Relationships.RelationshipCount + 1,
                        "http://schemas.openxmlformats.org/officeDocument/2006/relationships/fontTable",
                        "fontTable.xml",
                    );

                    return xml(
                        this.formatter.format(file.Document.Relationships, {
                            viewWrapper: file.Document,
                            file,
                            stack: [],
                        }),
                        {
                            indent: prettify,
                            declaration: {
                                encoding: "UTF-8",
                            },
                        },
                    );
                })(),
                path: "word/_rels/document.xml.rels",
            },
            Document: {
                data: (() => {
                    const xmlData = this.identifierManager.replace(
                        documentXmlData,
                        [...documentMediaDatas.map((item) => item.fileName), ...file.Charts.Entries.map(([key]) => key)],
                        documentRelationshipCount,
                    );
                    const referencedXmlData = this.numberingReplacer.replace(xmlData, file.Numbering.ConcreteNumbering);
                    return referencedXmlData;
                })(),
                path: "word/document.xml",
            },
            Charts: file.Charts.Entries.map(([_, chartWrapper], index) => ({
                data: xml(
                    this.formatter.format(chartWrapper.View, {
                        viewWrapper: file.Document,
                        file,
                        stack: [],
                    }),
                    {
                        indent: prettify,
                        declaration: {
                            encoding: "UTF-8",
                        },
                    },
                ),
                path: `word/charts/chart${index + 1}.xml`,
            })),
            ChartsRelationships: file.Charts.Entries.map(([_, chartWrapper], index) => ({
                data: xml(
                    this.formatter.format(chartWrapper.Relationships, {
                        viewWrapper: file.Document,
                        file,
                        stack: [],
                    }),
                    {
                        indent: prettify,
                        declaration: {
                            encoding: "UTF-8",
                        },
                    },
                ),
                path: `word/charts/_rels/chart${index + 1}.xml.rels`,
            })),
            ChartsEmbeddings: file.Charts.Entries.map(([_, chartWrapper], index) => {
                const wb = XLSX.utils.book_new();
                const ws = XLSX.utils.aoa_to_sheet(chartWrapper.View.dataTable);
                XLSX.utils.book_append_sheet(wb, ws, `Sheet${index + 1}`);
                const xlsxData = XLSX.writeXLSX(wb, { type: "buffer" });
                return {
                    data: xlsxData,
                    path: `word/embeddings/Microsoft_Excel_Sheet${index + 1}.xlsx`,
                };
            }),
            Styles: {
                data: (() => {
                    const xmlStyles = xml(
                        this.formatter.format(file.Styles, {
                            viewWrapper: file.Document,
                            file,
                            stack: [],
                        }),
                        {
                            indent: prettify,
                            declaration: {
                                standalone: "yes",
                                encoding: "UTF-8",
                            },
                        },
                    );
                    const referencedXmlStyles = this.numberingReplacer.replace(xmlStyles, file.Numbering.ConcreteNumbering);
                    return referencedXmlStyles;
                })(),
                path: "word/styles.xml",
            },
            Properties: {
                data: xml(
                    this.formatter.format(file.CoreProperties, {
                        viewWrapper: file.Document,
                        file,
                        stack: [],
                    }),
                    {
                        indent: prettify,
                        declaration: {
                            standalone: "yes",
                            encoding: "UTF-8",
                        },
                    },
                ),
                path: "docProps/core.xml",
            },
            Numbering: {
                data: xml(
                    this.formatter.format(file.Numbering, {
                        viewWrapper: file.Document,
                        file,
                        stack: [],
                    }),
                    {
                        indent: prettify,
                        declaration: {
                            standalone: "yes",
                            encoding: "UTF-8",
                        },
                    },
                ),
                path: "word/numbering.xml",
            },
            FileRelationships: {
                data: xml(
                    this.formatter.format(file.FileRelationships, {
                        viewWrapper: file.Document,
                        file,
                        stack: [],
                    }),
                    {
                        indent: prettify,
                        declaration: {
                            encoding: "UTF-8",
                        },
                    },
                ),
                path: "_rels/.rels",
            },
            HeaderRelationships: file.Headers.map((headerWrapper, index) => {
                const xmlData = xml(
                    this.formatter.format(headerWrapper.View, {
                        viewWrapper: headerWrapper,
                        file,
                        stack: [],
                    }),
                    {
                        indent: prettify,
                        declaration: {
                            encoding: "UTF-8",
                        },
                    },
                );
                const mediaDatas = this.identifierManager.filter(xmlData, file.Media.Array, (item) => item.fileName);

                mediaDatas.forEach((mediaData, i) => {
                    headerWrapper.Relationships.createRelationship(
                        i,
                        "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image",
                        `media/${mediaData.fileName}`,
                    );
                });

                return {
                    data: xml(
                        this.formatter.format(headerWrapper.Relationships, {
                            viewWrapper: headerWrapper,
                            file,
                            stack: [],
                        }),
                        {
                            indent: prettify,
                            declaration: {
                                encoding: "UTF-8",
                            },
                        },
                    ),
                    path: `word/_rels/header${index + 1}.xml.rels`,
                };
            }),
            FooterRelationships: file.Footers.map((footerWrapper, index) => {
                const xmlData = xml(
                    this.formatter.format(footerWrapper.View, {
                        viewWrapper: footerWrapper,
                        file,
                        stack: [],
                    }),
                    {
                        indent: prettify,
                        declaration: {
                            encoding: "UTF-8",
                        },
                    },
                );
                const mediaDatas = this.identifierManager.filter(xmlData, file.Media.Array, (item) => item.fileName);

                mediaDatas.forEach((mediaData, i) => {
                    footerWrapper.Relationships.createRelationship(
                        i,
                        "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image",
                        `media/${mediaData.fileName}`,
                    );
                });

                return {
                    data: xml(
                        this.formatter.format(footerWrapper.Relationships, {
                            viewWrapper: footerWrapper,
                            file,
                            stack: [],
                        }),
                        {
                            indent: prettify,
                            declaration: {
                                encoding: "UTF-8",
                            },
                        },
                    ),
                    path: `word/_rels/footer${index + 1}.xml.rels`,
                };
            }),
            Headers: file.Headers.map((headerWrapper, index) => {
                const tempXmlData = xml(
                    this.formatter.format(headerWrapper.View, {
                        viewWrapper: headerWrapper,
                        file,
                        stack: [],
                    }),
                    {
                        indent: prettify,
                        declaration: {
                            encoding: "UTF-8",
                        },
                    },
                );
                const mediaDatas = this.identifierManager.filter(tempXmlData, file.Media.Array, (item) => item.fileName);
                // TODO: 0 needs to be changed when headers get relationships of their own
                const xmlData = this.identifierManager.replace(
                    tempXmlData,
                    mediaDatas.map((item) => item.fileName),
                    0,
                );

                const referencedXmlData = this.numberingReplacer.replace(xmlData, file.Numbering.ConcreteNumbering);

                return {
                    data: referencedXmlData,
                    path: `word/header${index + 1}.xml`,
                };
            }),
            Footers: file.Footers.map((footerWrapper, index) => {
                const tempXmlData = xml(
                    this.formatter.format(footerWrapper.View, {
                        viewWrapper: footerWrapper,
                        file,
                        stack: [],
                    }),
                    {
                        indent: prettify,
                        declaration: {
                            encoding: "UTF-8",
                        },
                    },
                );
                const mediaDatas = this.identifierManager.filter(tempXmlData, file.Media.Array, (item) => item.fileName);
                // TODO: 0 needs to be changed when headers get relationships of their own
                const xmlData = this.identifierManager.replace(
                    tempXmlData,
                    mediaDatas.map((item) => item.fileName),
                    0,
                );

                const referencedXmlData = this.numberingReplacer.replace(xmlData, file.Numbering.ConcreteNumbering);

                return {
                    data: referencedXmlData,
                    path: `word/footer${index + 1}.xml`,
                };
            }),
            ContentTypes: {
                data: (() => {
                    file.Charts.Entries.forEach((_, index) => {
                        file.ContentTypes.addChart(index + 1);
                    });
                    return xml(
                        this.formatter.format(file.ContentTypes, {
                            viewWrapper: file.Document,
                            file,
                            stack: [],
                        }),
                        {
                            indent: prettify,
                            declaration: {
                                encoding: "UTF-8",
                            },
                        },
                    );
                })(),
                path: "[Content_Types].xml",
            },
            CustomProperties: {
                data: xml(
                    this.formatter.format(file.CustomProperties, {
                        viewWrapper: file.Document,
                        file,
                        stack: [],
                    }),
                    {
                        indent: prettify,
                        declaration: {
                            standalone: "yes",
                            encoding: "UTF-8",
                        },
                    },
                ),
                path: "docProps/custom.xml",
            },
            AppProperties: {
                data: xml(
                    this.formatter.format(file.AppProperties, {
                        viewWrapper: file.Document,
                        file,
                        stack: [],
                    }),
                    {
                        indent: prettify,
                        declaration: {
                            standalone: "yes",
                            encoding: "UTF-8",
                        },
                    },
                ),
                path: "docProps/app.xml",
            },
            FootNotes: {
                data: xml(
                    this.formatter.format(file.FootNotes.View, {
                        viewWrapper: file.FootNotes,
                        file,
                        stack: [],
                    }),
                    {
                        indent: prettify,
                        declaration: {
                            encoding: "UTF-8",
                        },
                    },
                ),
                path: "word/footnotes.xml",
            },
            FootNotesRelationships: {
                data: xml(
                    this.formatter.format(file.FootNotes.Relationships, {
                        viewWrapper: file.FootNotes,
                        file,
                        stack: [],
                    }),
                    {
                        indent: prettify,
                        declaration: {
                            encoding: "UTF-8",
                        },
                    },
                ),
                path: "word/_rels/footnotes.xml.rels",
            },
            Settings: {
                data: xml(
                    this.formatter.format(file.Settings, {
                        viewWrapper: file.Document,
                        file,
                        stack: [],
                    }),
                    {
                        indent: prettify,
                        declaration: {
                            standalone: "yes",
                            encoding: "UTF-8",
                        },
                    },
                ),
                path: "word/settings.xml",
            },
            Comments: {
                data: (() => {
                    const xmlData = this.identifierManager.replace(
                        commentXmlData,
                        commentMediaDatas.map((item) => item.fileName),
                        commentRelationshipCount,
                    );
                    const referencedXmlData = this.numberingReplacer.replace(xmlData, file.Numbering.ConcreteNumbering);
                    return referencedXmlData;
                })(),
                path: "word/comments.xml",
            },
            CommentsRelationships: {
                data: (() => {
                    commentMediaDatas.forEach((mediaData, i) => {
                        file.Comments.Relationships.createRelationship(
                            commentRelationshipCount + i,
                            "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image",
                            `media/${mediaData.fileName}`,
                        );
                    });
                    return xml(
                        this.formatter.format(file.Comments.Relationships, {
                            viewWrapper: {
                                View: file.Comments,
                                Relationships: file.Comments.Relationships,
                            },
                            file,
                            stack: [],
                        }),
                        {
                            indent: prettify,
                            declaration: {
                                encoding: "UTF-8",
                            },
                        },
                    );
                })(),
                path: "word/_rels/comments.xml.rels",
            },
            FontTable: {
                data: xml(
                    this.formatter.format(file.FontTable.View, {
                        viewWrapper: file.Document,
                        file,
                        stack: [],
                    }),
                    {
                        indent: prettify,
                        declaration: {
                            standalone: "yes",
                            encoding: "UTF-8",
                        },
                    },
                ),
                path: "word/fontTable.xml",
            },
            FontTableRelationships: {
                data: (() =>
                    xml(
                        this.formatter.format(file.FontTable.Relationships, {
                            viewWrapper: file.Document,
                            file,
                            stack: [],
                        }),
                        {
                            indent: prettify,
                            declaration: {
                                encoding: "UTF-8",
                            },
                        },
                    ))(),
                path: "word/_rels/fontTable.xml.rels",
            },
        };
    }
}
