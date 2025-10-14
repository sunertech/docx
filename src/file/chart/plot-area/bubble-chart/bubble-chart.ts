import { XmlComponent } from "@file/xml-components";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type BubbleChartOptions = {};

// <xsd:element name="varyColors" type="CT_Boolean" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="ser" type="CT_BubbleSer" minOccurs="0" maxOccurs="unbounded"/>
// <xsd:element name="dLbls" type="CT_DLbls" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="bubble3D" type="CT_Boolean" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="bubbleScale" type="CT_BubbleScale" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="showNegBubbles" type="CT_Boolean" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="sizeRepresents" type="CT_SizeRepresents" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="axId" type="CT_UnsignedInt" minOccurs="2" maxOccurs="2"/>
// <xsd:element name="extLst" type="CT_ExtensionList" minOccurs="0" maxOccurs="1"/>

export class BubbleChart extends XmlComponent {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public constructor(_options: BubbleChartOptions) {
        super("c:bubbleChart");
    }
}
