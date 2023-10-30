import { useContext } from "react";
import types from "../../actions/actionsTierList";
import { ContextTierList } from "../../context/contextTierList";
import { useDrop } from "react-dnd";
import "./Countries.css";

function Countries({children}){

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
        
        dispatch({type: types.ADD_IMG_COUNTRIE,payload: imagen});
        dispatch({type: types.DELETE_IMG_ROW,payload: idImagen});
    }
    return <div ref={drop} className="contenedor-countries">
        {children}
    </div>
}
export default Countries;