import { BuilderElement, NumberValueElement, StringContainer, XmlComponent } from "@file/xml-components";
import { TextProperties, TextPropertiesOptions } from "./text-properties";

export type TextSourceOptions = { formula: string; values: string[] } | TextPropertiesOptions;

// <xsd:choice minOccurs="1" maxOccurs="1">
//     <xsd:element name="strRef" type="CT_StrRef" minOccurs="1" maxOccurs="1"/>
//     <xsd:element name="rich" type="a:CT_TextBody" minOccurs="1" maxOccurs="1"/>
// </xsd:choice>

export class TextSource extends XmlComponent {
    public constructor(name: string, options: TextSourceOptions) {
        super(name);
        if (!("values" in options)) {
            this.root.push(new TextProperties("c:rich", options));
            return;
        }
        this.root.push(
            new BuilderElement({
                name: "c:strRef",
                children: [
                    new StringContainer("c:f", options.formula),
                    new BuilderElement({
                        name: "c:strCache",
                        children: [
                            new NumberValueElement("c:ptCount", options.values.length, ""),
                            ...options.values.map(
                                (item, index) =>
                                    new BuilderElement({
                                        name: "c:pt",
                                        attributes: { idx: { key: "idx", value: index } },
                                        children: [new StringContainer("c:v", item)],
                                    }),
                            ),
                        ],
                    }),
                ],
            }),
        );
    }
}
