import { ExtensionList, ExtensionListOptions } from "@file/chart/extension-list";
import { BooleanElement, NumberValueElement, StringEnumValueElement, StringValueElement, XmlComponent } from "@file/xml-components";
import { AxisSharedInternal, AxisSharedOptions, addAxisSharedOptions } from "../axis-shared";

export enum LabelAlign {
    CENTER = "ctr",
    LEFT = "l",
    RIGHT = "r",
}

export type CategoryAxisOptions = {
    readonly auto?: boolean;
    readonly label?: {
        readonly align?: LabelAlign;
        readonly offset?: number | string;
        readonly noMultiLevel?: boolean;
    };
    readonly tick?: {
        readonly label?: {
            readonly skip?: number;
        };
        readonly mark?: {
            readonly skip?: number;
        };
    };
    readonly extensionList?: ExtensionListOptions;
} & AxisSharedOptions;

// <xsd:group ref="EG_AxShared" minOccurs="1" maxOccurs="1"/>
// <xsd:element name="auto" type="CT_Boolean" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="lblAlgn" type="CT_LblAlgn" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="lblOffset" type="CT_LblOffset" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="tickLblSkip" type="CT_Skip" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="tickMarkSkip" type="CT_Skip" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="noMultiLvlLbl" type="CT_Boolean" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="extLst" type="CT_ExtensionList" minOccurs="0" maxOccurs="1"/>

export class CategoryAxis extends XmlComponent {
    public constructor({ auto, label, tick, extensionList, ...options }: CategoryAxisOptions & AxisSharedInternal) {
        super("c:catAx");
        addAxisSharedOptions(this.root, options);
        this.root.push(new BooleanElement("c:auto", auto ?? true, ""));
        this.root.push(new StringEnumValueElement<LabelAlign>("c:lblAlgn", label?.align ?? LabelAlign.CENTER, ""));
        if (label?.offset !== undefined) {
            this.root.push(
                typeof label.offset === "string"
                    ? new StringValueElement("c:lblOffset", label.offset, "")
                    : new NumberValueElement("c:lblOffset", label.offset, ""),
            );
        }
        if (tick?.label?.skip !== undefined) {
            this.root.push(new NumberValueElement("c:tickLblSkip", tick.label.skip, ""));
        }
        if (tick?.mark?.skip !== undefined) {
            this.root.push(new NumberValueElement("c:tickMarkSkip", tick.mark.skip, ""));
        }
        this.root.push(new BooleanElement("c:noMultiLvlLbl", label?.noMultiLevel ?? true, ""));
        if (extensionList) {
            this.root.push(new ExtensionList(extensionList));
        }
    }
}
