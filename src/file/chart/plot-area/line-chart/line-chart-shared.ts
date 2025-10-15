import { IShapePropertiesOptions, ShapeProperties } from "@file/drawing/inline/graphic/shape-properties/shape-properties";
import { BaseXmlComponent, BooleanElement, BuilderElement, StringEnumValueElement } from "@file/xml-components";
import { DataLabels, DataLabelsOptions } from "../data-labels/data-labels";
import { LineSeries, LineSeriesOptions } from "./line-series";

//   <xsd:simpleType name="ST_Grouping">
//     <xsd:restriction base="xsd:string">
//       <xsd:enumeration value="percentStacked"/>
//       <xsd:enumeration value="standard"/>
//       <xsd:enumeration value="stacked"/>
//     </xsd:restriction>
//   </xsd:simpleType>

export enum ChartGrouping {
    PERCENT_STACKED = "percentStacked",
    STANDARD = "standard",
    STACKED = "stacked",
}

// <xsd:group name="EG_LineChartShared">
//     <xsd:sequence>
//         <xsd:element name="grouping" type="CT_Grouping" minOccurs="1" maxOccurs="1"/>
//         <xsd:element name="varyColors" type="CT_Boolean" minOccurs="0" maxOccurs="1"/>
//         <xsd:element name="ser" type="CT_LineSer" minOccurs="0" maxOccurs="unbounded"/>
//         <xsd:element name="dLbls" type="CT_DLbls" minOccurs="0" maxOccurs="1"/>
//         <xsd:element name="dropLines" type="CT_ChartLines" minOccurs="0" maxOccurs="1"/>
//     </xsd:sequence>
// </xsd:group>

export type LineChartSharedOptions = {
    readonly categories?: string[];
    readonly grouping?: ChartGrouping;
    readonly varyColors?: boolean;
    readonly series?: LineSeriesOptions[];
    readonly dataLabels?: DataLabelsOptions;
    readonly lines?: {
        readonly drop?: IShapePropertiesOptions;
    };
};

export type LineChartSharedInternalOptions = {
    readonly refOffset: number;
};

export const addLineChartSharedOptions = (
    root: BaseXmlComponent[],
    { categories, grouping, series, varyColors, dataLabels, lines, refOffset }: LineChartSharedOptions & LineChartSharedInternalOptions,
): void => {
    root.push(new StringEnumValueElement<ChartGrouping>("c:grouping", grouping ?? ChartGrouping.STANDARD, ""));
    root.push(new BooleanElement("c:varyColors", varyColors ?? false, ""));
    series?.forEach((item, index) => {
        root.push(new LineSeries({ categories, ...item, index, refOffset }));
    });
    root.push(
        new DataLabels({
            ...(dataLabels && "delete" in dataLabels
                ? {}
                : {
                      numFmt: {
                          formatCode: "#,##0",
                          ...dataLabels?.numFmt,
                      },
                  }),
            ...dataLabels,
        }),
    );
    if (lines?.drop !== undefined) {
        root.push(
            new BuilderElement({
                name: "c:dropLines",
                children: [new ShapeProperties("c:spPr", lines.drop)],
            }),
        );
    }
};
