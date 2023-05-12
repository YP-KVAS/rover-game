import React from 'react'
import {
  TileMapImages,
  tileMapImagesPaths,
} from './game-images/tile-map-images'
import { RoverImages, roverImagesPaths } from './game-images/rover-images'
import { CarImages, carImagesPaths } from './game-images/cars-images'
import { TriggerImages, triggerImagesPaths } from './game-images/trigger-images'

export class GameImages {
  private static __instance: GameImages

  private readonly _tileMapImages: TileMapImages
  private readonly _roverImages: RoverImages
  private readonly _carsImages: CarImages
  private readonly _triggerImages: TriggerImages

  private _changeAllImagesLoadedStateFoo?: React.Dispatch<
    React.SetStateAction<boolean>
  >
  private readonly _imagesCount: number
  private _loadedImagesCount = 0

  private constructor() {
    this._imagesCount =
      Object.keys(tileMapImagesPaths).length +
      Object.keys(roverImagesPaths).length +
      Object.keys(carImagesPaths).length +
      Object.keys(triggerImagesPaths).length

    this._tileMapImages = this._createImages(tileMapImagesPaths)
    this._roverImages = this._createImages(roverImagesPaths)
    this._carsImages = this._createImages(carImagesPaths)
    this._triggerImages = this._createImages(triggerImagesPaths)
  }

  useChangeAllImagesLoadedState(
    foo: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    this._changeAllImagesLoadedStateFoo = foo
    if (this._imagesCount === this._loadedImagesCount) {
      this._changeAllImagesLoadedStateFoo(true)
    }
  }

  private _incrementLoadedImages() {
    this._loadedImagesCount++
    if (
      this._changeAllImagesLoadedStateFoo &&
      this._imagesCount === this._loadedImagesCount
    ) {
      this._changeAllImagesLoadedStateFoo(true)
    }
  }

  private _createImages<K extends string>(
    imagePaths: Record<K, string>
  ): Record<K, HTMLImageElement> {
    return Object.entries(imagePaths).reduce(
      (acc: Record<string, HTMLImageElement>, [key, value]) => {
        const image = new Image()
        image.onload = () => this._incrementLoadedImages()
        image.src = value as string

        acc[key] = image
        return acc
      },
      {}
    )
  }

  public static getInstance() {
    return this.__instance || (this.__instance = new this())
  }

  public get tileMapImages() {
    return this._tileMapImages
  }

  public get roverImages() {
    return this._roverImages
  }

  public get carsImages() {
    return this._carsImages
  }

  public get triggerImages() {
    return this._triggerImages
  }
}
