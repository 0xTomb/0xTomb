import React, { FC, PropsWithChildren, useEffect } from 'react'

type Props = {
  width?: number
  height?: number
  reverse?: boolean
}

const Button: FC<PropsWithChildren<Props>> = ({ children, width = 148, height = 48, reverse }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  const shadowPadding = 12
  const delta = 8

  const color1 = 'rgb(38, 38, 38)'
  const color2 = 'rgb(217, 210, 192)'

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d')
    if (ctx) {
      ctx.fillStyle = reverse ? color1 : color2
      ctx.strokeStyle = reverse ? color2 : color1
      ctx.lineWidth = 1

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
        className="absolute z-[-1]"
        height={height + delta / 2}
        style={{
          top: -shadowPadding,
          left: -shadowPadding
        }}
      ></canvas>
      <div
        className="absolute border z-[-2]"
        style={{
          width: width - delta,
          height: height - delta,
          top: -shadowPadding,
          left: -shadowPadding,
          backgroundColor: reverse ? color1 : color2
        }}
      ></div>
      <button
        className={`z-10`}
        style={{
          width: width - delta,
          height: height - delta,
          backgroundColor: reverse ? color2 : color1
        }}
      >
        {children}
      </button>
    </div>
  )
}

export default Button
