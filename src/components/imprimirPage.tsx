import { useEffect, useState } from "react"
import { EtiquetaPrint } from "./etiquetaPrint"

interface Producto {
  nombre: string
  contenido: string
  cantidad: number
}

interface ImprimirPageProps {
  productos: Producto[]
  onCantidadChange: (indice: number, cantidad: number) => void
  onFinish: () => void
}

export function ImprimirPage({ productos, onCantidadChange, onFinish }: ImprimirPageProps) {
  const [readyCount, setReadyCount] = useState(0)

  // Expandir por cantidad
  const etiquetas = productos.flatMap(p => Array(p.cantidad).fill(p))

  // Dividir en páginas de 16
  const paginas: Producto[][] = []
  for (let i = 0; i < etiquetas.length; i += 16) {
    paginas.push(etiquetas.slice(i, i + 16))
  }

  // Cuando todas las etiquetas están listas, disparar la impresión
  useEffect(() => {
    if (readyCount === etiquetas.length && etiquetas.length > 0) {
      window.print()
    }
  }, [readyCount, etiquetas.length])

  // Listener para afterprint: resetea cantidades y vuelve a la UI normal
  useEffect(() => {
    const handleAfterPrint = () => {
      // Resetear cantidades
      productos.forEach((_, i) => onCantidadChange(i, 0))
      // Volver a UI normal
      onFinish()
    }

    window.addEventListener("afterprint", handleAfterPrint)
    return () => window.removeEventListener("afterprint", handleAfterPrint)
  }, [productos, onCantidadChange, onFinish])

  return (
    <div>
      <div className="print-container">
        {paginas.map((pagina, pageIndex) => (
          <div
            key={pageIndex}
            className="
              pagina
              grid 
              grid-cols-4 
              grid-rows-4 
              grid-flow-col
              place-items-center
              w-[297mm] 
              h-[210mm] 
              page-break-after 
              print:shadow-none 
              print:border-0
            "
          >
            {pagina.map((p, i) => (
              <EtiquetaPrint
                key={i}
                productos={p}
                onReady={() => setReadyCount(c => c + 1)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
