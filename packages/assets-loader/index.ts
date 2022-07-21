export interface Asset {
  type: 'image' | 'font'
  url: string
  status?: 'pending' | 'loading' | 'loaded' | 'error'
}

const noop = () => {}

/**
 * @example new AssetsLoader(['https://cdn.com/xxx.png'])
 * @example new AssetsLoader({ type: 'font', urls: ['https://cdn.com/xxx.font'] })
 */
export class AssetsLoader {
  assets: Asset[] = []
  loadedNum: number = 0
  loadedNumChange: (num: number) => void = noop
  onTotalLoaded: (assets: (Asset | FontFace)[]) => void = noop

  constructor(...args: string[][] | { type: 'image' | 'font'; urls: string[] }[]) {
    args.forEach((arg) => {
      if (Array.isArray(arg)) {
        // type image
        this.assets = [
          ...this.assets,
          ...arg.map((url) => ({ url, status: 'pending' as Asset['status'], type: 'image' as Asset['type'] }))
        ]
      } else {
        // type depends on arg.type
        this.assets = [
          ...this.assets,
          ...arg.urls.map((url) => ({ url, status: 'pending' as Asset['status'], type: arg.type }))
        ]
      }
    })

    return new Proxy(this, {
      set: (target, key, value) => {
        if (key === 'loadedNum') {
          target.loadedNumChange(value)

          if (value === target.totalAssetsNum) {
            target.onTotalLoaded(target.assets)
          }
        }
        return Reflect.set(target, key, value)
      }
    })
  }

  private loadImage(imgAsset: Asset): Promise<Asset> {
    imgAsset.status = 'loading'
    return new Promise((resolve, reject) => {
      let image: HTMLImageElement = new Image()
      image.onload = () => {
        imgAsset.status = 'loaded'
        this.loadedNum++
        resolve(imgAsset)
      }
      image.onerror = () => {
        imgAsset.status = 'error'
        reject(imgAsset)
      }
      image.src = imgAsset.url
    })
  }

  private loadFont(fontAsset: Asset): Promise<FontFace> {
    fontAsset.status = 'loading'
    return new Promise((resolve, reject) => {
      const font = new FontFace('Bokor', `url(${fontAsset.url})`)
      font
        .load()
        .then((loadedFont) => {
          fontAsset.status = 'loaded'
          this.loadedNum++
          resolve(loadedFont)
        })
        .catch((err) => {
          fontAsset.status = 'error'
          reject(err)
        })
    })
  }

  bindLoadedNumChange(cb: (num: number) => void) {
    this.loadedNumChange = cb
  }

  bindOnTotalLoaded(cb: (assets: (Asset | FontFace)[]) => void) {
    this.onTotalLoaded = cb
  }

  asyncStart() {
    let combinedPromise: (Promise<Asset> | Promise<FontFace>)[] = []

    this.assets.forEach((asset) => {
      if (asset.type === 'image') {
        combinedPromise.push(this.loadImage(asset))
      } else if (asset.type === 'font') {
        combinedPromise.push(this.loadFont(asset))
      }
    })

    return Promise.all(combinedPromise)
  }

  get totalAssetsNum() {
    return this.assets.length
  }

  static commonFontLoadedCallback(fonts: FontFace[]) {
    fonts.forEach((font) => {
      document.fonts.add(font)
    })
  }
}
