import { describe, expect, it } from "vitest";

import { Formatter } from "@export/formatter";

import { Pic } from "./graphic/graphic-data/pic";
import { createInline } from "./inline";

describe("Inline", () => {
    it("should create with default effect extent", () => {
        const mediaData = {
            fileName: "test.png",
            data: Buffer.from(""),
            transformation: {
                pixels: {
                    x: 100,
                    y: 100,
                },
                emus: {
                    x: 100,
                    y: 100,
                },
            },
        };
        const tree = new Formatter().format(
            createInline({
                uri: "http://schemas.openxmlformats.org/drawingml/2006/picture",
                dataElement: new Pic({
                    mediaData: {
                        type: "png",
                        ...mediaData,
                    },
                    transform: mediaData.transformation,
                    outline: { type: "solidFill", solidFillType: "rgb", value: "FFFFFF" },
                }),
                altText: {
                    name: "test",
                    description: "test",
                    title: "test",
                },
                outline: { type: "solidFill", solidFillType: "rgb", value: "FFFFFF" },
                transform: mediaData.transformation,
            }),
        );

        expect(tree).toStrictEqual({
            "wp:inline": expect.arrayContaining([
                {
                    "wp:effectExtent": {
                        _attr: {
                            b: 19050,
                            l: 19050,
                            r: 19050,
                            t: 19050,
                        },
                    },
                },
            ]),
        });
    });
});
