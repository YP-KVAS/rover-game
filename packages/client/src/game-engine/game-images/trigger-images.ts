const cargoLoad = './images/triggers/cargo-load.png'
const cargoUnload = './images/triggers/cargo-unload.png'

export const triggerImagesPaths = {
  cargoLoad,
  cargoUnload,
}

export type TriggerKeys = keyof typeof triggerImagesPaths
export type TriggerImages = Record<TriggerKeys, HTMLImageElement>
