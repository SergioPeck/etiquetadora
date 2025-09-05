import { useEffect, useState } from "react"
import { EtiquetaPrint } from "./etiquetaPrint"
import { useNavigate } from "react-router-dom"

interface Producto {
  nombre: string
  contenido: string
  cantidad: number
}

interface imprimirPageProps{
    productos:Producto[],
    onCantidadChange: (indice: number, cantidad: number) => void,
}

export function ImprimirPage({ productos, onCantidadChange }: imprimirPageProps) {
  const [readyCount, setReadyCount]=useState(0)
  // expandir por cantidad
  const etiquetas = productos.flatMap((p) => Array(p.cantidad).fill(p))

  // dividir en páginas de 16
  const paginas: Producto[][] = []
  for (let i = 0; i < etiquetas.length; i += 16) {
    paginas.push(etiquetas.slice(i, i + 16))
  }

  const navigate = useNavigate()
  useEffect(()=>{
      const volver = ()=> navigate("/")
      
      window.addEventListener("afterprint",volver)
      return()=>{window.removeEventListener("afterprint",volver)}


  },[navigate])

  useEffect(()=>{
    if (readyCount===etiquetas.length && etiquetas.length > 0){
      window.print()

      productos.forEach((_, i) => onCantidadChange(i, 0))

    }
  },[etiquetas.length, readyCount])

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
                    <EtiquetaPrint onReady={()=>setReadyCount(c=>c+1)} key={i} productos={p} />
                ))}
            </div>
        ))}
      </div>
    </div>
  )
}
