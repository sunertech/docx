import { XmlComponent } from "@file/xml-components";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type LineChartOptions = {};

// <xsd:group ref="EG_LineChartShared" minOccurs="1" maxOccurs="1"/>
// <xsd:element name="hiLowLines" type="CT_ChartLines" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="upDownBars" type="CT_UpDownBars" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="marker" type="CT_Boolean" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="smooth" type="CT_Boolean" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="axId" type="CT_UnsignedInt" minOccurs="2" maxOccurs="2"/>
// <xsd:element name="extLst" type="CT_ExtensionList" minOccurs="0" maxOccurs="1"/>

export class LineChart extends XmlComponent {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public constructor(_options: LineChartOptions) {
        super("c:lineChart");
    }
}
