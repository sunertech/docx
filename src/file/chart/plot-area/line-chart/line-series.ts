import { ExtensionList, ExtensionListOptions } from "@file/chart/extension-list";
import { Marker, MarkerOptions } from "@file/chart/marker/marker";
import { LineCap, PresetLineDash } from "@file/drawing/inline/graphic/shape-properties/outline/outline";
import { NumberSource } from "@file/number/number-source";
import { TextSource } from "@file/text/text-source";
import { BooleanElement, XmlComponent } from "@file/xml-components";
import * as XLSX from "xlsx";
import { DataLabels, DataLabelsOptions } from "../data-labels/data-labels";
import { DataPoint, DataPointOptions } from "../data-point/data-point";
import { ErrorBars, ErrorBarsOptions } from "../error-bars/error-bars";
import { SeriesSharedInternal, SeriesSharedOptions, addSeriesSharedOptions } from "../series-shared";
import { Trendline, TrendlineOptions } from "../trendline/trendline";

//   <xsd:complexType name="CT_LineSer">
//     <xsd:sequence>
//       <xsd:group ref="EG_SerShared" minOccurs="1" maxOccurs="1"/>
//       <xsd:element name="marker" type="CT_Marker" minOccurs="0" maxOccurs="1"/>
//       <xsd:element name="dPt" type="CT_DPt" minOccurs="0" maxOccurs="unbounded"/>
//       <xsd:element name="dLbls" type="CT_DLbls" minOccurs="0" maxOccurs="1"/>
//       <xsd:element name="trendline" type="CT_Trendline" minOccurs="0" maxOccurs="unbounded"/>
//       <xsd:element name="errBars" type="CT_ErrBars" minOccurs="0" maxOccurs="1"/>
//       <xsd:element name="cat" type="CT_AxDataSource" minOccurs="0" maxOccurs="1"/>
//       <xsd:element name="val" type="CT_NumDataSource" minOccurs="0" maxOccurs="1"/>
//       <xsd:element name="smooth" type="CT_Boolean" minOccurs="0" maxOccurs="1"/>
//       <xsd:element name="extLst" type="CT_ExtensionList" minOccurs="0" maxOccurs="1"/>
//     </xsd:sequence>
//   </xsd:complexType>

export type LineSeriesOptions = SeriesSharedOptions & {
    readonly marker?: MarkerOptions;
    readonly dataPoints?: DataPointOptions[];
    readonly dataLabels?: DataLabelsOptions;
    readonly trendlines?: TrendlineOptions[];
    readonly errorBars?: ErrorBarsOptions;
    readonly categories?: string[];
    readonly values?: number[];
    readonly smooth?: boolean;
    readonly extensionList?: ExtensionListOptions;
};

const LineSerieColors = ["accent4", "accent5", "accent6", "accent1", "accent3"] as const;

export class LineSeries extends XmlComponent {
    public constructor({
        marker,
        dataPoints,
        dataLabels,
        trendlines,
        errorBars,
        categories,
        values,
        smooth,
        extensionList,
        ...options
    }: LineSeriesOptions & SeriesSharedInternal) {
        super("c:ser");
        addSeriesSharedOptions(this.root, {
            shape: {
                type: "solidFill",
                solidFillType: "scheme",
                value: LineSerieColors[options.index % LineSerieColors.length],
                outline: {
                    type: "solidFill",
                    solidFillType: "rgb",
                    value: "3F6EC3",
                    width: 47625,
                    cap: LineCap.FLAT,
                    dash: { type: "preset", value: PresetLineDash.SOLID },
                },
            },
            ...options,
        });
        if (marker) {
            this.root.push(new Marker(marker));
        }
        dataPoints?.forEach((item) => {
            this.root.push(new DataPoint(item));
        });
        this.root.push(
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
        trendlines?.forEach((item) => {
            this.root.push(new Trendline(item));
        });
        if (errorBars) {
            this.root.push(new ErrorBars(errorBars));
        }
        if (categories) {
            const column = XLSX.utils.encode_col(categories.length);
            this.root.push(
                new TextSource("c:cat", {
                    formula: `Sheet1!$B$1:$${column}$1`,
                    values: categories,
                }),
            );
        }
        if (values) {
            const column = XLSX.utils.encode_col(values.length);
            this.root.push(
                new NumberSource("c:val", {
                    formula: `Sheet1!$B$${options.refOffset + options.index}:$${column}$${options.refOffset + options.index}`,
                    values,
                }),
            );
        }
        if (smooth !== undefined) {
            this.root.push(new BooleanElement("c:smooth", smooth, ""));
        }
        if (extensionList) {
            this.root.push(new ExtensionList(extensionList));
        }
    }
}
