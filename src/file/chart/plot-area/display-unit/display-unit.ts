import { ExtensionList, ExtensionListOptions } from "@file/chart/extension-list";
import { NumberValueElement, StringEnumValueElement, XmlComponent } from "@file/xml-components";
import { DisplayUnitLabel, DisplayUnitLabelOptions } from "./display-unit-label";

type BuiltInUnit =
    | "hundreds"
    | "thousands"
    | "tenThousands"
    | "hundredThousands"
    | "millions"
    | "tenMillions"
    | "hundredMillions"
    | "billions"
    | "trillions";

export type DisplayUnitOptions = ({ readonly custom: number } | { readonly builtIn: BuiltInUnit }) & {
    readonly label?: DisplayUnitLabelOptions;
    readonly extensionList?: ExtensionListOptions;
};

// <xsd:choice>
//     <xsd:element name="custUnit" type="CT_Double" minOccurs="1" maxOccurs="1"/>
//     <xsd:element name="builtInUnit" type="CT_BuiltInUnit" minOccurs="1" maxOccurs="1"/>
// </xsd:choice>
// <xsd:element name="dispUnitsLbl" type="CT_DispUnitsLbl" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="extLst" type="CT_ExtensionList" minOccurs="0" maxOccurs="1"/>

export class DisplayUnit extends XmlComponent {
    public constructor({ label, extensionList, ...options }: DisplayUnitOptions) {
        super("c:dispUnits");
        if ("custom" in options) {
            this.root.push(new NumberValueElement("c:custUnit", options.custom, ""));
        }
        if ("builtIn" in options) {
            this.root.push(new StringEnumValueElement<BuiltInUnit>("c:builtInUnit", options.builtIn, ""));
        }
        if (label) {
            this.root.push(new DisplayUnitLabel(label));
        }
        if (extensionList) {
            this.root.push(new ExtensionList(extensionList));
        }
    }
}
