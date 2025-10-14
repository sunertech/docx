import { IViewWrapper } from "../document-wrapper";
import { File } from "../file";
import { IXmlableObject } from "./xmlable-object";

export type IContext = {
    readonly file: File;
    readonly viewWrapper: IViewWrapper;
    readonly stack: IXmlableObject[];
};

export abstract class BaseXmlComponent {
    protected rootKey: string;

    public constructor(rootKey: string) {
        this.rootKey = rootKey;
    }

    public abstract prepForXml(context: IContext): IXmlableObject | undefined;
}
