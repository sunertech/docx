// http://officeopenxml.com/drwSp-outline.php
import { BuilderElement, EmptyElement, StringValueElement, XmlComponent } from "@file/xml-components";

import { createNoFill } from "./no-fill";
import { SchemeColor } from "./scheme-color";
import { createSolidFill } from "./solid-fill";

// <xsd:simpleType name="ST_LineCap">
//     <xsd:restriction base="xsd:string">
//     <xsd:enumeration value="rnd"/>
//     <xsd:enumeration value="sq"/>
//     <xsd:enumeration value="flat"/>
//     </xsd:restriction>
// </xsd:simpleType>
export const enum LineCap {
    ROUND = "rnd",
    SQUARE = "sq",
    FLAT = "flat",
}

// <xsd:simpleType name="ST_CompoundLine">
//     <xsd:restriction base="xsd:string">
//         <xsd:enumeration value="sng"/>
//         <xsd:enumeration value="dbl"/>
//         <xsd:enumeration value="thickThin"/>
//         <xsd:enumeration value="thinThick"/>
//         <xsd:enumeration value="tri"/>
//     </xsd:restriction>
// </xsd:simpleType>
export const enum CompoundLine {
    SINGLE = "sng",
    DOUBLE = "dbl",
    THICK_THIN = "thickThin",
    THIN_THICK = "thinThick",
    TRI = "tri",
}

// <xsd:simpleType name="ST_PenAlignment">
//     <xsd:restriction base="xsd:string">
//         <xsd:enumeration value="ctr"/>
//         <xsd:enumeration value="in"/>
//     </xsd:restriction>
// </xsd:simpleType>
export const enum PenAlignment {
    CENTER = "ctr",
    INSET = "in",
}

// <xsd:simpleType name="ST_PresetLineDashVal">
//     <xsd:restriction base="xsd:token">
//         <xsd:enumeration value="solid"/>
//         <xsd:enumeration value="dot"/>
//         <xsd:enumeration value="dash"/>
//         <xsd:enumeration value="lgDash"/>
//         <xsd:enumeration value="dashDot"/>
//         <xsd:enumeration value="lgDashDot"/>
//         <xsd:enumeration value="lgDashDotDot"/>
//         <xsd:enumeration value="sysDash"/>
//         <xsd:enumeration value="sysDot"/>
//         <xsd:enumeration value="sysDashDot"/>
//         <xsd:enumeration value="sysDashDotDot"/>
//     </xsd:restriction>
// </xsd:simpleType>

export enum PresetLineDash {
    SOLID = "solid",
    DOT = "dot",
    DASH = "dash",
    LG_DASH = "lgDash",
    DASH_DOT = "dashDot",
    LG_DASH_DOT = "lgDashDot",
    LG_DASH_DOT_DOT = "lgDashDotDot",
    SYS_DASH = "sysDash",
    SYS_DOT = "sysDot",
    SYS_DASH_DOT = "sysDashDot",
    SYS_DASH_DOT_DOT = "sysDashDotDot",
}

// <xsd:group name="EG_LineDashProperties">
//     <xsd:choice>
//         <xsd:element name="prstDash" type="CT_PresetLineDashProperties" minOccurs="1" maxOccurs="1"/>
//         <xsd:element name="custDash" type="CT_DashStopList" minOccurs="1" maxOccurs="1"/>
//     </xsd:choice>
// </xsd:group>
type LineDashProperties = {
    readonly dash?:
        | {
              readonly type: "preset";
              readonly value?: PresetLineDash;
          }
        | {
              readonly type: "custom";
              readonly items?: {
                  readonly length: string | number;
                  readonly gap: string | number;
              }[];
          };
};

// <xsd:complexType name="CT_LineJoinMiterProperties">
//     <xsd:attribute name="lim" type="a:ST_PositivePercentage" use="optional"/>
// </xsd:complexType>

// <xsd:group name="EG_LineJoinProperties">
//     <xsd:choice>
//         <xsd:element name="round" type="w:CT_Empty"/>
//         <xsd:element name="bevel" type="w:CT_Empty"/>
//         <xsd:element name="miter" type="CT_LineJoinMiterProperties"/>
//     </xsd:choice>
// </xsd:group>

type LineJoinProperties = {
    readonly join?:
        | { readonly type: "round" | "bevel" }
        | {
              readonly type: "miter";
              readonly limit?: string | number;
          };
};

// <xsd:complexType name="CT_TextOutlineEffect">
//     <xsd:sequence>
//         <xsd:group ref="EG_FillProperties" minOccurs="0"/>
//         <xsd:group ref="EG_LineDashProperties" minOccurs="0"/>
//         <xsd:group ref="EG_LineJoinProperties" minOccurs="0"/>
//     </xsd:sequence>
//     <xsd:attribute name="w" use="optional" type="a:ST_LineWidth"/>
//     <xsd:attribute name="cap" use="optional" type="ST_LineCap"/>
//     <xsd:attribute name="cmpd" use="optional" type="ST_CompoundLine"/>
//     <xsd:attribute name="algn" use="optional" type="ST_PenAlignment"/>
// </xsd:complexType>

export type OutlineAttributes = {
    readonly width?: number;
    readonly cap?: LineCap;
    readonly compoundLine?: CompoundLine;
    readonly align?: PenAlignment;
};

type OutlineNoFill = {
    readonly type: "noFill";
};

type OutlineRgbSolidFill = {
    readonly type: "solidFill";
    readonly solidFillType: "rgb";
    readonly value: string;
};

type OutlineSchemeSolidFill = {
    readonly type: "solidFill";
    readonly solidFillType: "scheme";
    readonly value: (typeof SchemeColor)[keyof typeof SchemeColor];
};

type OutlineSolidFill = OutlineRgbSolidFill | OutlineSchemeSolidFill;

// <xsd:group name="EG_FillProperties">
//     <xsd:choice>
//         <xsd:element name="noFill" type="w:CT_Empty"/>
//         <xsd:element name="solidFill" type="CT_SolidColorFillProperties"/>
//         <xsd:element name="gradFill" type="CT_GradientFillProperties"/>
//     </xsd:choice>
// </xsd:group>
export type OutlineFillProperties = OutlineNoFill | OutlineSolidFill | { type?: undefined };

export type OutlineOptions = OutlineAttributes & OutlineFillProperties & LineJoinProperties & LineDashProperties;

export const createOutline = (options: OutlineOptions): XmlComponent =>
    new BuilderElement<OutlineAttributes>({
        name: "a:ln",
        attributes: {
            width: {
                key: "w",
                value: options.width,
            },
            cap: {
                key: "cap",
                value: options.cap,
            },
            compoundLine: {
                key: "cmpd",
                value: options.compoundLine,
            },
            align: {
                key: "algn",
                value: options.align,
            },
        },
        children: [
            ...(options.join
                ? [
                      options.join.type === "miter"
                          ? new BuilderElement({
                                name: "a:miter",
                                attributes: options.join.limit
                                    ? {
                                          limit: { key: "lim", value: options.join.limit },
                                      }
                                    : undefined,
                            })
                          : new EmptyElement(options.join.type === "round" ? "a:round" : "a:bevel"),
                  ]
                : []),
            ...(options.dash
                ? [
                      options.dash.type === "preset"
                          ? new StringValueElement("a:prstDash", options.dash.value, "")
                          : new BuilderElement({
                                name: "a:custDash",
                                children: options.dash.items?.map(
                                    (item) =>
                                        new BuilderElement({
                                            name: "a:ds",
                                            attributes: {
                                                length: { key: "d", value: item.length },
                                                gap: { key: "sp", value: item.gap },
                                            },
                                        }),
                                ),
                            }),
                  ]
                : []),
            ...(!options.type
                ? []
                : options.type === "noFill"
                  ? [createNoFill()]
                  : options.solidFillType === "rgb"
                    ? [
                          createSolidFill({
                              type: "rgb",
                              value: options.value,
                          }),
                      ]
                    : [
                          createSolidFill({
                              type: "scheme",
                              value: options.value,
                          }),
                      ]),
        ],
    });
