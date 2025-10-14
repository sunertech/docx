import { XmlComponent } from "@file/xml-components";

import { Chart } from "./chart/chart";
import { GraphicDataAttributes } from "./graphic-data-attribute";
import { Pic } from "./pic";

export class GraphicData extends XmlComponent {
    public constructor({ dataElement, uri }: { readonly dataElement: Pic | Chart; readonly uri: string }) {
        super("a:graphicData");

        this.root.push(new GraphicDataAttributes({ uri }));

        this.root.push(dataElement);
    }
}
