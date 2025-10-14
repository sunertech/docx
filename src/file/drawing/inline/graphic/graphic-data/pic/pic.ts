// http://officeopenxml.com/drwPic.php
import { IMediaData, IMediaDataTransformation } from "@file/media";
import { XmlComponent } from "@file/xml-components";

import { OutlineOptions } from "../../shape-properties/outline/outline";
import { ShapeProperties } from "../../shape-properties/shape-properties";
import { BlipFill } from "./blip/blip-fill";
import { NonVisualPicProperties } from "./non-visual-pic-properties/non-visual-pic-properties";
import { PicAttributes } from "./pic-attributes";

export class Pic extends XmlComponent {
    public constructor({
        mediaData,
        transform,
        outline,
    }: {
        readonly mediaData: IMediaData;
        readonly transform: IMediaDataTransformation;
        readonly outline?: OutlineOptions;
    }) {
        super("pic:pic");

        this.root.push(
            new PicAttributes({
                xmlns: "http://schemas.openxmlformats.org/drawingml/2006/picture",
            }),
        );

        this.root.push(new NonVisualPicProperties());
        this.root.push(new BlipFill(mediaData));
        this.root.push(new ShapeProperties("pic:spPr", { transform, outline, bwMode: "auto", presetGeometry: true }));
    }
}
