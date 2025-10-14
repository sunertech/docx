import { ExtensionListOptions } from "@file/chart/extension-list";
import { BuilderElement, NumberValueElement, StringContainer, XmlComponent } from "@file/xml-components";

// type DataPoint = CT_NumVal
// <xsd:element name="v" type="s:ST_Xstring" minOccurs="1" maxOccurs="1"/>
// <xsd:attribute name="idx" type="xsd:unsignedInt" use="required"/>
// <xsd:attribute name="formatCode" type="s:ST_Xstring" use="optional"/>

// <xsd:element name="formatCode" type="s:ST_Xstring" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="ptCount" type="CT_UnsignedInt" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="pt" type="CT_NumVal" minOccurs="0" maxOccurs="unbounded"/>
// <xsd:element name="extLst" type="CT_ExtensionList" minOccurs="0" maxOccurs="1"/>
type NumberDataOptions = {
    readonly formatCode?: string;
    readonly dataPoints?: number[];
    readonly extensionList?: ExtensionListOptions;
};

export type NumberSourceOptions = { readonly formula: string; readonly values: number[] } | NumberDataOptions;

// <xsd:choice minOccurs="1" maxOccurs="1">
//     <xsd:element name="numRef" type="CT_NumRef" minOccurs="1" maxOccurs="1"/>
//     <xsd:element name="numLit" type="CT_NumData" minOccurs="1" maxOccurs="1"/>
// </xsd:choice>

export class NumberSource extends XmlComponent {
    public constructor(name: string, options: NumberSourceOptions) {
        super(name);
        if (!("values" in options)) {
            return;
        }
        this.root.push(
            new BuilderElement({
                name: "c:numRef",
                children: [
                    new StringContainer("c:f", options.formula),
                    new BuilderElement({
                        name: "c:numCache",
                        children: [
                            new NumberValueElement("c:ptCount", options.values.length, ""),
                            ...options.values.map(
                                (item, index) =>
                                    new BuilderElement({
                                        name: "c:pt",
                                        attributes: { idx: { key: "idx", value: index } },
                                        children: [new StringContainer("c:v", item.toString())],
                                    }),
                            ),
                        ],
                    }),
                ],
            }),
        );
    }
}
