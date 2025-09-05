import { useEffect, useState } from 'react'
import { CrearProducto } from './components/crearProducto'
import { MostrarProductos } from './components/mostrarProductos'
import { VistaPrevia } from './components/vistaPrevia'
import { ImprimirPage } from './components/imprimirPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
interface Producto{
  nombre:string,
  contenido:string,
  cantidad:number
}
function App() {
  const [productos,setProductos] = useState<Producto[]>(()=>{
    return JSON.parse(localStorage.getItem('productos')||"[]")
  })

  useEffect(() => {
    setProductos(prev => prev.map(p => ({ ...p, cantidad: 0 })));
  }, []);

  const agregarProducto=(nuevo:Producto)=>{
    const nuevos= [...productos,nuevo]
    setProductos(nuevos)
    localStorage.setItem('productos',JSON.stringify(nuevos))
  }
  const actualizarProductos= (indice:number, cantidad:number)=>{
    const productosActualizados = [...productos]
    productosActualizados[indice].cantidad=cantidad
    setProductos(productosActualizados)
    localStorage.setItem('productos',JSON.stringify(productosActualizados))
  }
  const eliminarProducto = (indice: number) => {
    const nuevos = productos.filter((_, i) => i !== indice);
    setProductos(nuevos);
    localStorage.setItem('productos', JSON.stringify(nuevos));
  };
  return (
    <>
      <BrowserRouter basename='/etiquetadora'>
        <Routes>
          <Route path="/" element={
            <>
              <CrearProducto onProductoCreado={agregarProducto}/>
              <MostrarProductos productos={productos} onDelete={eliminarProducto} onCantidadChange={actualizarProductos}/>
              <VistaPrevia productos={productos} />
            </>
          }></Route>
          <Route path='/imprimir' element={<ImprimirPage onCantidadChange={actualizarProductos} productos={productos}/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
