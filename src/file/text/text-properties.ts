import { XmlComponent } from "@file/xml-components";
import { TextBodyProperties, TextBodyPropertiesOptions } from "./text-body-properties";
import { TextListStyle, TextListStyleOptions } from "./text-list-style";
import { TextParagraph, TextParagraphOptions } from "./text-paragraph";

export type TextPropertiesOptions = {
    readonly bodyProperties?: TextBodyPropertiesOptions;
    readonly listStyle?: TextListStyleOptions;
    readonly paragraph?: TextParagraphOptions;
};

// <xsd:element name="bodyPr" type="CT_TextBodyProperties" minOccurs="1" maxOccurs="1"/>
// <xsd:element name="lstStyle" type="CT_TextListStyle" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="p" type="CT_TextParagraph" minOccurs="1" maxOccurs="unbounded"/>

export class TextProperties extends XmlComponent {
    public constructor(name: string, { bodyProperties, listStyle, paragraph }: TextPropertiesOptions) {
        super(name);
        this.root.push(new TextBodyProperties({ ...bodyProperties }));
        this.root.push(new TextListStyle({ ...listStyle }));
        this.root.push(new TextParagraph({ ...paragraph }));
    }
}
