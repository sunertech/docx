import { XmlComponent } from "@file/xml-components";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type OfPieChartOptions = {};

// <xsd:element name="ofPieType" type="CT_OfPieType" minOccurs="1" maxOccurs="1"/>
// <xsd:group ref="EG_PieChartShared" minOccurs="1" maxOccurs="1"/>
// <xsd:element name="gapWidth" type="CT_GapAmount" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="splitType" type="CT_SplitType" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="splitPos" type="CT_Double" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="custSplit" type="CT_CustSplit" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="secondPieSize" type="CT_SecondPieSize" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="serLines" type="CT_ChartLines" minOccurs="0" maxOccurs="unbounded"/>
// <xsd:element name="extLst" type="CT_ExtensionList" minOccurs="0" maxOccurs="1"/>

export class OfPieChart extends XmlComponent {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public constructor(_options: OfPieChartOptions) {
        super("c:ofPieChart");
    }
}
