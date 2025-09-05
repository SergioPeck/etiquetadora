interface Producto{
  nombre:string,
  contenido:string,
  cantidad:number
}
interface ImprimirBtnProps{
    productos:Producto[],
    mandarImprimir:()=>void
}
export function ImprimirBoton({productos, mandarImprimir}:ImprimirBtnProps){

    const habilitado = productos.some((p)=>p.cantidad>0)


    return(
        <>
            <button onClick={mandarImprimir} disabled={!habilitado} className="bg-green-500 text-white hover:bg-green-600 py-2 px-4 rounded-full cursor-pointer disabled:cursor-not-allowed disabled:opacity-50">🖨️ Imprimir</button>
        </>
    )
}