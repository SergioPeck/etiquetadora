import { EtiquetaPrint } from "./etiquetaPrint"

interface Producto {
  nombre: string
  contenido: string
  cantidad: number
}

interface ImprimirContentProps {
  productos: Producto[]
  onCantidadChange?: (indice: number, cantidad: number) => void
  onReady?: () => void | undefined
}

export function ImprimirContent({ productos, onReady }: ImprimirContentProps) {
  const etiquetas = productos.flatMap(p => Array(p.cantidad).fill(p))

  const paginas: Producto[][] = []
  for (let i = 0; i < etiquetas.length; i += 16) {
    paginas.push(etiquetas.slice(i, i + 16))
  }

  return (
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
              onReady={onReady ? () => onReady() : undefined}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
