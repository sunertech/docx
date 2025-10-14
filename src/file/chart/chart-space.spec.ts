import { describe, expect, it } from "vitest";

import { Formatter } from "@export/formatter";
import { IViewWrapper } from "@file/document-wrapper";
import { File } from "@file/file";

import { ChartSpace } from "./chart-space";

describe("ChartSpace", () => {
    describe("#constructor()", () => {
        it("should create with title", () => {
            const currentChartSpace = new ChartSpace({
                title: "My Chart",
            });

            const tree = new Formatter().format(currentChartSpace, {
                file: {} as unknown as File,
                viewWrapper: {} as unknown as IViewWrapper,
                stack: [],
            });
            expect(tree).to.containSubset({
                "c:chartSpace": [
                    {
                        _attr: {
                            "xmlns:c": "http://schemas.openxmlformats.org/drawingml/2006/chart",
                            "xmlns:a": "http://schemas.openxmlformats.org/drawingml/2006/main",
                            "xmlns:r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
                        },
                    },
                    {
                        "c:date1904": {
                            _attr: {
                                val: 1,
                            },
                        },
                    },
                    {
                        "c:roundedCorners": {
                            _attr: {
                                val: 0,
                            },
                        },
                    },
                    {
                        "c:chart": [
                            {
                                "c:title": [
                                    {
                                        "c:tx": [
                                            {
                                                "c:rich": [
                                                    {
                                                        "a:bodyPr": {
                                                            _attr: {
                                                                rot: 0,
                                                            },
                                                        },
                                                    },
                                                    {
                                                        "a:lstStyle": {},
                                                    },
                                                    {
                                                        "a:p": [
                                                            {
                                                                "a:pPr": {},
                                                            },
                                                            {
                                                                "a:r": [
                                                                    {
                                                                        "a:t": ["My Chart"],
                                                                    },
                                                                ],
                                                            },
                                                        ],
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                "c:plotArea": {},
                            },
                            {
                                "c:plotVisOnly": {
                                    _attr: {
                                        val: 1,
                                    },
                                },
                            },
                            {
                                "c:dispBlanksAs": {
                                    _attr: {
                                        val: "gap",
                                    },
                                },
                            },
                        ],
                    },
                ],
            });
        });
    });
});
