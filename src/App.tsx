import { useEffect, useRef, useState } from 'react'
import { CrearProducto } from './components/crearProducto'
import { MostrarProductos } from './components/mostrarProductos'
import { VistaPrevia } from './components/vistaPrevia'
import { ImprimirPage } from './components/imprimirPage'
import { ImprimirContent } from './components/imprimirContent'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

interface Producto {
  nombre: string
  contenido: string
  cantidad: number
}

function App() {
  const [productos, setProductos] = useState<Producto[]>(() => {
    return JSON.parse(localStorage.getItem('productos') || "[]")
  })

  const [isImprimiendo, setIsImprimiendo]= useState(false)
  const imprimirRef = useRef<HTMLDivElement>(null)

  const generarPDF = async () => {
  if (!imprimirRef.current) return;

  const paginas = imprimirRef.current.querySelectorAll('.pagina');
  if (paginas.length === 0) return;

  const pdf = new jsPDF("landscape", "mm", "a4");

  for (let i = 0; i < paginas.length; i++) {
    const canvas = await html2canvas(paginas[i] as HTMLElement, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const imgWidth = 297; // ancho A4 horizontal
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    if (i > 0) pdf.addPage(); // agregar página nueva después de la primera
    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
  }

  pdf.save("etiquetas.pdf");
};


  useEffect(() => {
    setProductos(prev => prev.map(p => ({ ...p, cantidad: 0 })))
  }, [])

  const agregarProducto = (nuevo: Producto) => {
    const nuevos = [...productos, nuevo]
    setProductos(nuevos)
    localStorage.setItem('productos', JSON.stringify(nuevos))
  }

  const actualizarProductos = (indice: number, cantidad: number) => {
    const productosActualizados = [...productos]
    productosActualizados[indice].cantidad = cantidad
    setProductos(productosActualizados)
    localStorage.setItem('productos', JSON.stringify(productosActualizados))
  }

  const eliminarProducto = (indice: number) => {
    const nuevos = productos.filter((_, i) => i !== indice)
    setProductos(nuevos)
    localStorage.setItem('productos', JSON.stringify(nuevos))
  }

  const mandarImprimir=()=>{
    setIsImprimiendo(true)
  } 
  return (
    <>
      {isImprimiendo ? (
        <div className="print-page">
          <ImprimirPage
            onFinish={() => setIsImprimiendo(false)}
            productos={productos}
            onCantidadChange={actualizarProductos}
          />
        </div>
      ) : (
        <>
          <CrearProducto onProductoCreado={agregarProducto} />
          <MostrarProductos
            mandarImprimir={mandarImprimir}
            productos={productos}
            onDelete={eliminarProducto}
            onCantidadChange={actualizarProductos}
            generarPDF={generarPDF} // agregamos la prop
          />
          <VistaPrevia productos={productos} />

          {/* Contenedor invisible para PDF */}
          <div ref={imprimirRef} style={{ position: "absolute", left: "-9999px" }}>
            <ImprimirContent productos={productos} />
          </div>
        </>
      )}
    </>
  )
}

export default App
