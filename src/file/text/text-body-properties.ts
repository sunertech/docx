import { XmlAttributeComponent, XmlComponent } from "@file/xml-components";

type TextBodyAttributesOptions = {
    readonly rotation?: number;
};

export type TextBodyPropertiesOptions = {} & TextBodyAttributesOptions;

class TextBodyAttributes extends XmlAttributeComponent<TextBodyAttributesOptions> {
    protected readonly xmlKeys = {
        rotation: "rot",
    };
}

// <xsd:sequence>
//     <xsd:element name="prstTxWarp" type="CT_PresetTextShape" minOccurs="0" maxOccurs="1"/>
//     <xsd:group ref="EG_TextAutofit" minOccurs="0" maxOccurs="1"/>
//     <xsd:element name="scene3d" type="CT_Scene3D" minOccurs="0" maxOccurs="1"/>
//     <xsd:group ref="EG_Text3D" minOccurs="0" maxOccurs="1"/>
//     <xsd:element name="extLst" type="CT_OfficeArtExtensionList" minOccurs="0" maxOccurs="1"/>
// </xsd:sequence>
// <xsd:attribute name="rot" type="ST_Angle" use="optional"/>
// <xsd:attribute name="spcFirstLastPara" type="xsd:boolean" use="optional"/>
// <xsd:attribute name="vertOverflow" type="ST_TextVertOverflowType" use="optional"/>
// <xsd:attribute name="horzOverflow" type="ST_TextHorzOverflowType" use="optional"/>
// <xsd:attribute name="vert" type="ST_TextVerticalType" use="optional"/>
// <xsd:attribute name="wrap" type="ST_TextWrappingType" use="optional"/>
// <xsd:attribute name="lIns" type="ST_Coordinate32" use="optional"/>
// <xsd:attribute name="tIns" type="ST_Coordinate32" use="optional"/>
// <xsd:attribute name="rIns" type="ST_Coordinate32" use="optional"/>
// <xsd:attribute name="bIns" type="ST_Coordinate32" use="optional"/>
// <xsd:attribute name="numCol" type="ST_TextColumnCount" use="optional"/>
// <xsd:attribute name="spcCol" type="ST_PositiveCoordinate32" use="optional"/>
// <xsd:attribute name="rtlCol" type="xsd:boolean" use="optional"/>
// <xsd:attribute name="fromWordArt" type="xsd:boolean" use="optional"/>
// <xsd:attribute name="anchor" type="ST_TextAnchoringType" use="optional"/>
// <xsd:attribute name="anchorCtr" type="xsd:boolean" use="optional"/>
// <xsd:attribute name="forceAA" type="xsd:boolean" use="optional"/>
// <xsd:attribute name="upright" type="xsd:boolean" use="optional" default="false"/>
// <xsd:attribute name="compatLnSpc" type="xsd:boolean" use="optional"/>

export class TextBodyProperties extends XmlComponent {
    public constructor({ ...options }: TextBodyPropertiesOptions) {
        super("a:bodyPr");
        this.root.push(new TextBodyAttributes({ rotation: 0, ...options }));
    }
}
