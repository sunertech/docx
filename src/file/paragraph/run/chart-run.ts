import { ChartSpace, IChartSpaceOptions } from "@file/chart";
import { Drawing, DrawingCoreOptions } from "@file/drawing";
import { Chart } from "@file/drawing/inline/graphic/graphic-data/chart/chart";
import { SizeProperty } from "@file/media";
import { Run } from "@file/paragraph/run";
import { IContext, IXmlableObject } from "@file/xml-components";
import { uniqueUuid } from "@util/convenience-functions";

export type IChartRunOptions = IChartSpaceOptions & DrawingCoreOptions & SizeProperty;

export class ChartRun extends Run {
    private readonly id: string;
    private readonly chartSpace: ChartSpace;

    public constructor({ width, height, floating, altText, outline, ...options }: IChartRunOptions) {
        super({});
        this.chartSpace = new ChartSpace(options);
        this.id = `chart:${uniqueUuid()}`;
        const uri = "http://schemas.openxmlformats.org/drawingml/2006/chart";
        const dataElement = new Chart({ id: `rId{${this.id}}` });
        const transform = {
            pixels: {
                x: Math.round(width),
                y: Math.round(height),
            },
            emus: {
                x: Math.round(width * 9525),
                y: Math.round(height * 9525),
            },
        };
        const drawing = new Drawing({ uri, dataElement, transform, floating, altText, outline });

        this.root.push(drawing);
    }

    public prepForXml(context: IContext): IXmlableObject | undefined {
        context.file.Charts.add(this.id, this.chartSpace);
        context.file.ContentTypes.addChart(context.file.Charts.Entries.length);

        return super.prepForXml(context);
    }
}
