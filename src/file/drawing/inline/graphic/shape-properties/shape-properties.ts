// http://officeopenxml.com/drwSp-SpPr.php
import { IMediaDataTransformation } from "@file/media";
import { XmlComponent } from "@file/xml-components";

import { Form } from "./form";
import { createNoFill } from "./outline/no-fill";
import { OutlineOptions, createOutline } from "./outline/outline";
import { PresetGeometry } from "./preset-geometry/preset-geometry";
import { ShapePropertiesAttributes } from "./shape-properties-attributes";

export type IShapePropertiesOptions = {
    readonly bwMode?: string;
    readonly outline?: OutlineOptions;
    readonly transform?: IMediaDataTransformation;
    readonly presetGeometry?: boolean;
};

export class ShapeProperties extends XmlComponent {
    public constructor(name: string, { outline, transform, bwMode, presetGeometry }: IShapePropertiesOptions) {
        super(name);
        if (bwMode) {
            this.root.push(
                new ShapePropertiesAttributes({
                    bwMode,
                }),
            );
        }
        if (transform) {
            this.root.push(new Form(transform));
        }
        if (presetGeometry) {
            this.root.push(new PresetGeometry());
        }

        this.root.push(createNoFill());
        if (outline) {
            this.root.push(createOutline(outline));
        }
    }
}
