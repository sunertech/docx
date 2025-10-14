import { describe, expect, it } from "vitest";

import { IdentifierManager } from "./identifier-manager";

describe("IdentifierManager", () => {
    describe("#replace()", () => {
        it("should replace properly", () => {
            const imageReplacer = new IdentifierManager();
            const result = imageReplacer.replace(
                "test {test-image.png} test",
                [
                    {
                        type: "png",
                        data: Buffer.from(""),
                        fileName: "test-image.png",
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
                    },
                ].map((item) => item.fileName),
                0,
            );

            expect(result).to.equal("test 0 test");
        });
    });

    describe("#filter()", () => {
        it("should get media data", () => {
            const imageReplacer = new IdentifierManager();
            const result = imageReplacer.filter(
                "test {test-image} test",
                [
                    {
                        stream: Buffer.from(""),
                        fileName: "test-image",
                        dimensions: {
                            pixels: {
                                x: 100,
                                y: 100,
                            },
                            emus: {
                                x: 100,
                                y: 100,
                            },
                        },
                    },
                ],
                (item) => item.fileName,
            );

            expect(result).to.have.length(1);
        });
    });
});
