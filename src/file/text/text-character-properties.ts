import { createNoFill } from "@file/drawing/inline/graphic/shape-properties/outline/no-fill";
import { createSolidFill } from "@file/drawing/inline/graphic/shape-properties/outline/solid-fill";
import { BuilderElement, XmlAttributeComponent, XmlComponent } from "@file/xml-components";

type TextUnderlineType =
    | "none"
    | "words"
    | "sng"
    | "dbl"
    | "heavy"
    | "dotted"
    | "dottedHeavy"
    | "dash"
    | "dashHeavy"
    | "dashLong"
    | "dashLongHeavy"
    | "dotDash"
    | "dotDashHeavy"
    | "dotDotDash"
    | "dotDotDashHeavy"
    | "wavy"
    | "wavyHeavy"
    | "wavyDbl";

export enum TextStrikeType {
    NO_STRIKE = "noStrike",
    SINGLE_STRIKE = "sngStrike",
    DOUBLE_STRIKE = "dblStrike",
}

export enum TextCapsType {
    NONE = "none",
    SMALL = "small",
    ALL = "all",
}

type TextCharacterAttributesOptions = {
    readonly kumimoji?: boolean;
    readonly lang?: string;
    readonly altLang?: string;
    readonly size?: number;
    readonly bold?: boolean;
    readonly italic?: boolean;
    readonly underline?: TextUnderlineType;
    readonly strike?: TextStrikeType;
    readonly kern?: number;
    readonly cap?: TextCapsType;
    readonly spc?: number;
    readonly normalizeH?: boolean;
    readonly baseline?: number;
    readonly noProof?: boolean;
    readonly dirty?: boolean;
    readonly err?: boolean;
    readonly smtClean?: boolean;
    readonly smtId?: number;
    readonly bmk?: string;
};

export type TextCharacterPropertiesOptions = {
    readonly fill?: { readonly type: "noFill" | "rgb"; readonly color?: string };
    readonly latin?: string;
} & TextCharacterAttributesOptions;

class TextCharacterAttributes extends XmlAttributeComponent<TextCharacterAttributesOptions> {
    protected readonly xmlKeys = {
        kumimoji: "kumimoji",
        lang: "lang",
        altLang: "altLang",
        size: "sz",
        bold: "b",
        italic: "i",
        underline: "u",
        strike: "strike",
        kern: "kern",
        cap: "cap",
        spc: "spc",
        normalizeH: "normalizeH",
        baseline: "baseline",
        noProof: "noProof",
        dirty: "dirty",
        err: "err",
        smtClean: "smtClean",
        smtId: "smtId",
        bmk: "bmk",
    };
}

// <xsd:sequence>
//     <xsd:element name="ln" type="CT_LineProperties" minOccurs="0" maxOccurs="1"/>
//     <xsd:group ref="EG_FillProperties" minOccurs="0" maxOccurs="1"/>
//     <xsd:group ref="EG_EffectProperties" minOccurs="0" maxOccurs="1"/>
//     <xsd:element name="highlight" type="CT_Color" minOccurs="0" maxOccurs="1"/>
//     <xsd:group ref="EG_TextUnderlineLine" minOccurs="0" maxOccurs="1"/>
//     <xsd:group ref="EG_TextUnderlineFill" minOccurs="0" maxOccurs="1"/>
//     <xsd:element name="latin" type="CT_TextFont" minOccurs="0" maxOccurs="1"/>
//     <xsd:element name="ea" type="CT_TextFont" minOccurs="0" maxOccurs="1"/>
//     <xsd:element name="cs" type="CT_TextFont" minOccurs="0" maxOccurs="1"/>
//     <xsd:element name="sym" type="CT_TextFont" minOccurs="0" maxOccurs="1"/>
//     <xsd:element name="hlinkClick" type="CT_Hyperlink" minOccurs="0" maxOccurs="1"/>
//     <xsd:element name="hlinkMouseOver" type="CT_Hyperlink" minOccurs="0" maxOccurs="1"/>
//     <xsd:element name="rtl" type="CT_Boolean" minOccurs="0"/>
//     <xsd:element name="extLst" type="CT_OfficeArtExtensionList" minOccurs="0" maxOccurs="1"/>
// </xsd:sequence>
// <xsd:attribute name="kumimoji" type="xsd:boolean" use="optional"/>
// <xsd:attribute name="lang" type="s:ST_Lang" use="optional"/>
// <xsd:attribute name="altLang" type="s:ST_Lang" use="optional"/>
// <xsd:attribute name="sz" type="ST_TextFontSize" use="optional"/>
// <xsd:attribute name="b" type="xsd:boolean" use="optional"/>
// <xsd:attribute name="i" type="xsd:boolean" use="optional"/>
// <xsd:attribute name="u" type="ST_TextUnderlineType" use="optional"/>
// <xsd:attribute name="strike" type="ST_TextStrikeType" use="optional"/>
// <xsd:attribute name="kern" type="ST_TextNonNegativePoint" use="optional"/>
// <xsd:attribute name="cap" type="ST_TextCapsType" use="optional" default="none"/>
// <xsd:attribute name="spc" type="ST_TextPoint" use="optional"/>
// <xsd:attribute name="normalizeH" type="xsd:boolean" use="optional"/>
// <xsd:attribute name="baseline" type="ST_Percentage" use="optional"/>
// <xsd:attribute name="noProof" type="xsd:boolean" use="optional"/>
// <xsd:attribute name="dirty" type="xsd:boolean" use="optional" default="true"/>
// <xsd:attribute name="err" type="xsd:boolean" use="optional" default="false"/>
// <xsd:attribute name="smtClean" type="xsd:boolean" use="optional" default="true"/>
// <xsd:attribute name="smtId" type="xsd:unsignedInt" use="optional" default="0"/>
// <xsd:attribute name="bmk" type="xsd:string" use="optional"/>

export class TextCharacterProperties extends XmlComponent {
    public constructor(name: string, { latin, ...options }: TextCharacterPropertiesOptions) {
        super(name);
        this.root.push(new TextCharacterAttributes(options));
        this.root.push(
            options?.fill?.type === "rgb"
                ? createSolidFill({
                      type: "rgb",
                      value: options.fill.color!,
                  })
                : createNoFill(),
        );
        if (latin) {
            this.root.push(
                new BuilderElement({
                    name: "a:latin",
                    attributes: {
                        typeface: { key: "typeface", value: latin },
                    },
                }),
            );
        }
    }
}
