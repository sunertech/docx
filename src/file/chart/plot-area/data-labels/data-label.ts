import { ExtensionList, ExtensionListOptions } from "@file/chart/extension-list";
import { IShapePropertiesOptions, ShapeProperties } from "@file/drawing/inline/graphic/shape-properties/shape-properties";
import { TextProperties, TextPropertiesOptions } from "@file/text/text-properties";
import { TextSource, TextSourceOptions } from "@file/text/text-source";
import {
    BaseXmlComponent,
    BooleanElement,
    BuilderElement,
    NumberValueElement,
    StringContainer,
    StringEnumValueElement,
    XmlComponent,
} from "@file/xml-components";
import { Layout, LayoutOptions } from "../layout/layout";

type DataLabelPosition = "bestFit" | "b" | "ctr" | "inBase" | "inEnd" | "l" | "outEnd" | "r" | "t";

// <xsd:element name="numFmt" type="CT_NumFmt" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="spPr" type="a:CT_ShapeProperties" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="txPr" type="a:CT_TextBody" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="dLblPos" type="CT_DLblPos" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="showLegendKey" type="CT_Boolean" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="showVal" type="CT_Boolean" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="showCatName" type="CT_Boolean" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="showSerName" type="CT_Boolean" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="showPercent" type="CT_Boolean" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="showBubbleSize" type="CT_Boolean" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="separator" type="xsd:string" minOccurs="0" maxOccurs="1"/>

export type DataLabelSharedOptions = {
    readonly numFmt?: {
        readonly formatCode: string;
        readonly sourceLinked?: boolean;
    };
    readonly shape?: IShapePropertiesOptions;
    readonly textProperties?: TextPropertiesOptions;
    readonly position?: DataLabelPosition;
    readonly showLegendKey?: boolean;
    readonly showValue?: boolean;
    readonly showCategoryName?: boolean;
    readonly showSeriesName?: boolean;
    readonly showPercent?: boolean;
    readonly showBubbleSize?: boolean;
    readonly separator?: string;
};

// <xsd:element name="layout" type="CT_Layout" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="tx" type="CT_Tx" minOccurs="0" maxOccurs="1"/>
// <xsd:group ref="EG_DLblShared" minOccurs="1" maxOccurs="1"/>

export type GroupDataLabelOptions = {
    readonly layout?: LayoutOptions;
    readonly text?: TextSourceOptions | string;
} & DataLabelSharedOptions;

// <xsd:element name="idx" type="CT_UnsignedInt" minOccurs="1" maxOccurs="1"/>
// <xsd:choice>
//     <xsd:element name="delete" type="CT_Boolean" minOccurs="1" maxOccurs="1"/>
//     <xsd:group ref="Group_DLbl" minOccurs="1" maxOccurs="1"/>
// </xsd:choice>
// <xsd:element name="extLst" type="CT_ExtensionList" minOccurs="0" maxOccurs="1"/>

export type DataLabelOptions = {
    readonly extensionList?: ExtensionListOptions;
} & ({ readonly delete: boolean } | GroupDataLabelOptions);

export type DataLabelInternal = {
    readonly index: number;
};

export const addDataLabelSharedOptions = (
    root: BaseXmlComponent[],
    {
        numFmt,
        showLegendKey,
        position,
        separator,
        shape,
        showBubbleSize,
        showCategoryName,
        showPercent,
        showSeriesName,
        showValue,
        textProperties,
    }: DataLabelSharedOptions,
): void => {
    root.push(
        new BuilderElement({
            name: "c:numFmt",
            attributes: {
                formatCode: { key: "formatCode", value: numFmt?.formatCode ?? "General" },
                sourceLinked: { key: "sourceLinked", value: Number(numFmt?.sourceLinked ?? false) },
            },
        }),
    );
    if (shape) {
        root.push(new ShapeProperties("c:spPr", shape));
    }
    if (textProperties) {
        root.push(new TextProperties("c:txPr", textProperties));
    }
    root.push(new StringEnumValueElement<DataLabelPosition>("c:dLblPos", position ?? "ctr", ""));
    root.push(new BooleanElement("c:showLegendKey", showLegendKey ?? false, ""));
    root.push(new BooleanElement("c:showVal", showValue ?? false, ""));
    root.push(new BooleanElement("c:showCatName", showCategoryName ?? false, ""));
    root.push(new BooleanElement("c:showSerName", showSeriesName ?? false, ""));
    root.push(new BooleanElement("c:showPercent", showPercent ?? false, ""));
    root.push(new BooleanElement("c:showBubbleSize", showBubbleSize ?? false, ""));
    if (separator !== undefined) {
        root.push(new StringContainer("c:separator", separator));
    }
};

export class DataLabel extends XmlComponent {
    public constructor({ extensionList, index, ...options }: DataLabelOptions & DataLabelInternal) {
        super("c:dLbl");
        this.root.push(new NumberValueElement("c:idx", index, ""));
        if ("delete" in options) {
            this.root.push(new BooleanElement("c:delete", options.delete, ""));
        }
        if (!("delete" in options)) {
            if (options.layout) {
                this.root.push(new Layout(options.layout));
            }
            if (options.text !== undefined) {
                this.root.push(new TextSource(typeof options.text === "string" ? { paragraph: { text: options.text } } : options.text));
            }
            addDataLabelSharedOptions(this.root, options);
        }
        if (extensionList) {
            this.root.push(new ExtensionList(extensionList));
        }
    }
}
