export class IdentifierManager {
    public replace(xmlData: string, identifiers: readonly string[], offset: number): string {
        let currentXmlData = xmlData;

        identifiers.forEach((identifier, i) => {
            currentXmlData = currentXmlData.replace(new RegExp(`{${identifier}}`, "g"), (offset + i).toString());
        });

        return currentXmlData;
    }

    public filter<T>(xmlData: string, list: readonly T[], extractor: (item: T) => string): T[] {
        return list.filter((item) => xmlData.search(`{${extractor(item)}}`) > 0);
    }
}
