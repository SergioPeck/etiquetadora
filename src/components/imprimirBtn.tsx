import {Link} from "react-router-dom"
interface Producto{
  nombre:string,
  contenido:string,
  cantidad:number
}
export function ImprimirBoton({productos}:{productos:Producto[]}){

    const habilitado = productos.some((p)=>p.cantidad>0)


    return(
        <>
            <Link to={habilitado? "/imprimir" : "/"}>
                <button disabled={!habilitado} className="bg-green-500 text-white hover:bg-green-600 p-2 rounded-full cursor-pointer disabled:cursor-not-allowed disabled:opacity-50">Imprimir</button>
            </Link>
        </>
    )
}