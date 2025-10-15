import { IShapePropertiesOptions, ShapeProperties } from "@file/drawing/inline/graphic/shape-properties/shape-properties";
import { TextProperties, TextPropertiesOptions } from "@file/text/text-properties";
import { BooleanElement, StringEnumValueElement, XmlComponent } from "@file/xml-components";
import { ExtensionList, ExtensionListOptions } from "../extension-list";
import { Layout, LayoutOptions } from "../plot-area/layout/layout";
import { LegendEntry, LegendEntryOptions } from "./legend-entry";

export enum LegendPosition {
    RIGHT = "r",
    TOP = "t",
    LEFT = "l",
    BOTTOM = "b",
    TOP_RIGHT = "tr",
}

export type LegendOptions = {
    readonly position?: LegendPosition;
    readonly entry?: LegendEntryOptions;
    readonly layout?: LayoutOptions;
    readonly overlay?: boolean;
    readonly shape?: IShapePropertiesOptions;
    readonly textProperties?: TextPropertiesOptions;
    readonly extensionList?: ExtensionListOptions;
};

// <xsd:element name="legendPos" type="CT_LegendPos" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="legendEntry" type="CT_LegendEntry" minOccurs="0" maxOccurs="unbounded"/>
// <xsd:element name="layout" type="CT_Layout" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="overlay" type="CT_Boolean" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="spPr" type="a:CT_ShapeProperties" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="txPr" type="a:CT_TextBody" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="extLst" type="CT_ExtensionList" minOccurs="0" maxOccurs="1"/>

export class Legend extends XmlComponent {
    public constructor({ position, entry, layout, overlay, shape, textProperties, extensionList }: LegendOptions) {
        super("c:legend");

        if (position) {
            this.root.push(new StringEnumValueElement<LegendPosition>("c:legendPos", position, ""));
        }
        if (entry) {
            this.root.push(new LegendEntry(entry));
        }
        if (layout) {
            this.root.push(new Layout(layout));
        }
        if (overlay !== undefined) {
            this.root.push(new BooleanElement("c:overlay", overlay, ""));
        }
        if (shape) {
            this.root.push(new ShapeProperties("c:spPr", shape));
        }
        if (textProperties) {
            this.root.push(new TextProperties("c:txPr", textProperties));
        }
        if (extensionList) {
            this.root.push(new ExtensionList(extensionList));
        }
    }
}
