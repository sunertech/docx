import { IShapePropertiesOptions, ShapeProperties } from "@file/drawing/inline/graphic/shape-properties/shape-properties";
import { BooleanElement, XmlAttributeComponent, XmlComponent } from "@file/xml-components";
import { Chart, ChartOptions } from "./chart";
import { ExternalData } from "./external-data";

class ChartSpaceAttributes extends XmlAttributeComponent<{
    readonly c?: string;
    readonly a?: string;
    readonly r?: string;
}> {
    protected readonly xmlKeys = {
        c: "xmlns:c",
        a: "xmlns:a",
        r: "xmlns:r",
    };
}

export type ChartSpaceOptions = {
    readonly date1904?: boolean;
    readonly roundedCorners?: boolean;
    readonly spaceShape?: IShapePropertiesOptions;
} & ChartOptions;

export class ChartSpace extends XmlComponent {
    public readonly options: ChartOptions;

    public constructor({ date1904, roundedCorners, spaceShape, ...options }: ChartSpaceOptions) {
        super("c:chartSpace");
        this.options = options;

        this.root.push(
            new ChartSpaceAttributes({
                c: "http://schemas.openxmlformats.org/drawingml/2006/chart",
                a: "http://schemas.openxmlformats.org/drawingml/2006/main",
                r: "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
            }),
        );
        this.root.push(new BooleanElement("c:date1904", date1904 ?? true, ""));
        this.root.push(new BooleanElement("c:roundedCorners", roundedCorners ?? false, ""));
        this.root.push(new ShapeProperties("c:spPr", { type: "noFill", outline: { type: "noFill" }, ...spaceShape }));
        this.root.push(new ExternalData({ id: "rId1" }));

        this.root.push(new Chart(options));
    }

    /**
     * Sheet array of array as data table
     */
    public get dataTable(): (number | string)[][] {
        return [
            [
                "",
                ...(this.options.categories ||
                    this.options.lineChart?.categories ||
                    this.options.barChart?.categories ||
                    this.options.lineChart?.series?.[0]?.categories ||
                    this.options.barChart?.series[0]?.categories ||
                    []),
            ],
            ...(this.options.lineChart?.series || []).map((serie) => [serie.name || "", ...(serie.values || [])]),
            ...(this.options.barChart?.series || []).map((serie) => [serie.name || "", ...(serie.values || [])]),
        ];
    }
}
