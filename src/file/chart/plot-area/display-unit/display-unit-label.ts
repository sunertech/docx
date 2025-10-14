import { IShapePropertiesOptions, ShapeProperties } from "@file/drawing/inline/graphic/shape-properties/shape-properties";
import { TextProperties, TextPropertiesOptions } from "@file/text/text-properties";
import { TextSource, TextSourceOptions } from "@file/text/text-source";
import { XmlComponent } from "@file/xml-components";
import { Layout, LayoutOptions } from "../layout/layout";

export type DisplayUnitLabelOptions = {
    readonly layout?: LayoutOptions;
    readonly textSource?: TextSourceOptions;
    readonly shape?: IShapePropertiesOptions;
    readonly textProperties?: TextPropertiesOptions;
};

// <xsd:element name="layout" type="CT_Layout" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="tx" type="CT_Tx" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="spPr" type="a:CT_ShapeProperties" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="txPr" type="a:CT_TextBody" minOccurs="0" maxOccurs="1"/>

export class DisplayUnitLabel extends XmlComponent {
    public constructor({ layout, shape, textSource, textProperties }: DisplayUnitLabelOptions) {
        super("c:dispUnitsLbl");
        if (layout) {
            this.root.push(new Layout(layout));
        }
        if (textSource) {
            this.root.push(new TextSource(textSource));
        }
        if (shape) {
            this.root.push(new ShapeProperties("c:spPr", shape));
        }
        if (textProperties) {
            this.root.push(new TextProperties("c:txPr", textProperties));
        }
    }
}
