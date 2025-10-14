import { Relationships } from "@file/relationships";
import { ChartSpace } from "./chart-space";

export class ChartWrapper {
    private readonly relationships: Relationships;

    public constructor(private readonly chart: ChartSpace) {
        this.relationships = new Relationships();
    }

    public get View(): ChartSpace {
        return this.chart;
    }

    public get Relationships(): Relationships {
        return this.relationships;
    }
}

export class Charts {
    private readonly map: Map<string, ChartWrapper>;

    public constructor() {
        this.map = new Map<string, ChartWrapper>();
    }

    public add(key: string, chartFile: ChartSpace): void {
        this.map.set(key, new ChartWrapper(chartFile));
    }

    public get Entries(): readonly [string, ChartWrapper][] {
        return Array.from(this.map.entries());
    }
}
