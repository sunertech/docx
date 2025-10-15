// Example of making content of section vertically aligned

import { Document, Packer, Paragraph, Tab, TextRun, VerticalAlignSection } from "@sunertech/docx";
import * as fs from "fs";

const doc = new Document({
    sections: [
        {
            properties: {
                verticalAlign: VerticalAlignSection.CENTER,
            },
            children: [
                new Paragraph({
                    children: [
                        new TextRun("Hello World"),
                        new TextRun({
                            text: "Foo Bar",
                            bold: true,
                        }),
                        new TextRun({
                            children: [new Tab(), "Github is the best"],
                            bold: true,
                        }),
                    ],
                }),
            ],
        },
    ],
});

Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("My Document.docx", buffer);
});
