import { XmlComponent } from "@file/xml-components";

import { Anchor, GraphicWrapperOptions, IAnchorCoreOptions } from "./anchor";
import { InlineCoreOptions, createInline } from "./inline";
import { GraphicOptions } from "./inline/graphic";

export type IDistance = {
    readonly distT?: number;
    readonly distB?: number;
    readonly distL?: number;
    readonly distR?: number;
};

export type DrawingCoreOptions = IAnchorCoreOptions & InlineCoreOptions;

export type DrawingOptions = DrawingCoreOptions & GraphicOptions & GraphicWrapperOptions;

// <xsd:complexType name="CT_Drawing">
// <xsd:choice minOccurs="1" maxOccurs="unbounded">
//   <xsd:element ref="wp:anchor" minOccurs="0"/>
//   <xsd:element ref="wp:inline" minOccurs="0"/>
// </xsd:choice>
// </xsd:complexType>

export class Drawing extends XmlComponent {
    public constructor({ floating, ...options }: DrawingOptions) {
        super("w:drawing");

        if (floating) {
            this.root.push(new Anchor({ ...options, floating }));
        } else {
            this.root.push(createInline(options));
        }
    }
}
