export interface Asset {
    type: 'image' | 'font';
    url: string;
    status?: 'pending' | 'loading' | 'loaded' | 'error';
}
/**
 * @example new AssetsLoader(['https://cdn.com/xxx.png'])
 * @example new AssetsLoader({ type: 'font', urls: ['https://cdn.com/xxx.font'] })
 */
export declare class AssetsLoader {
    assets: Asset[];
    loadedNum: number;
    loadedNumChange: (num: number) => void;
    onTotalLoaded: (assets: (Asset | FontFace)[]) => void;
    constructor(...args: string[][] | {
        type: 'image' | 'font';
        urls: string[];
    }[]);
    private loadImage;
    private loadFont;
    bindLoadedNumChange(cb: (num: number) => void): void;
    bindOnTotalLoaded(cb: (assets: (Asset | FontFace)[]) => void): void;
    asyncStart(): Promise<(Asset | FontFace)[]>;
    get totalAssetsNum(): number;
    static commonFontLoadedCallback(fonts: FontFace[]): void;
}
