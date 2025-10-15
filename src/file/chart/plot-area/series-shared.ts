import { LineCap } from "@file/drawing/inline/graphic/shape-properties/outline/outline";
import { IShapePropertiesOptions, ShapeProperties } from "@file/drawing/inline/graphic/shape-properties/shape-properties";
import { TextSource } from "@file/text/text-source";
import { BaseXmlComponent, NumberValueElement } from "@file/xml-components";

export type SeriesSharedOptions = {
    readonly order?: number;
    readonly name?: string;
    readonly shape?: IShapePropertiesOptions;
};

export type SeriesSharedInternal = {
    readonly refOffset: number;
    readonly index: number;
};

const SerieColors = ["accent1", "accent3", "accent4", "accent5", "accent6"] as const;

// <xsd:element name="idx" type="CT_UnsignedInt" minOccurs="1" maxOccurs="1"/>
// <xsd:element name="order" type="CT_UnsignedInt" minOccurs="1" maxOccurs="1"/>
// <xsd:element name="tx" type="CT_SerTx" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="spPr" type="a:CT_ShapeProperties" minOccurs="0" maxOccurs="1"/>

export const addSeriesSharedOptions = (
    root: BaseXmlComponent[],
    { index, refOffset, order, name, shape }: SeriesSharedOptions & SeriesSharedInternal,
): void => {
    root.push(new NumberValueElement("c:idx", index, ""));
    root.push(new NumberValueElement("c:order", order ?? index, ""));
    if (name !== undefined) {
        root.push(new TextSource("c:tx", { formula: `Sheet1!$A$${refOffset + index}`, values: [name] }));
    }
    root.push(
        new ShapeProperties(
            "c:spPr",
            shape || {
                type: "solidFill",
                solidFillType: "scheme",
                value: SerieColors[index % SerieColors.length],
                outline: {
                    type: "noFill",
                    width: 12700,
                    cap: LineCap.FLAT,
                    join: { type: "miter", limit: 400000 },
                },
            },
        ),
    );
};
