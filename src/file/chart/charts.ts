import { ChartSpace } from "./chart-space";

export class Charts {
    private readonly map: Map<string, ChartSpace>;

    public constructor() {
        this.map = new Map<string, ChartSpace>();
    }

    public add(key: string, chartFile: ChartSpace): void {
        this.map.set(key, chartFile);
    }

    public get Entries(): readonly [string, ChartSpace][] {
        return Array.from(this.map.entries());
    }
}
