import { XmlComponent } from "@file/xml-components";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type ExtensionListOptions = {};

// <xsd:element name="ext" type="CT_Extension" minOccurs="0" maxOccurs="unbounded"/>

export class ExtensionList extends XmlComponent {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public constructor(_options: ExtensionListOptions) {
        super("c:extLst");
    }
}
