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
                            valueAxis: {
                                title: {
                                    textSource: {
                                        bodyProperties: { rotation: -5400000 },
                                        paragraph: { text: "(kWh)" },
                                    },
                                },
                            },
                            categories: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
                            barChart: {
                                series: [
                                    {
                                        name: "Geração",
                                        values: [1037, 962, 1048, 947, 832, 771, 832, 988, 915, 1009, 1044, 1093],
                                    },
                                ],
                            },
                            lineChart: {
                                series: [
                                    {
                                        name: "Consumo",
                                        values: [800, 950, 700, 750, 680, 650, 600, 580, 630, 700, 750, 850],
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
