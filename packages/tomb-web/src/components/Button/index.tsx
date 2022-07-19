import React, { FC, PropsWithChildren, useEffect } from 'react'

type Props = {
  width?: number
  height?: number
}

const Button: FC<PropsWithChildren<Props>> = ({ children, width = 148, height = 48 }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  const shadowPadding = 12
  const delta = 8

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d')
    if (ctx) {
      ctx.fillStyle = '#D9D2C0'

      ctx.beginPath()
      ctx.moveTo(1, 1)
      ctx.lineTo(shadowPadding, shadowPadding)
      ctx.lineTo(shadowPadding, height + delta / 2)
      ctx.lineTo(1, height - delta)
      ctx.lineTo(1, 1)
      ctx.closePath()
      ctx.stroke()
      ctx.fill()

      ctx.beginPath()
      ctx.moveTo(width - delta, 1)
      ctx.lineTo(width + delta / 2, shadowPadding)
      ctx.lineTo(shadowPadding, shadowPadding)
      ctx.lineTo(1, 1)
      ctx.closePath()
      ctx.stroke()
      ctx.fill()
    }
  }, [])

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        className={`absolute -top-[${shadowPadding}px] -left-[${shadowPadding}px] z-[-1]`}
        height={height + delta / 2}
      ></canvas>
      <div
        className={`w-[${width - delta}px] h-[${
          height - delta
        }px] absolute border border-neutral-800 bg-[#D9D2C0] z-[-2] -top-[${shadowPadding}px] -left-[${shadowPadding}px]`}
      ></div>
      <button className={`bg-neutral-800 w-[${width - delta}px] h-[${height - delta}px] z-10`}>{children}</button>
    </div>
  )
}

export default Button
