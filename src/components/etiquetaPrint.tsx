import { useEffect, useRef } from 'react'
import imgBase from '../imgs/EtiquetaBase.png'

interface Producto {
  nombre: string,
  contenido: string,
  cantidad: number
}

interface etiquetaPrintProps {
  productos: Producto,
  onReady?: () => void
}

function drawTextWrap(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
  const words = text.split(" ");
  let line = "";

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;

    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n] + " ";
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
}

export function EtiquetaPrint({ productos, onReady }: etiquetaPrintProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const renderedRef = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const img = new Image()
    img.src = imgBase // 268x158

    img.onload = () => {
      // DPI 300
      const DPI = 300
      const cmToPx = (cm: number) => cm * DPI / 2.54

      // alto total deseado 4,7 cm
      const targetHeight = cmToPx(4.7)
      const fullOriginalHeight = img.height + 39
      const scale = targetHeight / fullOriginalHeight
      const targetWidth = img.width * scale
      const imageHeight = img.height * scale

      canvas.width = targetWidth
      canvas.height = targetHeight

      // Aplicar estilos CSS para mostrar en el tamaño correcto
      canvas.style.width = '4.7cm'
      canvas.style.height = '4.7cm'

      // dibujar imagen escalada
      ctx.drawImage(img, 0, 0, targetWidth, imageHeight)

      // texto
      ctx.fillStyle = 'black'
      ctx.textAlign = "center"
      ctx.font = `${20 * scale}px Arial`
      ctx.fillText(productos.nombre, targetWidth / 2, 115 * scale)

      ctx.fillStyle = "black"
      ctx.textAlign = "start"
      ctx.font = `${12 * scale}px Arial`
      drawTextWrap(
        ctx,
        "contiene: " + productos.contenido,
        10 * scale,
        imageHeight + (8 * scale),
        targetWidth - (20 * scale),
        10 * scale
      )

      if (!renderedRef.current) {
        renderedRef.current = true
        onReady?.()
      }
    }
  }, [productos, onReady])

  return (
    <canvas 
      ref={canvasRef} 
      style={{ 
        border: '1px solid #ccc'
      }} 
    />
  )
}