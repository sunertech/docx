import { XmlComponent } from "@file/xml-components";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type PictureOptionsOptions = {};

// <xsd:element name="applyToFront" type="CT_Boolean" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="applyToSides" type="CT_Boolean" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="applyToEnd" type="CT_Boolean" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="pictureFormat" type="CT_PictureFormat" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="pictureStackUnit" type="CT_PictureStackUnit" minOccurs="0" maxOccurs="1"/>

export class PictureOptions extends XmlComponent {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public constructor(_options: PictureOptionsOptions) {
        super("c:pictureOptions");
    }
}
