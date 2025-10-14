import { NumberValueElement, StringEnumValueElement, XmlComponent } from "@file/xml-components";

type LayoutTarget = "inner" | "outer";
type LayoutMode = "edge" | "factor";

export type ManualLayoutOptions = {
    readonly target?: LayoutTarget;
    readonly mode?: {
        readonly x?: LayoutMode;
        readonly y?: LayoutMode;
        readonly width?: LayoutMode;
        readonly height?: LayoutMode;
    };
    readonly x?: number;
    readonly y?: number;
    readonly width?: number;
    readonly height?: number;
};

// <xsd:element name="layoutTarget" type="CT_LayoutTarget" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="xMode" type="CT_LayoutMode" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="yMode" type="CT_LayoutMode" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="wMode" type="CT_LayoutMode" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="hMode" type="CT_LayoutMode" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="x" type="CT_Double" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="y" type="CT_Double" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="w" type="CT_Double" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="h" type="CT_Double" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="extLst" type="CT_ExtensionList" minOccurs="0" maxOccurs="1"/>

export class ManualLayout extends XmlComponent {
    public constructor({ target, mode, x, y, width, height }: ManualLayoutOptions) {
        super("c:manualLayout");

        if (target) {
            this.root.push(new StringEnumValueElement<LayoutTarget>("c:layoutTarget", target, ""));
        }

        if (mode?.x) {
            this.root.push(new StringEnumValueElement<LayoutMode>("c:xMode", mode.x, ""));
        }
        if (mode?.y) {
            this.root.push(new StringEnumValueElement<LayoutMode>("c:yMode", mode.y, ""));
        }
        if (mode?.width) {
            this.root.push(new StringEnumValueElement<LayoutMode>("c:wMode", mode.width, ""));
        }
        if (mode?.height) {
            this.root.push(new StringEnumValueElement<LayoutMode>("c:hMode", mode.height, ""));
        }

        if (x !== undefined) {
            this.root.push(new NumberValueElement("c:x", x, ""));
        }
        if (y !== undefined) {
            this.root.push(new NumberValueElement("c:y", y, ""));
        }
        if (width !== undefined) {
            this.root.push(new NumberValueElement("c:w", width, ""));
        }
        if (height !== undefined) {
            this.root.push(new NumberValueElement("c:h", height, ""));
        }
    }
}
