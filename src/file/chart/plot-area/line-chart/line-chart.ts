import { ExtensionList, ExtensionListOptions } from "@file/chart/extension-list";
import { IShapePropertiesOptions, ShapeProperties } from "@file/drawing/inline/graphic/shape-properties/shape-properties";
import { BooleanElement, BuilderElement, NumberValueElement, StringValueElement, XmlComponent } from "@file/xml-components";
import { LineChartSharedInternalOptions, LineChartSharedOptions, addLineChartSharedOptions } from "./line-chart-shared";

// <xsd:group ref="EG_LineChartShared" minOccurs="1" maxOccurs="1"/>
// <xsd:element name="hiLowLines" type="CT_ChartLines" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="upDownBars" type="CT_UpDownBars" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="marker" type="CT_Boolean" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="smooth" type="CT_Boolean" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="axId" type="CT_UnsignedInt" minOccurs="2" maxOccurs="2"/>
// <xsd:element name="extLst" type="CT_ExtensionList" minOccurs="0" maxOccurs="1"/>

export type LineChartOptions = LineChartSharedOptions & {
    readonly lines?: {
        readonly hiLow?: IShapePropertiesOptions;
    } & LineChartSharedOptions["lines"];
    readonly bars?: {
        readonly gapWidth?: number | string;
        readonly up?: {
            readonly shape?: IShapePropertiesOptions;
        };
        readonly down?: {
            readonly shape?: IShapePropertiesOptions;
        };
        readonly extensionList?: ExtensionListOptions;
    };
    readonly marker?: boolean;
    readonly smooth?: boolean;
    readonly extensionList?: ExtensionListOptions;
};

type InternalOptions = LineChartSharedInternalOptions & {
    readonly axisId: {
        readonly category: number;
        readonly value: number;
    };
};

export class LineChart extends XmlComponent {
    public constructor({ lines, bars, marker, smooth, axisId, extensionList, ...options }: LineChartOptions & InternalOptions) {
        super("c:lineChart");
        addLineChartSharedOptions(this.root, options);
        if (lines?.hiLow !== undefined) {
            this.root.push(
                new BuilderElement({
                    name: "c:hiLowLines",
                    children: [new ShapeProperties("c:spPr", lines.hiLow)],
                }),
            );
        }
        if (bars !== undefined) {
            this.root.push(
                new BuilderElement({
                    name: "c:upDownBars",
                    children: [
                        ...(bars.gapWidth !== undefined ? [new StringValueElement("c:gapWidth", `${bars.gapWidth}`, "")] : []),
                        ...(bars.up?.shape
                            ? [
                                  new BuilderElement({
                                      name: "c:upBars",
                                      children: [new ShapeProperties("c:spPr", bars.up.shape)],
                                  }),
                              ]
                            : []),
                        ...(bars.down?.shape
                            ? [
                                  new BuilderElement({
                                      name: "c:downBars",
                                      children: [new ShapeProperties("c:spPr", bars.down.shape)],
                                  }),
                              ]
                            : []),
                        ...(bars.extensionList ? [new ExtensionList(bars.extensionList)] : []),
                    ],
                }),
            );
        }
        if (marker !== undefined) {
            this.root.push(new BooleanElement("c:marker", marker, ""));
        }
        if (smooth !== undefined) {
            this.root.push(new BooleanElement("c:smooth", smooth, ""));
        }
        this.root.push(new NumberValueElement("c:axId", axisId.category, ""));
        this.root.push(new NumberValueElement("c:axId", axisId.value, ""));
        if (extensionList !== undefined) {
            this.root.push(new ExtensionList(extensionList));
        }
    }
}
