import { XmlComponent } from "@file/xml-components";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type PieChartOptions = {};

// <xsd:group ref="EG_PieChartShared" minOccurs="1" maxOccurs="1"/>
// <xsd:element name="firstSliceAng" type="CT_FirstSliceAng" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="extLst" type="CT_ExtensionList" minOccurs="0" maxOccurs="1"/>

export class PieChart extends XmlComponent {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public constructor(_options: PieChartOptions) {
        super("c:pieChart");
    }
}
