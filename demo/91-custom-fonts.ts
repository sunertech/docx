// Simple example to add text to a document

import { CharacterSet, Document, Packer, Paragraph, Tab, TextRun } from "@sunertech/docx";
import * as fs from "fs";

const font = fs.readFileSync("./demo/assets/Pacifico.ttf");

const doc = new Document({
    sections: [
        {
            properties: {},
            children: [
                new Paragraph({
                    run: {
                        font: "Pacifico",
                    },
                    children: [
                        new TextRun("Hello World"),
                        new TextRun({
                            text: "Foo Bar",
                            bold: true,
                            size: 40,
                            font: "Pacifico",
                        }),
                        new TextRun({
                            children: [new Tab(), "Github is the best"],
                            bold: true,
                            font: "Pacifico",
                        }),
                    ],
                }),
            ],
        },
    ],
    fonts: [{ name: "Pacifico", data: font, characterSet: CharacterSet.ANSI }],
});

Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("My Document.docx", buffer);
});
