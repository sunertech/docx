// Simple example to add check boxes to a document
import { ChartRun, Document, Packer, Paragraph } from "docx";
import * as fs from "fs";

const doc = new Document({
    sections: [
        {
            properties: {},
            children: [
                new Paragraph({
                    children: [
                        new ChartRun({
                            width: 530,
                            height: 380,
                            floating: {
                                horizontalPosition: { offset: 1601532, relative: "page" },
                                verticalPosition: { offset: 3463340, relative: "page" },
                            },
                            barChart: {
                                series: [
                                    {
                                        name: "Region 1",
                                        categories: ["April", "May", "June", "July"],
                                        values: [27, 36, 63, 143],
                                    },
                                ],
                            },
                        }),
                    ],
                }),
            ],
        },
    ],
});

Packer.toBuffer(doc, true).then((buffer) => {
    fs.writeFileSync("My Document.docx", buffer);
});
