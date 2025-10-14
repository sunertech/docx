// http://officeopenxml.com/drwSp-SpPr.php
import { IMediaDataTransformation } from "@file/media";
import { XmlComponent } from "@file/xml-components";

import { Form } from "./form";
import { createNoFill } from "./outline/no-fill";
import { OutlineFillProperties, OutlineOptions, createOutline } from "./outline/outline";
import { createSolidFill } from "./outline/solid-fill";
import { PresetGeometry } from "./preset-geometry/preset-geometry";
import { ShapePropertiesAttributes } from "./shape-properties-attributes";

// EG_FillProperties
// <xsd:choice>
//     <xsd:element name="noFill" type="CT_NoFillProperties" minOccurs="1" maxOccurs="1"/>
//     <xsd:element name="solidFill" type="CT_SolidColorFillProperties" minOccurs="1" maxOccurs="1"/>
//     <xsd:element name="gradFill" type="CT_GradientFillProperties" minOccurs="1" maxOccurs="1"/>
//     <xsd:element name="blipFill" type="CT_BlipFillProperties" minOccurs="1" maxOccurs="1"/>
//     <xsd:element name="pattFill" type="CT_PatternFillProperties" minOccurs="1" maxOccurs="1"/>
//     <xsd:element name="grpFill" type="CT_GroupFillProperties" minOccurs="1" maxOccurs="1"/>
// </xsd:choice>

// <xsd:element name="xfrm" type="CT_Transform2D" minOccurs="0" maxOccurs="1"/>
// <xsd:group ref="EG_Geometry" minOccurs="0" maxOccurs="1"/>
// <xsd:group ref="EG_FillProperties" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="ln" type="CT_LineProperties" minOccurs="0" maxOccurs="1"/>
// <xsd:group ref="EG_EffectProperties" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="scene3d" type="CT_Scene3D" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="sp3d" type="CT_Shape3D" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="extLst" type="CT_OfficeArtExtensionList" minOccurs="0" maxOccurs="1"/>
// <xsd:attribute name="bwMode" type="ST_BlackWhiteMode" use="optional"/>

export type IShapePropertiesOptions = {
    readonly bwMode?: string;
    readonly outline?: OutlineOptions;
    readonly transform?: IMediaDataTransformation;
    readonly presetGeometry?: boolean;
} & ({ type?: undefined } | OutlineFillProperties);

export class ShapeProperties extends XmlComponent {
    public constructor(name: string, { outline, transform, bwMode, presetGeometry, ...options }: IShapePropertiesOptions) {
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
        if (options.type === "noFill") {
            this.root.push(createNoFill());
        }
        if (options.type === "solidFill") {
            this.root.push(
                options.solidFillType === "rgb"
                    ? createSolidFill({
                          type: "rgb",
                          value: options.value,
                      })
                    : createSolidFill({
                          type: "scheme",
                          value: options.value,
                      }),
            );
        }
        if (outline) {
            this.root.push(createOutline(outline));
        }
    }
}
