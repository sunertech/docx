import { IShapePropertiesOptions, ShapeProperties } from "@file/drawing/inline/graphic/shape-properties/shape-properties";
import { TextProperties, TextPropertiesOptions } from "@file/text/text-properties";
import {
    BaseXmlComponent,
    BooleanElement,
    BuilderElement,
    NumberValueElement,
    StringEnumValueElement,
    XmlComponent,
} from "@file/xml-components";
import { ExtensionList, ExtensionListOptions } from "../extension-list";
import { Title, TitleOptions } from "../title/title";

export enum AxisPosition {
    BOTTOM = "b",
    LEFT = "l",
    RIGHT = "r",
    TOP = "t",
}
export enum TickMark {
    CROSS = "cross",
    IN = "in",
    NONE = "none",
    OUT = "out",
}
export enum TickLabelPosition {
    HIGH = "high",
    LOW = "low",
    NEXT_TO = "nextTo",
    NONE = "none",
}
export enum AxisCrosses {
    AUTO_ZERO = "autoZero",
    MAX = "max",
    MIN = "min",
}
export enum AxisTypes {
    CATEGORY = "category",
    VALUE = "value",
    DATE = "date",
    SERIES = "series",
}
export enum ScalingOrientation {
    MAX_MIN = "maxMin",
    MIN_MAX = "minMax",
}

export type AxisSharedOptions = {
    readonly scaling?: {
        readonly logBase?: number;
        readonly orientation?: ScalingOrientation;
        readonly max?: number;
        readonly min?: number;
        readonly extensionList?: ExtensionListOptions;
    };
    readonly delete?: boolean;
    readonly position?: AxisPosition;
    readonly gridlines?: {
        readonly major?: IShapePropertiesOptions;
        readonly minor?: IShapePropertiesOptions;
    };
    readonly title?: TitleOptions | string;
    readonly numFmt?: {
        readonly formatCode: string;
        readonly sourceLinked?: boolean;
    };
    readonly tick?: {
        readonly mark?: {
            readonly major?: TickMark;
            readonly minor?: TickMark;
        };
        readonly label?: {
            readonly position?: TickLabelPosition;
        };
    };
    readonly shape?: IShapePropertiesOptions;
    readonly textProperties?: TextPropertiesOptions;
    readonly cross?: {
        readonly axis?: AxisTypes;
        readonly mode?: AxisCrosses;
        readonly at?: number;
    };
};

export type AxisSharedInternal = {
    readonly id: number;
    readonly ids: {
        readonly category: number;
        readonly value: number;
        readonly date: number;
        readonly series: number;
    };
};

// <xsd:element name="axId" type="CT_UnsignedInt" minOccurs="1" maxOccurs="1"/>
// <xsd:element name="scaling" type="CT_Scaling" minOccurs="1" maxOccurs="1"/>
// <xsd:element name="delete" type="CT_Boolean" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="axPos" type="CT_AxPos" minOccurs="1" maxOccurs="1"/>
// <xsd:element name="majorGridlines" type="CT_ChartLines" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="minorGridlines" type="CT_ChartLines" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="title" type="CT_Title" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="numFmt" type="CT_NumFmt" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="majorTickMark" type="CT_TickMark" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="minorTickMark" type="CT_TickMark" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="tickLblPos" type="CT_TickLblPos" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="spPr" type="a:CT_ShapeProperties" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="txPr" type="a:CT_TextBody" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="crossAx" type="CT_UnsignedInt" minOccurs="1" maxOccurs="1"/>
// <xsd:choice minOccurs="0" maxOccurs="1">
//     <xsd:element name="crosses" type="CT_Crosses" minOccurs="1" maxOccurs="1"/>
//     <xsd:element name="crossesAt" type="CT_Double" minOccurs="1" maxOccurs="1"/>
// </xsd:choice>

export const addAxisSharedOptions = (
    root: BaseXmlComponent[],
    {
        id,
        ids,
        scaling,
        delete: _delete,
        position,
        gridlines,
        title,
        numFmt,
        tick,
        shape,
        textProperties,
        cross,
    }: AxisSharedOptions & AxisSharedInternal,
): void => {
    root.push(new NumberValueElement("c:axId", id, ""));
    const scalingChildren: XmlComponent[] = [];
    if (scaling?.logBase !== undefined) {
        scalingChildren.push(new NumberValueElement("c:logBase", scaling.logBase, ""));
    }
    scalingChildren.push(
        new StringEnumValueElement<ScalingOrientation>("c:orientation", scaling?.orientation || ScalingOrientation.MIN_MAX, ""),
    );
    if (scaling?.max !== undefined) {
        scalingChildren.push(new NumberValueElement("c:max", scaling.max, ""));
    }
    if (scaling?.min !== undefined) {
        scalingChildren.push(new NumberValueElement("c:min", scaling.min, ""));
    }
    if (scaling?.extensionList) {
        scalingChildren.push(new ExtensionList(scaling.extensionList));
    }
    root.push(new BuilderElement({ name: "c:scaling", children: scalingChildren }));
    root.push(new BooleanElement("c:delete", _delete ?? false, ""));
    root.push(new StringEnumValueElement<AxisPosition>("c:axPos", position!, ""));

    if (gridlines?.major) {
        root.push(
            new BuilderElement({
                name: "c:majorGridlines",
                children: [new ShapeProperties("c:spPr", gridlines.major)],
            }),
        );
    }

    if (gridlines?.minor) {
        root.push(
            new BuilderElement({
                name: "c:minorGridlines",
                children: [new ShapeProperties("c:spPr", gridlines.minor)],
            }),
        );
    }
    if (title !== undefined) {
        root.push(new Title(typeof title === "string" ? { textSource: { paragraph: { text: title } } } : title));
    }
    root.push(
        new BuilderElement({
            name: "c:numFmt",
            attributes: {
                formatCode: { key: "formatCode", value: numFmt?.formatCode ?? "General" },
                sourceLinked: { key: "sourceLinked", value: Number(numFmt?.sourceLinked ?? false) },
            },
        }),
    );
    root.push(new StringEnumValueElement<TickMark>("c:majorTickMark", tick?.mark?.major ?? TickMark.NONE, ""));
    root.push(new StringEnumValueElement<TickMark>("c:minorTickMark", tick?.mark?.minor ?? TickMark.NONE, ""));
    root.push(new StringEnumValueElement<TickLabelPosition>("c:tickLblPos", tick?.label?.position ?? TickLabelPosition.LOW, ""));
    if (shape) {
        root.push(new ShapeProperties("c:spPr", shape));
    }
    if (textProperties) {
        root.push(new TextProperties("c:txPr", textProperties));
    }
    root.push(new NumberValueElement("c:crossAx", ids[cross!.axis!], ""));
    root.push(new StringEnumValueElement<AxisCrosses>("c:crosses", cross!.mode ?? AxisCrosses.AUTO_ZERO, ""));
    if (cross!.at !== undefined) {
        root.push(new NumberValueElement("c:crossesAt", cross!.at, ""));
    }
};
