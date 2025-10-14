import { XmlComponent } from "@file/xml-components";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type LegendEntryOptions = {};

// <xsd:element name="idx" type="CT_UnsignedInt" minOccurs="1" maxOccurs="1"/>
// <xsd:choice>
//     <xsd:element name="delete" type="CT_Boolean" minOccurs="1" maxOccurs="1"/>
//     <xsd:group ref="EG_LegendEntryData" minOccurs="1" maxOccurs="1"/>
// </xsd:choice>
// <xsd:element name="extLst" type="CT_ExtensionList" minOccurs="0" maxOccurs="1"/>

export class LegendEntry extends XmlComponent {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public constructor(_options: LegendEntryOptions) {
        super("c:legendEntry");
    }
}
