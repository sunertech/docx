import { XmlComponent } from "@file/xml-components";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type StockChartOptions = {};

// <xsd:element name="ser" type="CT_LineSer" minOccurs="3" maxOccurs="4"/>
// <xsd:element name="dLbls" type="CT_DLbls" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="dropLines" type="CT_ChartLines" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="hiLowLines" type="CT_ChartLines" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="upDownBars" type="CT_UpDownBars" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="axId" type="CT_UnsignedInt" minOccurs="2" maxOccurs="2"/>
// <xsd:element name="extLst" type="CT_ExtensionList" minOccurs="0" maxOccurs="1"/>

export class StockChart extends XmlComponent {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public constructor(_options: StockChartOptions) {
        super("c:stockChart");
    }
}
