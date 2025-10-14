import { XmlComponent } from "@file/xml-components";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type TextListStyleOptions = {};

// <xsd:element name="defPPr" type="CT_TextParagraphProperties" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="lvl1pPr" type="CT_TextParagraphProperties" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="lvl2pPr" type="CT_TextParagraphProperties" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="lvl3pPr" type="CT_TextParagraphProperties" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="lvl4pPr" type="CT_TextParagraphProperties" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="lvl5pPr" type="CT_TextParagraphProperties" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="lvl6pPr" type="CT_TextParagraphProperties" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="lvl7pPr" type="CT_TextParagraphProperties" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="lvl8pPr" type="CT_TextParagraphProperties" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="lvl9pPr" type="CT_TextParagraphProperties" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="extLst" type="CT_OfficeArtExtensionList" minOccurs="0" maxOccurs="1"/>

export class TextListStyle extends XmlComponent {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public constructor(_options: TextListStyleOptions) {
        super("a:lstStyle");
    }
}
