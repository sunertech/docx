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
                            title: "{{my_chart}}",
                            width: 530,
                            height: 380,
                            floating: {
                                horizontalPosition: { align: "center", relative: "page" },
                                verticalPosition: { align: "center", relative: "page" },
                            },
                            legend: { position: "t" },
                            barChart: {
                                categories: ["April", "May", "June", "July"],
                                series: [
                                    {
                                        name: "Region 1",
                                        values: [27, 36, 63, 143],
                                    },
                                    {
                                        name: "Region 2",
                                        values: [55, 43, 80, 43],
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
