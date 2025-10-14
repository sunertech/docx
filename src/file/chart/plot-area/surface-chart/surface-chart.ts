import { XmlComponent } from "@file/xml-components";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type SurfaceChartOptions = {};

// <xsd:group ref="EG_SurfaceChartShared" minOccurs="1" maxOccurs="1"/>
// <xsd:element name="axId" type="CT_UnsignedInt" minOccurs="2" maxOccurs="3"/>
// <xsd:element name="extLst" type="CT_ExtensionList" minOccurs="0" maxOccurs="1"/>

export class SurfaceChart extends XmlComponent {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public constructor(_options: SurfaceChartOptions) {
        super("c:surfaceChart");
    }
}
