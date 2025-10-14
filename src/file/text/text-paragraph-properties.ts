import { XmlComponent } from "@file/xml-components";
import { TextCharacterProperties, TextCharacterPropertiesOptions } from "./text-character-properties";

export type TextParagraphPropertiesOptions = {
    readonly defaultCharacterProperties?: TextCharacterPropertiesOptions;
};

// <xsd:sequence>
//     <xsd:element name="lnSpc" type="CT_TextSpacing" minOccurs="0" maxOccurs="1"/>
//     <xsd:element name="spcBef" type="CT_TextSpacing" minOccurs="0" maxOccurs="1"/>
//     <xsd:element name="spcAft" type="CT_TextSpacing" minOccurs="0" maxOccurs="1"/>
//     <xsd:group ref="EG_TextBulletColor" minOccurs="0" maxOccurs="1"/>
//     <xsd:group ref="EG_TextBulletSize" minOccurs="0" maxOccurs="1"/>
//     <xsd:group ref="EG_TextBulletTypeface" minOccurs="0" maxOccurs="1"/>
//     <xsd:group ref="EG_TextBullet" minOccurs="0" maxOccurs="1"/>
//     <xsd:element name="tabLst" type="CT_TextTabStopList" minOccurs="0" maxOccurs="1"/>
//     <xsd:element name="defRPr" type="CT_TextCharacterProperties" minOccurs="0" maxOccurs="1"/>
//     <xsd:element name="extLst" type="CT_OfficeArtExtensionList" minOccurs="0" maxOccurs="1"/>
// </xsd:sequence>
// <xsd:attribute name="marL" type="ST_TextMargin" use="optional"/>
// <xsd:attribute name="marR" type="ST_TextMargin" use="optional"/>
// <xsd:attribute name="lvl" type="ST_TextIndentLevelType" use="optional"/>
// <xsd:attribute name="indent" type="ST_TextIndent" use="optional"/>
// <xsd:attribute name="algn" type="ST_TextAlignType" use="optional"/>
// <xsd:attribute name="defTabSz" type="ST_Coordinate32" use="optional"/>
// <xsd:attribute name="rtl" type="xsd:boolean" use="optional"/>
// <xsd:attribute name="eaLnBrk" type="xsd:boolean" use="optional"/>
// <xsd:attribute name="fontAlgn" type="ST_TextFontAlignType" use="optional"/>
// <xsd:attribute name="latinLnBrk" type="xsd:boolean" use="optional"/>
// <xsd:attribute name="hangingPunct" type="xsd:boolean" use="optional"/>

export class TextParagraphProperties extends XmlComponent {
    public constructor({ defaultCharacterProperties }: TextParagraphPropertiesOptions) {
        super("a:pPr");
        if (defaultCharacterProperties) {
            this.root.push(new TextCharacterProperties("a:defRPr", defaultCharacterProperties));
        }
    }
}
