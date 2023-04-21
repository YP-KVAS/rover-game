import React, { FC, useEffect, useRef } from 'react'

interface CanvasProps {
  draw: (ctx: CanvasRenderingContext2D) => void
  zIndex: number
  width: number
  height: number
  isStatic: boolean
  delay?: number
}

export const Canvas: FC<CanvasProps> = ({
  draw,
  zIndex,
  width,
  height,
  isStatic,
  delay = 10,
}) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current as unknown as HTMLCanvasElement
    canvas.width = width
    canvas.height = height
    const context = canvas.getContext('2d')

    let animationFrameId: number
    let lastTime = performance.now()

    const render = (time: number) => {
      const timeDiff = time - lastTime
      if (timeDiff >= delay && context) {
        lastTime = time
        context.clearRect(0, 0, canvas.width, canvas.height)
        draw(context)
        if (isStatic) {
          window.cancelAnimationFrame(animationFrameId)
          return
        }
      }
      animationFrameId = window.requestAnimationFrame(render)
    }
    render(performance.now())

    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [draw, width, height])

  return (
    <canvas ref={canvasRef} style={{ zIndex, position: 'absolute' }}></canvas>
  )
}
