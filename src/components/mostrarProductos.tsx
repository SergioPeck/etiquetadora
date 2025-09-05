import { useState } from "react";
import { ImprimirBoton } from "./imprimirBtn";
import { BorrarEtiqueta } from "./modals/borrarModal";

interface Producto{
  nombre:string,
  contenido:string,
  cantidad:number
}

interface mostrarProductosProps{
    productos:Producto[],
    onCantidadChange: (indice: number, cantidad: number) => void,
    onDelete: (indice: number) => void;
}
const btnInput ="w-10 h-10 flex items-center text-2xl pb-[4px] justify-center border border-gray-300 rounded-full hover:cursor-pointer  hover:bg-gray-100"
export function MostrarProductos({productos,onCantidadChange, onDelete}:mostrarProductosProps){
    
    const [indiceABorrer, setIndiceABorrar]=useState<number | null>(null)

    return(
        <div className="flex flex-col mx-auto px-4 border border-gray-300 my-8 shadow-xl rounded-xl w-10/12 pb-8">
            <div className="flex flex-row justify-between align-middle mt-4">
                <h4 className="font-bold text-2xl ">Productos</h4>
                <ImprimirBoton productos={productos}/>
            </div>
            {productos.map((producto:Producto, i:number) => (
                <div key={i} className="mt-4">
                    <strong>{producto.nombre}</strong>
                    <div className="flex flex-row justify-between mt-2">
                        <div className="flex w-8/12">
                            <button className={btnInput} onClick={()=> {if(producto.cantidad>0){onCantidadChange(i,producto.cantidad-1)}}}>-</button>
                            <input 
                                type="number" 
                                min={0} 
                                value={producto.cantidad>0? producto.cantidad : ""}
                                onChange={e => onCantidadChange(i, Number(e.target.value))} 
                                className="w-6/12 bg-gray-200 rounded-full px-2 h-10"
                            />  
                            <button className={btnInput} onClick={()=>onCantidadChange(i,producto.cantidad+1)}>+</button>

                        </div>
                        <button onClick={()=>setIndiceABorrar(i)} className="w-10 h-10 flex items-center justify-center border hover:cursor-pointer hover:bg-red-400 border-gray-300 bg-red-300 rounded-full">X</button>

                    </div>
                </div>
            ))}
            {indiceABorrer !== null &&(
                <BorrarEtiqueta 
                    onClose={()=>setIndiceABorrar(null)} 
                    onDelete={()=>{
                    onDelete(indiceABorrer!);
                    setIndiceABorrar(null)
                    }}
                />)
            }
        </div>
    )
}