import { useEffect, useRef } from 'react'
import imgBase from '../imgs/EtiquetaBase.png'

interface Producto {
  nombre: string,
  contenido: string,
  cantidad: number
}

interface etiquetaPrintProps{
  productos:Producto,
  onReady:()=>void
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

export function EtiquetaPrint({ productos,onReady }: etiquetaPrintProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const renderedRef = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const img = new Image()
    img.src = imgBase

    img.onload = () => {
        // usar el tamaño original de la imagen + espacio extra abajo
        let espacioDebajo = 39
        canvas.width = img.width
        canvas.height = img.height + espacioDebajo

        ctx.drawImage(img, 0, 0)

        ctx.fillStyle = 'black'
        ctx.textAlign = "center"
        ctx.font = "bold 20px Arial"
        ctx.fillText(productos.nombre, canvas.width / 2, 115)

        ctx.fillStyle = "black"
        ctx.textAlign = "start"
        ctx.font = "12px Arial"
        drawTextWrap(ctx, "contiene: " + productos.contenido, 10, img.height + 8 , canvas.width - 20, 10);

        if(!renderedRef.current){
          renderedRef.current=true
          onReady?.()
        }
        } 
    }, [productos,onReady])

  return (
    <canvas ref={canvasRef} style={{ border: '1px solid #ccc' }}>
    </canvas>
  )
}
