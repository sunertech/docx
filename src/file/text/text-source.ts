import { BuilderElement, NumberValueElement, StringContainer, XmlComponent } from "@file/xml-components";
import { TextProperties, TextPropertiesOptions } from "./text-properties";

export type TextSourceOptions = TextPropertiesOptions | string;

// <xsd:choice minOccurs="1" maxOccurs="1">
//     <xsd:element name="strRef" type="CT_StrRef" minOccurs="1" maxOccurs="1"/>
//     <xsd:element name="rich" type="a:CT_TextBody" minOccurs="1" maxOccurs="1"/>
// </xsd:choice>

export class TextSource extends XmlComponent {
    public constructor(options: TextSourceOptions) {
        super("c:tx");
        if (typeof options === "string") {
            this.root.push(
                new BuilderElement({
                    name: "c:strRef",
                    children: [
                        new BuilderElement({
                            name: "c:strCache",
                            children: [
                                new NumberValueElement("c:ptCount", 1, ""),
                                new BuilderElement({
                                    name: "c:pt",
                                    attributes: { idx: { key: "idx", value: 0 } },
                                    children: [new StringContainer("c:v", options)],
                                }),
                            ],
                        }),
                    ],
                }),
            );
            return;
        }
        this.root.push(new TextProperties("c:rich", options));
    }
}
