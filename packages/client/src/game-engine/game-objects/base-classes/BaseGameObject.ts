export abstract class BaseGameObject {
  protected gameMap: Array<Array<Array<number>>>
  protected tileSize: number

  protected constructor(
    gameMap: Array<Array<Array<number>>>,
    tileSize: number
  ) {
    this.gameMap = gameMap
    this.tileSize = tileSize
  }

  drawTile(
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    canvasX: number,
    canvasY: number,
    spriteX = 0,
    spriteY = 0,
    sourceWidth = img.width,
    sourceHeight = img.height,
    tileWidth: number = this.tileSize,
    tileHeight: number = this.tileSize
  ) {
    ctx.drawImage(
      img,
      spriteX,
      spriteY,
      sourceWidth,
      sourceHeight,
      canvasX,
      canvasY,
      tileWidth,
      tileHeight
    )
  }

  drawRotatedTile(
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    canvasX: number,
    canvasY: number,
    degrees: number,
    spriteX = 0,
    spriteY = 0,
    sourceWidth = img.width,
    sourceHeight = img.height,
    tileWidth: number = this.tileSize,
    tileHeight: number = this.tileSize
  ) {
    ctx.save()
    ctx.translate(canvasX + this.tileSize / 2, canvasY + this.tileSize / 2)
    ctx.rotate((degrees * Math.PI) / 180)
    ctx.translate(
      -1 * (canvasX + this.tileSize / 2),
      -1 * (canvasY + this.tileSize / 2)
    )
    this.drawTile(
      ctx,
      img,
      canvasX,
      canvasY,
      spriteX,
      spriteY,
      sourceWidth,
      sourceHeight,
      tileWidth,
      tileHeight
    )
    ctx.restore()
  }

  abstract draw(ctx: CanvasRenderingContext2D): void
}
