import { EtiquetaPreview } from "./etiquetaPreview"

interface Producto{
  nombre:string,
  contenido:string,
  cantidad:number
}

export function VistaPrevia({productos}:{productos:Producto[]}){

    const productosMostrables = productos.filter(p=>p.cantidad > 0)

    if(!productosMostrables){
        return
    }

    const etiquetas = productosMostrables.flatMap(p=>
        Array(p.cantidad).fill(p)
    )
    if(etiquetas.length===0){
        return
    }
    
    const paginas=[];
    for (let i=0;i<etiquetas.length;i+=16){
        paginas.push(etiquetas.slice(i,i+16))
    }
    return(
        <div className="flex border border-gray-300 w-10/12 mx-auto flex-col shadow-xl rounded-2xl">
            <div >
                <p className="text-2xl font-bold m-4">Vista Previa</p>
                {
                    paginas.map((pagina,paginaIndex)=>(
                        <div key={paginaIndex}>
                            <p className="font-bold m-4">Página {paginaIndex +1}</p>
                            <div
                            className="border-2 w-10/12 h-auto max-h-[210mm] max-w-[297mm] m-2 grid grid-flow-col justify-start grid-rows-4 mx-auto gap-2">
                            {pagina.map((p,i)=>(
                                <div key={i}>
                                <EtiquetaPreview producto={p}/>
                                </div>
                            ))}
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )

}