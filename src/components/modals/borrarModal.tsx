interface BorrarEtiquetaProps{
    onClose:()=>void,
    onDelete:()=>void,

}
export function BorrarEtiqueta({onClose, onDelete}:BorrarEtiquetaProps){

    return(
        <div onClick={onClose} className="fixed flex items-center top-0 left-0 bg-black/50 w-full h-full">
            <div onClick={(e)=>e.stopPropagation()} className="bg-white min-h-64 w-8/12 flex flex-col rounded-2xl shadow-2xl text-center justify-between p-8 mx-auto" >
                <p className="text-3xl">¿Quieres Borrar El Ingrediente?</p>
                <div className="flex">
                    <button className="flex-1 border border-gray-300 rounded-full m-2 text-lg hover:cursor-pointer hover:bg-gray-100" onClick={onClose}>Cancelar</button>
                    <button className="flex-1 border border-gray-300 rounded-full m-2 text-lg bg-red-400 text-white hover:bg-red-500 hover:cursor-pointer" onClick={onDelete}>Si, borrar</button>
                </div>
            </div>

        </div>
    )
}