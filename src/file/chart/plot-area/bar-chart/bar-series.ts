import { ExtensionList, ExtensionListOptions } from "@file/chart/extension-list";
import { NumberSource } from "@file/number/number-source";
import { TextSource } from "@file/text/text-source";
import { BooleanElement, StringEnumValueElement, XmlComponent } from "@file/xml-components";
import * as XLSX from "xlsx";
import { DataLabels, DataLabelsOptions } from "../data-labels/data-labels";
import { DataPoint, DataPointOptions } from "../data-point/data-point";
import { ErrorBars, ErrorBarsOptions } from "../error-bars/error-bars";
import { PictureOptions, PictureOptionsOptions } from "../picture-options/picture-options";
import { SeriesSharedInternal, SeriesSharedOptions, addSeriesSharedOptions } from "../series-shared";
import { Trendline, TrendlineOptions } from "../trendline/trendline";

type Shape = "cone" | "coneToMax" | "box" | "cylinder" | "pyramid" | "pyramidToMax";

export type BarSeriesOptions = SeriesSharedOptions & {
    readonly invertIfNegative?: boolean;
    readonly pictureOptions?: PictureOptionsOptions;
    readonly dataPoints?: DataPointOptions[];
    readonly dataLabels?: DataLabelsOptions;
    readonly trendlines?: TrendlineOptions[];
    readonly errorBars?: ErrorBarsOptions;
    readonly categories?: string[];
    readonly values?: number[];
    readonly shape?: Shape;
    readonly extensionList?: ExtensionListOptions;
};

// <xsd:group ref="EG_SerShared" minOccurs="1" maxOccurs="1"/>
// <xsd:element name="invertIfNegative" type="CT_Boolean" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="pictureOptions" type="CT_PictureOptions" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="dPt" type="CT_DPt" minOccurs="0" maxOccurs="unbounded"/>
// <xsd:element name="dLbls" type="CT_DLbls" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="trendline" type="CT_Trendline" minOccurs="0" maxOccurs="unbounded"/>
// <xsd:element name="errBars" type="CT_ErrBars" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="cat" type="CT_AxDataSource" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="val" type="CT_NumDataSource" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="shape" type="CT_Shape" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="extLst" type="CT_ExtensionList" minOccurs="0" maxOccurs="1"/>

export class BarSeries extends XmlComponent {
    public constructor({
        invertIfNegative,
        pictureOptions,
        dataPoints,
        dataLabels,
        trendlines,
        errorBars,
        categories,
        values,
        shape,
        extensionList,
        ...options
    }: BarSeriesOptions & SeriesSharedInternal) {
        super("c:ser");
        addSeriesSharedOptions(this.root, options);
        this.root.push(new BooleanElement("c:invertIfNegative", invertIfNegative ?? false, ""));
        if (pictureOptions) {
            this.root.push(new PictureOptions(pictureOptions));
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
                    formula: `Sheet1!$B$${options.index + 2}:$${column}$${options.index + 2}`,
                    values,
                }),
            );
        }
        if (shape) {
            this.root.push(new StringEnumValueElement<Shape>("c:shape", shape, ""));
        }
        if (extensionList) {
            this.root.push(new ExtensionList(extensionList));
        }
    }
}
