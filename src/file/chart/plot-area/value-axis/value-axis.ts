import { ExtensionList, ExtensionListOptions } from "@file/chart/extension-list";
import { NumberValueElement, StringEnumValueElement, XmlComponent } from "@file/xml-components";
import { AxisSharedInternal, AxisSharedOptions, addAxisSharedOptions } from "../axis-shared";
import { DisplayUnit, DisplayUnitOptions } from "../display-unit/display-unit";

export enum CrossBetween {
    BETWEEN = "between",
    MIDDLE_CATEGORY = "midCat",
}

export type ValueAxisOptions = {
    readonly crossBetween?: CrossBetween;
    readonly unit?: {
        readonly major?: number;
        readonly minor?: number;
        readonly display?: DisplayUnitOptions;
    };
    readonly extensionList?: ExtensionListOptions;
} & AxisSharedOptions;

// <xsd:group ref="EG_AxShared" minOccurs="1" maxOccurs="1"/>
// <xsd:element name="crossBetween" type="CT_CrossBetween" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="majorUnit" type="CT_AxisUnit" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="minorUnit" type="CT_AxisUnit" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="dispUnits" type="CT_DispUnits" minOccurs="0" maxOccurs="1"/>
// <xsd:element name="extLst" type="CT_ExtensionList" minOccurs="0" maxOccurs="1"/>

export class ValueAxis extends XmlComponent {
    public constructor({ crossBetween, unit, extensionList, ...options }: ValueAxisOptions & AxisSharedInternal) {
        super("c:valAx");
        addAxisSharedOptions(this.root, options);
        if (crossBetween) {
            this.root.push(new StringEnumValueElement<CrossBetween>("c:crossBetween", crossBetween, ""));
        }
        if (unit?.major !== undefined) {
            this.root.push(new NumberValueElement("c:majorUnit", unit.major, ""));
        }
        if (unit?.minor !== undefined) {
            this.root.push(new NumberValueElement("c:minorUnit", unit.minor, ""));
        }
        if (unit?.display) {
            this.root.push(new DisplayUnit(unit.display));
        }
        if (extensionList) {
            this.root.push(new ExtensionList(extensionList));
        }
    }
}
