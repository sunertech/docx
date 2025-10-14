import { XmlAttributeComponent, XmlComponent } from "@file/xml-components";

import { GraphicData } from "./graphic-data";
import { Chart } from "./graphic-data/chart/chart";
import { Pic } from "./graphic-data/pic";

class GraphicAttributes extends XmlAttributeComponent<{
    readonly a: string;
}> {
    protected readonly xmlKeys = {
        a: "xmlns:a",
    };
}

export type GraphicOptions = {
    readonly dataElement: Pic | Chart;
    readonly uri: string;
};

export class Graphic extends XmlComponent {
    private readonly data: GraphicData;

    public constructor(options: GraphicOptions) {
        super("a:graphic");
        this.root.push(
            new GraphicAttributes({
                a: "http://schemas.openxmlformats.org/drawingml/2006/main",
            }),
        );

        this.data = new GraphicData(options);

        this.root.push(this.data);
    }
}
