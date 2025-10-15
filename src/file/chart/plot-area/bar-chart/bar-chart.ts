import { IShapePropertiesOptions, ShapeProperties } from "@file/drawing/inline/graphic/shape-properties/shape-properties";
import {
    BooleanElement,
    BuilderElement,
    NumberValueElement,
    StringEnumValueElement,
    StringValueElement,
    XmlComponent,
} from "@file/xml-components";
import { BarSeries, BarSeriesOptions } from "./bar-series";

type BarDirection = "bar" | "col";
type BarGrouping = "percentStacked" | "clustered" | "standard" | "stacked";

export type BarChartOptions = {
    readonly categories?: string[];
    readonly direction?: BarDirection;
    readonly grouping?: BarGrouping;
    readonly varyColors?: boolean;
    readonly series: BarSeriesOptions[];
    readonly gapWidth?: number | string;
    readonly overlap?: number | string;
    readonly lineShape?: IShapePropertiesOptions;
};

type InternalOptions = {
    readonly refOffset: number;
    readonly axisId: {
        readonly category: number;
        readonly value: number;
    };
};

// <xsd:element name="barDir" type="CT_BarDir" minOccurs="1" maxOccurs="1"/>
// <xsd:element name="grouping" type="CT_BarGrouping" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="varyColors" type="CT_Boolean" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="ser" type="CT_BarSer" minOccurs="0" maxOccurs="unbounded"/>
// <xsd:element name="dLbls" type="CT_DLbls" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="gapWidth" type="CT_GapAmount" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="overlap" type="CT_Overlap" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="serLines" type="CT_ChartLines" minOccurs="0" maxOccurs="unbounded"/>
// <xsd:element name="axId" type="CT_UnsignedInt" minOccurs="2" maxOccurs="2"/>
// <xsd:element name="extLst" type="CT_ExtensionList" minOccurs="0" maxOccurs="1"/>

export class BarChart extends XmlComponent {
    public constructor({
        categories,
        direction,
        grouping,
        varyColors,
        series,
        gapWidth,
        overlap,
        lineShape,
        axisId,
        refOffset,
    }: BarChartOptions & InternalOptions) {
        super("c:barChart");
        this.root.push(new StringEnumValueElement<BarDirection>("c:barDir", direction || "col", ""));
        this.root.push(new StringEnumValueElement<BarGrouping>("c:grouping", grouping || "stacked", ""));
        this.root.push(new BooleanElement("c:varyColors", varyColors ?? false, ""));
        series.forEach((item, index) => {
            this.root.push(new BarSeries({ categories, refOffset, ...item, index }));
        });
        this.root.push(
            typeof gapWidth === "string"
                ? new StringValueElement("c:gapWidth", gapWidth, "")
                : new NumberValueElement("c:gapWidth", gapWidth ?? 150, ""),
        );
        this.root.push(
            typeof overlap === "string"
                ? new StringValueElement("c:overlap", overlap, "")
                : new NumberValueElement("c:overlap", overlap ?? 0, ""),
        );
        if (lineShape !== undefined) {
            this.root.push(
                new BuilderElement({
                    name: "c:serLines",
                    children: [new ShapeProperties("c:spPr", lineShape)],
                }),
            );
        }
        this.root.push(new NumberValueElement("c:axId", axisId.category, ""));
        this.root.push(new NumberValueElement("c:axId", axisId.value, ""));
    }
}
