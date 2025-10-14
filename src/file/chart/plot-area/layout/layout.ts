import { XmlComponent } from "@file/xml-components";
import { ManualLayout, ManualLayoutOptions } from "./manual-layout";

export type LayoutOptions = {} & ManualLayoutOptions;

// <xsd:element name="manualLayout" type="CT_ManualLayout" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="extLst" type="CT_ExtensionList" minOccurs="0" maxOccurs="1"/>

export class Layout extends XmlComponent {
    public constructor({ ...options }: LayoutOptions) {
        super("c:layout");
        this.root.push(new ManualLayout(options));
    }
}
