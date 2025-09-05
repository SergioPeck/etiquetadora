import { useEffect, useState } from 'react'
import { CrearProducto } from './components/crearProducto'
import { MostrarProductos } from './components/mostrarProductos'
import { VistaPrevia } from './components/vistaPrevia'
import { ImprimirPage } from './components/imprimirPage'

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
          <ImprimirPage onFinish={()=>setIsImprimiendo(false)} productos={productos} onCantidadChange={actualizarProductos} />
        </div>
      ):(
        <>
          {/* Pantalla normal */}
          <CrearProducto onProductoCreado={agregarProducto} />
          <MostrarProductos mandarImprimir={mandarImprimir} productos={productos} onDelete={eliminarProducto} onCantidadChange={actualizarProductos} />
          <VistaPrevia productos={productos} />
      
          {/* Contenedor para impresión */}
        </>

      )
    }

    </>
  )
}

export default App
