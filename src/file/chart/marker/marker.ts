import { ExtensionList, ExtensionListOptions } from "@file/chart/extension-list";
import { IShapePropertiesOptions, ShapeProperties } from "@file/drawing/inline/graphic/shape-properties/shape-properties";
import { NumberValueElement, StringEnumValueElement, XmlComponent } from "@file/xml-components";

export enum MarkerStyle {
    CIRCLE = "circle",
    DASH = "dash",
    DIAMOND = "diamond",
    DOT = "dot",
    NONE = "none",
    PICTURE = "picture",
    PLUS = "plus",
    SQUARE = "square",
    STAR = "star",
    TRIANGLE = "triangle",
    X = "x",
    AUTO = "auto",
}

//   <xsd:complexType name="CT_Marker">
//     <xsd:sequence>
//       <xsd:element name="symbol" type="CT_MarkerStyle" minOccurs="0" maxOccurs="1"/>
//       <xsd:element name="size" type="CT_MarkerSize" minOccurs="0" maxOccurs="1"/>
//       <xsd:element name="spPr" type="a:CT_ShapeProperties" minOccurs="0" maxOccurs="1"/>
//       <xsd:element name="extLst" type="CT_ExtensionList" minOccurs="0" maxOccurs="1"/>
//     </xsd:sequence>
//   </xsd:complexType>

export type MarkerOptions = {
    readonly symbol?: MarkerStyle;
    readonly size?: number;
    readonly shape?: IShapePropertiesOptions;
    readonly extensionList?: ExtensionListOptions;
};

export class Marker extends XmlComponent {
    public constructor({ symbol, size, shape, extensionList }: MarkerOptions) {
        super("c:marker");
        if (symbol) {
            this.root.push(new StringEnumValueElement<MarkerStyle>("c:symbol", symbol, ""));
        }
        if (size !== undefined) {
            this.root.push(new NumberValueElement("c:size", size, ""));
        }
        if (shape) {
            this.root.push(new ShapeProperties("c:spPr", shape));
        }
        if (extensionList) {
            this.root.push(new ExtensionList(extensionList));
        }
    }
}
