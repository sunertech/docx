import { XmlComponent } from "@file/xml-components";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type Area3DChartOptions = {};

// <xsd:group ref="EG_AreaChartShared" minOccurs="1" maxOccurs="1"/>
// <xsd:element name="gapDepth" type="CT_GapAmount" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="axId" type="CT_UnsignedInt" minOccurs="2" maxOccurs="3"/>
// <xsd:element name="extLst" type="CT_ExtensionList" minOccurs="0" maxOccurs="1"/>

export class Area3DChart extends XmlComponent {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public constructor(_options: Area3DChartOptions) {
        super("c:area3DChart");
    }
}
