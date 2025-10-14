import { IShapePropertiesOptions, ShapeProperties } from "@file/drawing/inline/graphic/shape-properties/shape-properties";
import { BooleanElement, XmlAttributeComponent, XmlComponent } from "@file/xml-components";
import { Chart, IChartOptions } from "./chart";
import { ExternalData, IExternalDataOptions } from "./external-data";

export class ChartSpaceAttributes extends XmlAttributeComponent<{
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

export type IChartSpaceOptions = {
    readonly date1904?: boolean;
    readonly roundedCorners?: boolean;
    readonly shapeProperties?: IShapePropertiesOptions;
    readonly externalData?: IExternalDataOptions;
} & IChartOptions;

export class ChartSpace extends XmlComponent {
    public constructor({ date1904, roundedCorners, shapeProperties, externalData, ...options }: IChartSpaceOptions) {
        super("c:chartSpace");
        this.root.push(
            new ChartSpaceAttributes({
                c: "http://schemas.openxmlformats.org/drawingml/2006/chart",
                a: "http://schemas.openxmlformats.org/drawingml/2006/main",
                r: "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
            }),
        );
        this.root.push(new BooleanElement("c:date1904", date1904 ?? true, ""));
        this.root.push(new BooleanElement("c:roundedCorners", roundedCorners ?? false, ""));
        if (shapeProperties !== undefined) {
            this.root.push(new ShapeProperties("c:spPr", shapeProperties));
        }
        if (externalData !== undefined) {
            this.root.push(new ExternalData(externalData));
        }

        this.root.push(new Chart(options));
    }
}
