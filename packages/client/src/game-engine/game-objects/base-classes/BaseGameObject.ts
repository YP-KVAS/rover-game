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
    column: number,
    row: number,
    spriteX = 0,
    spriteY = 0,
    spriteSize = img.width
  ) {
    ctx.drawImage(
      img,
      spriteX,
      spriteY,
      spriteSize,
      spriteSize,
      column * this.tileSize,
      row * this.tileSize,
      this.tileSize,
      this.tileSize
    )
  }

  drawRotatedTile(
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    column: number,
    row: number,
    degrees: number,
    spriteX = 0,
    spriteY = 0,
    spriteSize = img.width
  ) {
    ctx.save()
    ctx.translate(
      column * this.tileSize + this.tileSize / 2,
      row * this.tileSize + this.tileSize / 2
    )
    ctx.rotate((degrees * Math.PI) / 180)
    ctx.translate(
      -1 * (column * this.tileSize + this.tileSize / 2),
      -1 * (row * this.tileSize + this.tileSize / 2)
    )
    this.drawTile(ctx, img, column, row, spriteX, spriteY, spriteSize)
    ctx.restore()
  }

  abstract draw(ctx: CanvasRenderingContext2D): void
}
