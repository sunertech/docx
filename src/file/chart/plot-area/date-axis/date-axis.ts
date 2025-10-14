import { XmlComponent } from "@file/xml-components";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type DateAxisOptions = {};

// <xsd:group ref="EG_AxShared" minOccurs="1" maxOccurs="1"/>
// <xsd:element name="auto" type="CT_Boolean" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="lblOffset" type="CT_LblOffset" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="baseTimeUnit" type="CT_TimeUnit" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="majorUnit" type="CT_AxisUnit" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="majorTimeUnit" type="CT_TimeUnit" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="minorUnit" type="CT_AxisUnit" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="minorTimeUnit" type="CT_TimeUnit" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="extLst" type="CT_ExtensionList" minOccurs="0" maxOccurs="1"/>

export class DateAxis extends XmlComponent {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public constructor(_options: DateAxisOptions) {
        super("c:dateAx");
    }
}
