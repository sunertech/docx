import { ExtensionList, ExtensionListOptions } from "@file/chart/extension-list";
import { IShapePropertiesOptions, ShapeProperties } from "@file/drawing/inline/graphic/shape-properties/shape-properties";
import { BooleanElement, BuilderElement, XmlComponent } from "@file/xml-components";
import { DataLabel, DataLabelOptions, DataLabelSharedOptions, addDataLabelSharedOptions } from "./data-label";

// <xsd:group ref="EG_DLblShared" minOccurs="1" maxOccurs="1"/>
// <xsd:element name="showLeaderLines" type="CT_Boolean" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="leaderLines" type="CT_ChartLines" minOccurs="0" maxOccurs="1"/>

export type GroupDataLabelsOptions = DataLabelSharedOptions & {
    readonly leaderLines?: {
        readonly show?: boolean;
        readonly shape?: IShapePropertiesOptions;
    };
};

export type DataLabelsOptions = {
    readonly items?: DataLabelOptions[];
    readonly extensionList?: ExtensionListOptions;
} & ({ readonly delete: boolean } | GroupDataLabelsOptions);

// <xsd:element name="dLbl" type="CT_DLbl" minOccurs="0" maxOccurs="unbounded"/>
// <xsd:choice>
//     <xsd:element name="delete" type="CT_Boolean" minOccurs="1" maxOccurs="1"/>
//     <xsd:group ref="Group_DLbls" minOccurs="1" maxOccurs="1"/>
// </xsd:choice>
// <xsd:element name="extLst" type="CT_ExtensionList" minOccurs="0" maxOccurs="1"/>

export class DataLabels extends XmlComponent {
    public constructor({ items, extensionList, ...options }: DataLabelsOptions) {
        super("c:dLbls");
        items?.forEach((item, index) => {
            this.root.push(new DataLabel({ ...item, index }));
        });
        if ("delete" in options) {
            this.root.push(new BooleanElement("c:delete", options.delete, ""));
        }
        if (!("delete" in options)) {
            addDataLabelSharedOptions(this.root, options);
            this.root.push(new BooleanElement("c:showLeaderLines", options.leaderLines?.show ?? false, ""));
            if (options.leaderLines?.shape) {
                this.root.push(
                    new BuilderElement({
                        name: "c:leaderLines",
                        children: [new ShapeProperties("c:spPr", options.leaderLines.shape)],
                    }),
                );
            }
        }
        if (extensionList) {
            this.root.push(new ExtensionList(extensionList));
        }
    }
}
