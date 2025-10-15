// Patch a document with patches

import { IPatch, patchDocument, PatchType, TextRun } from "@sunertech/docx";
import * as fs from "fs";

export const font = "Trebuchet MS";
export const getPatches = (fields: { [key: string]: string }) => {
    const patches: { [key: string]: IPatch } = {};

    for (const field in fields) {
        patches[field] = {
            type: PatchType.PARAGRAPH,
            children: [new TextRun({ text: fields[field], font })],
        };
    }

    return patches;
};

const patches = getPatches({
    salutation: "Mr.",
    "first-name": "John",
});

patchDocument({
    outputType: "nodebuffer",
    data: fs.readFileSync("demo/assets/simple-template-3.docx"),
    patches,
    keepOriginalStyles: true,
}).then((doc) => {
    fs.writeFileSync("My Document.docx", doc);
});
