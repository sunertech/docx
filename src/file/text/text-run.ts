import { StringContainer, XmlComponent } from "@file/xml-components";
import { TextCharacterProperties, TextCharacterPropertiesOptions } from "./text-character-properties";

export type TextRunOptions = {
    readonly properties?: TextCharacterPropertiesOptions;
    readonly text: string;
};

// <xsd:element name="rPr" type="CT_TextCharacterProperties" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="t" type="xsd:string" minOccurs="1" maxOccurs="1"/>

export class TextRun extends XmlComponent {
    public constructor({ properties, text }: TextRunOptions) {
        super("a:r");
        if (properties) {
            this.root.push(new TextCharacterProperties("a:rPr", properties));
        }
        this.root.push(new StringContainer("a:t", text));
    }
}
