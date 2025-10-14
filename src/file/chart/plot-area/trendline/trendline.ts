import { XmlComponent } from "@file/xml-components";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type TrendlineOptions = {};

// <xsd:element name="name" type="xsd:string" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="spPr" type="a:CT_ShapeProperties" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="trendlineType" type="CT_TrendlineType" minOccurs="1" maxOccurs="1"/>
// <xsd:element name="order" type="CT_Order" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="period" type="CT_Period" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="forward" type="CT_Double" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="backward" type="CT_Double" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="intercept" type="CT_Double" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="dispRSqr" type="CT_Boolean" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="dispEq" type="CT_Boolean" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="trendlineLbl" type="CT_TrendlineLbl" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="extLst" type="CT_ExtensionList" minOccurs="0" maxOccurs="1"/>

export class Trendline extends XmlComponent {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public constructor(_options: TrendlineOptions) {
        super("c:trendline");
    }
}
