import { IMediaData } from "./data";

export type SizeProperty = {
    readonly width: number;
    readonly height: number;
};

export type IMediaTransformation = {
    readonly flip?: {
        readonly vertical?: boolean;
        readonly horizontal?: boolean;
    };
    readonly rotation?: number;
} & SizeProperty;

export class Media {
    private readonly map: Map<string, IMediaData>;

    public constructor() {
        this.map = new Map<string, IMediaData>();
    }

    public addImage(key: string, mediaData: IMediaData): void {
        this.map.set(key, mediaData);
    }

    public get Array(): readonly IMediaData[] {
        return Array.from(this.map.values());
    }
}
