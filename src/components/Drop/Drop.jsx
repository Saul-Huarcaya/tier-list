import { useContext } from "react";
import { useDrop } from "react-dnd";
import Picture from "../Picture/Picture";
import { ContextTierList } from "../../context/contextTierList";
import types from "../../actions/actionsTierList";

function Drop({id , row}){
    const {dispatch} = useContext(ContextTierList);
    const [{isOver}, drop] = useDrop(()=>({
        accept: "image",
        drop: (item) => addImage(item.imagen),
        collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        })
    }));
    
    const addImage = (imagen) => {
        let idImagen = imagen.id;

        dispatch({type: types.DELETE_IMG_ROW,payload: idImagen});
        dispatch({type: types.ADD_IMG_ROW,payload: {imagen , id}});
        dispatch({type: types.DELETE_IMG_DATA,payload: idImagen});
    }
    return <div ref={drop} className="contenedor-fila">
        {
            row.imagenes.length > 0 ?
            row.imagenes.map(img => <Picture key={img.id} imagen={img}/>):null
        }
    </div>
}

export default Drop;