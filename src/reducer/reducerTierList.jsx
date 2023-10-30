import types from "../actions/actionsTierList";
import { produce } from "immer";

export const InitialState = {
    imagenes: [
            {
                id:"idPeru",
                nombre:"Perú",
                refImg:"peru.jpg"
            },
            {
                id:"idUruguay",
                nombre:"Uruguay",
                refImg:"uruguay.jpg"
            },
            {
                id:"idBrasil",
                nombre:"Brasil",
                refImg:"brasil.jpg"
            },{
                id:"idArgentina",
                nombre:"Argentina",
                refImg:"argentina.png"
            },{
                id:"idChile",
                nombre:"Chile",
                refImg:"chile.png"
            }
    ],
    filas: [] 
};

export const reducerTierList = (state , action) =>{
    switch(action.type){
        case types.DELETE_IMG_DATA:{
            return produce(state, draft => {    
                draft.imagenes = draft.imagenes.filter(imagen => imagen.id != action.payload)
            })
        }
        case types.ADD_IMG_DATA:{
            return (state.filas.length > 0) ? 
            produce(state, draft => {
                let getRow = draft.filas.find(item => (item.id == action.payload));
                
                (getRow.imagenes.length > 0) && 
                    getRow.imagenes.forEach(img => draft.imagenes.push(img))
            }):state
        }
        case types.ADD_IMG_COUNTRIE:{
            return produce(state,draft => {
                const newArray = draft.imagenes.filter(item => item.id === action.payload.id)
                if(newArray.length <= 0){
                    draft.imagenes.push(action.payload)
                }
            })
        }
        case types.CREATE_ROW:{           
            return produce(state, draft =>{
                draft.filas.push(action.payload)
            })
        }
        case types.DELETE_ROW:{
            return (state.filas.length > 0) 
            ? produce(state , draft => {
                draft.filas = draft.filas.filter((fila) => fila.id != action.payload)
            }):state
        }
        
        case types.ADD_IMG_ROW:{
            return (state.filas.length > 0) 
            ?produce(state , draft => {
                draft.filas = draft.filas.map((fila) =>(fila.id == action.payload.id)?
                {
                    id:fila.id,
                    imagenes:[...fila.imagenes,action.payload.imagen],
                    nombre:fila.nombre
                }
                : fila)

            }):state
        }
        case types.DELETE_IMG_ROW:{

            return (state.filas.length > 0) ? produce(state, draft =>{
                draft.filas.map(fila =>{
                    (fila.imagenes.length > 0)?
                        fila.imagenes = fila.imagenes.filter(img => img.id != action.payload)
                    :
                        fila 
                    
                });
            }):state
        }
        default:
            return state
    }

}


