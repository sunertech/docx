import { Element } from "xml-js";

import { getFirstLevelElements } from "./util";

export const appendContentType = (element: Element, contentType: string, value: string, name: string = "Default"): void => {
    const relationshipElements = getFirstLevelElements(element, "Types");
    const field = name === "Default" ? "Extension" : "PartName";

    const exist = relationshipElements.some(
        (el) =>
            el.type === "element" && el.name === name && el?.attributes?.ContentType === contentType && el?.attributes?.[field] === value,
    );
    if (exist) {
        return;
    }

    relationshipElements.push({
        attributes: {
            ContentType: contentType,
            [field]: value,
        },
        name,
        type: "element",
    });
};
