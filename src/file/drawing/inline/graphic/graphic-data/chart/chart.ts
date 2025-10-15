import { XmlAttributeComponent, XmlComponent } from "@file/xml-components";

export class ChartAttributes extends XmlAttributeComponent<{
    readonly id: string;
    readonly xmlns: string;
}> {
    protected readonly xmlKeys = {
        id: "r:id",
        xmlns: "xmlns:c",
    };
}

type ChartOptions = {
    readonly id: string;
};

export class Chart extends XmlComponent {
    public constructor({ id }: ChartOptions) {
        super("c:chart");

        this.root.push(
            new ChartAttributes({
                id,
                xmlns: "http://schemas.openxmlformats.org/drawingml/2006/chart",
            }),
        );
    }
}
