import { describe, expect, it, vi } from "vitest";

import { Formatter } from "@export/formatter";
import { IViewWrapper } from "@file/document-wrapper";
import { File } from "@file/file";

import { ChartRun } from "./chart-run";

describe("ChartRun", () => {
    describe("#constructor()", () => {
        it("should create with title", () => {
            const currentChartRun = new ChartRun({
                title: "My Chart",
                width: 200,
                height: 200,
                floating: {
                    zIndex: 10,
                    horizontalPosition: {
                        offset: 1014400,
                    },
                    verticalPosition: {
                        offset: 1014400,
                    },
                },
            });

            const tree = new Formatter().format(currentChartRun, {
                file: {
                    Charts: {
                        add: vi.fn(),
                        Entries: [[]],
                    },
                    ContentTypes: {
                        addChart: vi.fn(),
                    },
                } as unknown as File,
                viewWrapper: {} as unknown as IViewWrapper,
                stack: [],
            });
            expect(tree).to.containSubset({
                "w:r": [
                    {
                        "w:drawing": [
                            {
                                "wp:anchor": [
                                    {
                                        _attr: {
                                            allowOverlap: "1",
                                            behindDoc: "0",
                                            distB: 0,
                                            distL: 0,
                                            distR: 0,
                                            distT: 0,
                                            layoutInCell: "1",
                                            locked: "0",
                                            relativeHeight: 10,
                                            simplePos: "0",
                                        },
                                    },
                                    {
                                        "wp:simplePos": {
                                            _attr: {
                                                x: 0,
                                                y: 0,
                                            },
                                        },
                                    },
                                    {
                                        "wp:positionH": [
                                            {
                                                _attr: {
                                                    relativeFrom: "page",
                                                },
                                            },
                                            {
                                                "wp:posOffset": ["1014400"],
                                            },
                                        ],
                                    },
                                    {
                                        "wp:positionV": [
                                            {
                                                _attr: {
                                                    relativeFrom: "page",
                                                },
                                            },
                                            {
                                                "wp:posOffset": ["1014400"],
                                            },
                                        ],
                                    },
                                    {
                                        "wp:extent": {
                                            _attr: {
                                                cx: 1905000,
                                                cy: 1905000,
                                            },
                                        },
                                    },
                                    {
                                        "wp:effectExtent": {
                                            _attr: {
                                                b: 0,
                                                l: 0,
                                                r: 0,
                                                t: 0,
                                            },
                                        },
                                    },
                                    {
                                        "wp:wrapNone": {},
                                    },
                                    {
                                        "wp:docPr": {
                                            _attr: {
                                                descr: "",
                                                id: 1,
                                                name: "",
                                                title: "",
                                            },
                                        },
                                    },
                                    {
                                        "wp:cNvGraphicFramePr": [
                                            {
                                                "a:graphicFrameLocks": {
                                                    _attr: {
                                                        noChangeAspect: 1,
                                                        "xmlns:a": "http://schemas.openxmlformats.org/drawingml/2006/main",
                                                    },
                                                },
                                            },
                                        ],
                                    },
                                    {
                                        "a:graphic": [
                                            {
                                                _attr: {
                                                    "xmlns:a": "http://schemas.openxmlformats.org/drawingml/2006/main",
                                                },
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            });

            expect(tree["w:r"][0]["w:drawing"][0]["wp:anchor"][9]["a:graphic"]).to.containSubset([
                {
                    "a:graphicData": [
                        {
                            _attr: {
                                uri: "http://schemas.openxmlformats.org/drawingml/2006/chart",
                            },
                        },
                        {
                            "c:chart": {
                                _attr: {
                                    "xmlns:c": "http://schemas.openxmlformats.org/drawingml/2006/chart",
                                },
                            },
                        },
                    ],
                },
            ]);
        });
    });
});
