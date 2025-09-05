import { useState } from "react";
interface Producto{
  nombre:string,
  contenido:string,
  cantidad:number
}
export function CrearProducto({onProductoCreado}: {onProductoCreado:(p:Producto)=>void}) {
    

    const [producto,setProducto] = useState<Producto>({
        nombre:"",
        contenido:"",
        cantidad:0
    })
    
    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        console.log("Producto guardado:", producto)
        onProductoCreado(producto)
        setProducto({
          nombre:"",
          contenido:"",
          cantidad:0
        })
    }

  const inputs = "border border-gray-300 m-2 rounded-md p-2 w-full";
  return (
    <div className="flex justify-center flex-col items-center ">
      <h1 className="text-4xl my-10">Generador de etiquetas</h1>
      <form onSubmit={handleSubmit} className="flex justify-center flex-col items-center shadow-xl border border-gray-300 rounded-xl w-10/12 px-4" >
          <input type="text" placeholder="Nombre del producto" value={producto.nombre} onChange={(e)=>setProducto({...producto,nombre:e.target.value})} className={`${inputs} mt-6`} required/>
          <input type="text" placeholder="Contenidos" value={producto.contenido} onChange={(e)=>setProducto({...producto,contenido:e.target.value})} className={inputs} required/>
          <button type="submit" className="rounded-md mt-2 p-2 border mb-6 w-full bg-blue-600 text-white hover:bg-blue-500 hover:cursor-pointer">+ Crear Producto</button>
      </form>
    </div>
  )
}
