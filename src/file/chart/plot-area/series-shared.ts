import { IShapePropertiesOptions, ShapeProperties } from "@file/drawing/inline/graphic/shape-properties/shape-properties";
import { TextSource } from "@file/text/text-source";
import { BaseXmlComponent, NumberValueElement } from "@file/xml-components";

export type SeriesSharedOptions = {
    readonly order?: number;
    readonly name?: string;
    readonly shape?: IShapePropertiesOptions;
};

export type SeriesSharedInternal = {
    readonly index: number;
};

// <xsd:element name="idx" type="CT_UnsignedInt" minOccurs="1" maxOccurs="1"/>
// <xsd:element name="order" type="CT_UnsignedInt" minOccurs="1" maxOccurs="1"/>
// <xsd:element name="tx" type="CT_SerTx" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="spPr" type="a:CT_ShapeProperties" minOccurs="0" maxOccurs="1"/>

export const addSeriesSharedOptions = (
    root: BaseXmlComponent[],
    { index, order, name, shape }: SeriesSharedOptions & SeriesSharedInternal,
): void => {
    root.push(new NumberValueElement("c:idx", index, ""));
    root.push(new NumberValueElement("c:order", order ?? index, ""));
    if (name !== undefined) {
        root.push(new TextSource(name));
    }
    if (shape) {
        root.push(new ShapeProperties("c:spPr", shape));
    }
};
