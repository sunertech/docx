import { IShapePropertiesOptions, ShapeProperties } from "@file/drawing/inline/graphic/shape-properties/shape-properties";
import { TextSource, TextSourceOptions } from "@file/text/text-source";
import { BooleanElement, XmlComponent } from "@file/xml-components";
import { ExtensionList, ExtensionListOptions } from "../extension-list";
import { Layout, LayoutOptions } from "../plot-area/layout/layout";

export type TitleOptions = {
    readonly textSource?: TextSourceOptions;
    readonly layout?: LayoutOptions;
    readonly overlay?: boolean;
    readonly shape?: IShapePropertiesOptions;
    readonly extensionList?: ExtensionListOptions;
};

// <xsd:element name="tx" type="CT_Tx" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="layout" type="CT_Layout" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="overlay" type="CT_Boolean" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="spPr" type="a:CT_ShapeProperties" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="txPr" type="a:CT_TextBody" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="extLst" type="CT_ExtensionList" minOccurs="0" maxOccurs="1"/>

export class Title extends XmlComponent {
    public constructor({ layout, overlay, shape, textSource, extensionList }: TitleOptions) {
        super("c:title");
        if (textSource) {
            this.root.push(new TextSource(textSource));
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
        if (extensionList) {
            this.root.push(new ExtensionList(extensionList));
        }
    }
}
