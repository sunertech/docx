import { BooleanElement, StringValueElement, XmlComponent } from "@file/xml-components";
import { Legend, LegendOptions } from "./legend/legend";
import { PlotArea, PlotAreaOptions } from "./plot-area/plot-area";
import { Title, TitleOptions } from "./title/title";

export type IChartOptions = {
    readonly title?: TitleOptions | string;
    readonly legend?: LegendOptions;
} & PlotAreaOptions;

// <xsd:element name="title" type="CT_Title" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="autoTitleDeleted" type="CT_Boolean" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="pivotFmts" type="CT_PivotFmts" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="view3D" type="CT_View3D" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="floor" type="CT_Surface" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="sideWall" type="CT_Surface" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="backWall" type="CT_Surface" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="plotArea" type="CT_PlotArea" minOccurs="1" maxOccurs="1"/>
// <xsd:element name="legend" type="CT_Legend" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="plotVisOnly" type="CT_Boolean" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="dispBlanksAs" type="CT_DispBlanksAs" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="showDLblsOverMax" type="CT_Boolean" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="extLst" type="CT_ExtensionList" minOccurs="0" maxOccurs="1"/>

export class Chart extends XmlComponent {
    public constructor({ title, legend, ...options }: IChartOptions) {
        super("c:chart");
        if (title) {
            this.root.push(new Title(typeof title === "string" ? { textSource: { paragraph: { text: title } } } : title));
        }
        if (!title) {
            this.root.push(new BooleanElement("c:autoTitleDeleted", true, ""));
        }
        this.root.push(new PlotArea(options));
        if (legend) {
            this.root.push(new Legend(legend));
        }
        this.root.push(new BooleanElement("c:plotVisOnly", true, ""));
        this.root.push(new StringValueElement("c:dispBlanksAs", "gap", ""));
    }
}
