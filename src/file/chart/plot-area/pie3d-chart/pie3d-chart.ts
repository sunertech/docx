import { XmlComponent } from "@file/xml-components";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type Pie3DChartOptions = {};

// <xsd:group ref="EG_PieChartShared" minOccurs="1" maxOccurs="1"/>
// <xsd:element name="extLst" type="CT_ExtensionList" minOccurs="0" maxOccurs="1"/>

export class Pie3DChart extends XmlComponent {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public constructor(_options: Pie3DChartOptions) {
        super("c:pie3DChart");
    }
}
