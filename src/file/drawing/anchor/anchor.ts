// http://officeopenxml.com/drwPicFloating.php
import { IMediaDataTransformation } from "@file/media";
import { XmlComponent } from "@file/xml-components";

import { IFloating, createHorizontalPosition, createSimplePos, createVerticalPosition } from "../floating";
import { Graphic, GraphicOptions } from "../inline/graphic";
import { TextWrappingType, WrapNone, WrapSquare, WrapTight, WrapTopAndBottom } from "../text-wrap";
import { DocProperties, DocPropertiesOptions } from "./../doc-properties/doc-properties";
import { createEffectExtent } from "./../effect-extent/effect-extent";
import { createExtent } from "./../extent/extent";
import { createGraphicFrameProperties } from "./../graphic-frame/graphic-frame-properties";
import { AnchorAttributes } from "./anchor-attributes";

// <xsd:complexType name="CT_Anchor">
//     <xsd:sequence>
//         <xsd:element name="simplePos" type="a:CT_Point2D"/>
//         <xsd:element name="positionH" type="CT_PosH"/>
//         <xsd:element name="positionV" type="CT_PosV"/>
//         <xsd:element name="extent" type="a:CT_PositiveSize2D"/>
//         <xsd:element name="effectExtent" type="CT_EffectExtent" minOccurs="0"/>
//         <xsd:group ref="EG_WrapType"/>
//         <xsd:element name="docPr" type="a:CT_NonVisualDrawingProps" minOccurs="1" maxOccurs="1"/>
//         <xsd:element name="cNvGraphicFramePr" type="a:CT_NonVisualGraphicFrameProperties"
//             minOccurs="0" maxOccurs="1"/>
//         <xsd:element ref="a:graphic" minOccurs="1" maxOccurs="1"/>
//     </xsd:sequence>
//     <xsd:attribute name="distT" type="ST_WrapDistance" use="optional"/>
//     <xsd:attribute name="distB" type="ST_WrapDistance" use="optional"/>
//     <xsd:attribute name="distL" type="ST_WrapDistance" use="optional"/>
//     <xsd:attribute name="distR" type="ST_WrapDistance" use="optional"/>
//     <xsd:attribute name="simplePos" type="xsd:boolean"/>
//     <xsd:attribute name="relativeHeight" type="xsd:unsignedInt" use="required"/>
//     <xsd:attribute name="behindDoc" type="xsd:boolean" use="required"/>
//     <xsd:attribute name="locked" type="xsd:boolean" use="required"/>
//     <xsd:attribute name="layoutInCell" type="xsd:boolean" use="required"/>
//     <xsd:attribute name="hidden" type="xsd:boolean" use="optional"/>
//     <xsd:attribute name="allowOverlap" type="xsd:boolean" use="required"/>
// </xsd:complexType>

export type IAnchorCoreOptions = {
    readonly floating?: IFloating;
    readonly altText?: DocPropertiesOptions;
};

export type GraphicWrapperOptions = {
    readonly transform: IMediaDataTransformation;
};

type IAnchorOptions = IAnchorCoreOptions & GraphicOptions & GraphicWrapperOptions;

export class Anchor extends XmlComponent {
    public constructor({ uri, dataElement, transform, altText, ...options }: IAnchorOptions) {
        super("wp:anchor");

        const floating: IFloating = {
            allowOverlap: true,
            behindDocument: false,
            lockAnchor: false,
            layoutInCell: true,
            verticalPosition: {},
            horizontalPosition: {},
            ...options.floating,
        };

        this.root.push(
            new AnchorAttributes({
                distT: floating.margins ? floating.margins.top || 0 : 0,
                distB: floating.margins ? floating.margins.bottom || 0 : 0,
                distL: floating.margins ? floating.margins.left || 0 : 0,
                distR: floating.margins ? floating.margins.right || 0 : 0,
                simplePos: "0", // note: word doesn't fully support - so we use 0
                allowOverlap: floating.allowOverlap === true ? "1" : "0",
                behindDoc: floating.behindDocument === true ? "1" : "0",
                locked: floating.lockAnchor === true ? "1" : "0",
                layoutInCell: floating.layoutInCell === true ? "1" : "0",
                relativeHeight: floating.zIndex ? floating.zIndex : transform.emus.y,
            }),
        );

        this.root.push(createSimplePos());
        this.root.push(createHorizontalPosition(floating.horizontalPosition));
        this.root.push(createVerticalPosition(floating.verticalPosition));
        this.root.push(createExtent({ x: transform.emus.x, y: transform.emus.y }));
        this.root.push(createEffectExtent({ top: 0, right: 0, bottom: 0, left: 0 }));

        if (options.floating !== undefined && options.floating.wrap !== undefined) {
            switch (options.floating.wrap.type) {
                case TextWrappingType.SQUARE:
                    this.root.push(new WrapSquare(options.floating.wrap, options.floating.margins));
                    break;
                case TextWrappingType.TIGHT:
                    this.root.push(new WrapTight(options.floating.margins));
                    break;
                case TextWrappingType.TOP_AND_BOTTOM:
                    this.root.push(new WrapTopAndBottom(options.floating.margins));
                    break;
                case TextWrappingType.NONE:
                default:
                    this.root.push(new WrapNone());
            }
        } else {
            this.root.push(new WrapNone());
        }

        this.root.push(new DocProperties(altText));
        this.root.push(createGraphicFrameProperties());
        this.root.push(new Graphic({ uri, dataElement }));
    }
}
