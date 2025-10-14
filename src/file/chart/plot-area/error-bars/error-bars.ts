import { XmlComponent } from "@file/xml-components";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type ErrorBarsOptions = {};

// <xsd:element name="errDir" type="CT_ErrDir" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="errBarType" type="CT_ErrBarType" minOccurs="1" maxOccurs="1"/>
// <xsd:element name="errValType" type="CT_ErrValType" minOccurs="1" maxOccurs="1"/>
// <xsd:element name="noEndCap" type="CT_Boolean" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="plus" type="CT_NumDataSource" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="minus" type="CT_NumDataSource" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="val" type="CT_Double" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="spPr" type="a:CT_ShapeProperties" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="extLst" type="CT_ExtensionList" minOccurs="0" maxOccurs="1"/>

export class ErrorBars extends XmlComponent {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public constructor(_options: ErrorBarsOptions) {
        super("c:errBars");
    }
}
