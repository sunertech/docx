import { XmlComponent } from "@file/xml-components";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type SeriesAxisOptions = {};

// <xsd:group ref="EG_AxShared" minOccurs="1" maxOccurs="1"/>
// <xsd:element name="tickLblSkip" type="CT_Skip" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="tickMarkSkip" type="CT_Skip" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="extLst" type="CT_ExtensionList" minOccurs="0" maxOccurs="1"/>

export class SeriesAxis extends XmlComponent {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public constructor(_options: SeriesAxisOptions) {
        super("c:serAx");
    }
}
