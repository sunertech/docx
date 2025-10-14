import { XmlComponent } from "@file/xml-components";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type DataPointOptions = {};

// <xsd:element name="idx" type="CT_UnsignedInt" minOccurs="1" maxOccurs="1"/>
// <xsd:element name="invertIfNegative" type="CT_Boolean" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="marker" type="CT_Marker" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="bubble3D" type="CT_Boolean" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="explosion" type="CT_UnsignedInt" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="spPr" type="a:CT_ShapeProperties" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="pictureOptions" type="CT_PictureOptions" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="extLst" type="CT_ExtensionList" minOccurs="0" maxOccurs="1"/>

export class DataPoint extends XmlComponent {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public constructor(_options: DataPointOptions) {
        super("c:dPt");
    }
}
