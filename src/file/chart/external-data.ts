import { BooleanElement, XmlAttributeComponent, XmlComponent } from "@file/xml-components";

export type IExternalDataOptions = {
    readonly id: string;
    readonly autoUpdate?: boolean;
};

class ExternalDataAttributes extends XmlAttributeComponent<{ readonly id: string }> {
    protected readonly xmlKeys = {
        id: "r:id",
    };
}

export class ExternalData extends XmlComponent {
    public constructor({ id, autoUpdate }: IExternalDataOptions) {
        super("c:externalData");
        this.root.push(new ExternalDataAttributes({ id }));
        this.root.push(new BooleanElement("c:autoUpdate", autoUpdate ?? false, ""));
    }
}
