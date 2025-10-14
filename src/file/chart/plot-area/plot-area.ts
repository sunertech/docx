import { LineCap, PresetLineDash } from "@file/drawing/inline/graphic/shape-properties/outline/outline";
import { IShapePropertiesOptions, ShapeProperties } from "@file/drawing/inline/graphic/shape-properties/shape-properties";
import { XmlComponent } from "@file/xml-components";
import { AreaChart, AreaChartOptions } from "./area-chart/area-chart";
import { Area3DChart, Area3DChartOptions } from "./area3d-chart/area3d-chart";
import { BarChart, BarChartOptions } from "./bar-chart/bar-chart";
import { Bar3DChart, Bar3DChartOptions } from "./bar3d-chart/bar3d-chart";
import { BubbleChart, BubbleChartOptions } from "./bubble-chart/bubble-chart";
import { CategoryAxis, CategoryAxisOptions } from "./category-axis/category-axis";
import { DateAxis, DateAxisOptions } from "./date-axis/date-axis";
import { DoughnutChart, DoughnutChartOptions } from "./doughnut-chart/doughnut-chart";
import { Layout, LayoutOptions } from "./layout/layout";
import { LineChart, LineChartOptions } from "./line-chart/line-chart";
import { Line3DChart, Line3DChartOptions } from "./line3d-chart/line3d-chart";
import { OfPieChart, OfPieChartOptions } from "./of-pie-chart/of-pie-chart";
import { PieChart, PieChartOptions } from "./pie-chart/pie-chart";
import { Pie3DChart, Pie3DChartOptions } from "./pie3d-chart/pie3d-chart";
import { RadarChart, RadarChartOptions } from "./radar-chart/radar-chart";
import { ScatterChart, ScatterChartOptions } from "./scatter-chart/scatter-chart";
import { SeriesAxis, SeriesAxisOptions } from "./series-axis/series-axis";
import { StockChart, StockChartOptions } from "./stock-chart/stock-chart";
import { SurfaceChart, SurfaceChartOptions } from "./surface-chart/surface-chart";
import { Surface3DChart, Surface3DChartOptions } from "./surface3d-chart/surface3d-chart";
import { ValueAxis, ValueAxisOptions } from "./value-axis/value-axis";

export type PlotAreaOptions = {
    readonly categories?: string[];
    readonly layout?: LayoutOptions;
    readonly areaChart?: AreaChartOptions;
    readonly area3DChart?: Area3DChartOptions;
    readonly lineChart?: LineChartOptions;
    readonly line3DChart?: Line3DChartOptions;
    readonly stockChart?: StockChartOptions;
    readonly radarChart?: RadarChartOptions;
    readonly scatterChart?: ScatterChartOptions;
    readonly pieChart?: PieChartOptions;
    readonly pie3DChart?: Pie3DChartOptions;
    readonly doughnutChart?: DoughnutChartOptions;
    readonly barChart?: BarChartOptions;
    readonly bar3DChart?: Bar3DChartOptions;
    readonly ofPieChart?: OfPieChartOptions;
    readonly surfaceChart?: SurfaceChartOptions;
    readonly surface3DChart?: Surface3DChartOptions;
    readonly bubbleChart?: BubbleChartOptions;
    readonly valueAxis?: ValueAxisOptions;
    readonly categoryAxis?: CategoryAxisOptions;
    readonly dateAxis?: DateAxisOptions;
    readonly seriesAxis?: SeriesAxisOptions;
    readonly shape?: IShapePropertiesOptions;
};

// <xsd:element name="layout" type="CT_Layout" minOccurs="0" maxOccurs="1"/>
// <xsd:choice minOccurs="1" maxOccurs="unbounded">
//     <xsd:element name="areaChart" type="CT_AreaChart" minOccurs="1" maxOccurs="1"/>
//     <xsd:element name="area3DChart" type="CT_Area3DChart" minOccurs="1" maxOccurs="1"/>
//     <xsd:element name="lineChart" type="CT_LineChart" minOccurs="1" maxOccurs="1"/>
//     <xsd:element name="line3DChart" type="CT_Line3DChart" minOccurs="1" maxOccurs="1"/>
//     <xsd:element name="stockChart" type="CT_StockChart" minOccurs="1" maxOccurs="1"/>
//     <xsd:element name="radarChart" type="CT_RadarChart" minOccurs="1" maxOccurs="1"/>
//     <xsd:element name="scatterChart" type="CT_ScatterChart" minOccurs="1" maxOccurs="1"/>
//     <xsd:element name="pieChart" type="CT_PieChart" minOccurs="1" maxOccurs="1"/>
//     <xsd:element name="pie3DChart" type="CT_Pie3DChart" minOccurs="1" maxOccurs="1"/>
//     <xsd:element name="doughnutChart" type="CT_DoughnutChart" minOccurs="1" maxOccurs="1"/>
//     <xsd:element name="barChart" type="CT_BarChart" minOccurs="1" maxOccurs="1"/>
//     <xsd:element name="bar3DChart" type="CT_Bar3DChart" minOccurs="1" maxOccurs="1"/>
//     <xsd:element name="ofPieChart" type="CT_OfPieChart" minOccurs="1" maxOccurs="1"/>
//     <xsd:element name="surfaceChart" type="CT_SurfaceChart" minOccurs="1" maxOccurs="1"/>
//     <xsd:element name="surface3DChart" type="CT_Surface3DChart" minOccurs="1" maxOccurs="1"/>
//     <xsd:element name="bubbleChart" type="CT_BubbleChart" minOccurs="1" maxOccurs="1"/>
// </xsd:choice>
// <xsd:choice minOccurs="0" maxOccurs="unbounded">
//     <xsd:element name="valAx" type="CT_ValAx" minOccurs="1" maxOccurs="1"/>
//     <xsd:element name="catAx" type="CT_CatAx" minOccurs="1" maxOccurs="1"/>
//     <xsd:element name="dateAx" type="CT_DateAx" minOccurs="1" maxOccurs="1"/>
//     <xsd:element name="serAx" type="CT_SerAx" minOccurs="1" maxOccurs="1"/>
// </xsd:choice>
// <xsd:element name="dTable" type="CT_DTable" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="spPr" type="a:CT_ShapeProperties" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="extLst" type="CT_ExtensionList" minOccurs="0" maxOccurs="1"/>

export class PlotArea extends XmlComponent {
    public constructor({
        categories,
        shape,
        layout,
        areaChart,
        area3DChart,
        lineChart,
        line3DChart,
        stockChart,
        radarChart,
        scatterChart,
        pieChart,
        pie3DChart,
        doughnutChart,
        barChart,
        bar3DChart,
        ofPieChart,
        surfaceChart,
        surface3DChart,
        bubbleChart,
        valueAxis,
        categoryAxis,
        dateAxis,
        seriesAxis,
    }: PlotAreaOptions) {
        super("c:plotArea");
        if (layout) {
            this.root.push(new Layout(layout));
        }
        const categoryAxisId = 2094734552;
        const valueAxisId = 2094734553;
        const dateAxisId = 2094734554;
        const seriesAxisId = 2094734555;

        if (areaChart) {
            this.root.push(new AreaChart(areaChart));
        }
        if (area3DChart) {
            this.root.push(new Area3DChart(area3DChart));
        }
        if (lineChart) {
            this.root.push(new LineChart(lineChart));
        }
        if (line3DChart) {
            this.root.push(new Line3DChart(line3DChart));
        }
        if (stockChart) {
            this.root.push(new StockChart(stockChart));
        }
        if (radarChart) {
            this.root.push(new RadarChart(radarChart));
        }
        if (scatterChart) {
            this.root.push(new ScatterChart(scatterChart));
        }
        if (pieChart) {
            this.root.push(new PieChart(pieChart));
        }
        if (pie3DChart) {
            this.root.push(new Pie3DChart(pie3DChart));
        }
        if (doughnutChart) {
            this.root.push(new DoughnutChart(doughnutChart));
        }
        if (barChart) {
            this.root.push(
                new BarChart({
                    ...barChart,
                    series: barChart.series.map((serie) => ({ categories: barChart.categories || categories, ...serie })),
                    axisId: { category: categoryAxisId, value: valueAxisId },
                }),
            );
        }
        if (bar3DChart) {
            this.root.push(new Bar3DChart(bar3DChart));
        }
        if (ofPieChart) {
            this.root.push(new OfPieChart(ofPieChart));
        }
        if (surfaceChart) {
            this.root.push(new SurfaceChart(surfaceChart));
        }
        if (surface3DChart) {
            this.root.push(new Surface3DChart(surface3DChart));
        }
        if (bubbleChart) {
            this.root.push(new BubbleChart(bubbleChart));
        }

        if (valueAxis || barChart) {
            this.root.push(
                new ValueAxis({
                    cross: {
                        axis: "category",
                        ...valueAxis?.cross,
                    },
                    tick: {
                        label: {
                            position: "nextTo",
                            ...valueAxis?.tick?.label,
                        },
                        ...valueAxis?.tick,
                    },
                    position: "l",
                    scaling: {},
                    gridlines: {
                        major: valueAxis?.gridlines?.major ?? {
                            outline: {
                                width: 12700,
                                cap: LineCap.FLAT,
                                type: "solidFill",
                                solidFillType: "rgb",
                                value: "B8B8B8",
                                dash: { type: "preset", value: PresetLineDash.SOLID },
                                join: { type: "miter", limit: 400000 },
                            },
                        },
                        ...valueAxis?.gridlines,
                    },
                    ...valueAxis,
                    id: valueAxisId,
                    ids: {
                        category: categoryAxisId,
                        value: valueAxisId,
                        date: dateAxisId,
                        series: seriesAxisId,
                    },
                }),
            );
        }
        if (categoryAxis || barChart) {
            this.root.push(
                new CategoryAxis({
                    cross: {
                        axis: "value",
                        ...categoryAxis?.cross,
                    },
                    position: "b",
                    scaling: {},
                    ...categoryAxis,
                    id: categoryAxisId,
                    ids: {
                        category: categoryAxisId,
                        value: valueAxisId,
                        date: dateAxisId,
                        series: seriesAxisId,
                    },
                }),
            );
        }
        if (dateAxis) {
            this.root.push(new DateAxis(dateAxis));
        }
        if (seriesAxis) {
            this.root.push(new SeriesAxis(seriesAxis));
        }

        if (shape !== undefined) {
            this.root.push(new ShapeProperties("c:spPr", shape));
        }
    }
}
