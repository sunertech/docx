import { XmlComponent } from "@file/xml-components";
import { TextParagraphProperties, TextParagraphPropertiesOptions } from "./text-paragraph-properties";
import { TextRun, TextRunOptions } from "./text-run";

export type TextParagraphOptions = {
    readonly properties?: TextParagraphPropertiesOptions;
    readonly text?: TextRunOptions | string;
};

// <xsd:element name="pPr" type="CT_TextParagraphProperties" minOccurs="0" maxOccurs="1"/>
// <xsd:group ref="EG_TextRun" minOccurs="0" maxOccurs="unbounded"/>
// <xsd:element name="endParaRPr" type="CT_TextCharacterProperties" minOccurs="0" maxOccurs="1"/>

export class TextParagraph extends XmlComponent {
    public constructor({ properties, text }: TextParagraphOptions) {
        super("a:p");
        this.root.push(new TextParagraphProperties({ ...properties }));
        if (text !== undefined) {
            this.root.push(new TextRun(typeof text === "string" ? { text } : { ...text }));
        }
    }
}
