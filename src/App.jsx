import './App.css';
import { DndProvider} from "react-dnd";
import { HTML5Backend} from "react-dnd-html5-backend";
import { ContextTierList } from './context/contextTierList';
import { useContext, useState } from 'react';
import Countries from './components/Countries/Countries';
import Picture from './components/Picture/Picture';
import types from './actions/actionsTierList';
import Row from './components/Row/Row';
import Drop from './components/Drop/Drop';
import { AiFillDelete } from "react-icons/ai";

function App() {
  const [nombre,setNombre] = useState("");
  const {imagenes , filas , dispatch} = useContext(ContextTierList);
  const FormSubmit = (e) =>{
    e.preventDefault();
    let valor = e.target.nombre.value;
    let idAleatorio = crypto.randomUUID();
    if(valor !== ""){
      dispatch({type:types.CREATE_ROW,payload:{id:idAleatorio,nombre:valor,imagenes: []}});
      
    }
    setNombre("");
  }
  const deleteRow = (id) => {
    dispatch({type:types.ADD_IMG_DATA, payload: id});
    dispatch({type:types.DELETE_ROW, payload: id});
  }
  return (
    <DndProvider backend={HTML5Backend}>
      <div className='center'>
        <h1 className='title'>Tier List Paises de Sudamerica</h1>
        <Countries>
          {
            imagenes.map(img => <Picture key={img.id} imagen={img} />)
          }
        </Countries>

        <form onSubmit={FormSubmit}>
          <input 
            type="text" 
            placeholder="Ingresa nombre de la fila" 
            name="nombre" 
            onChange={(e)=> setNombre(e.target.value)} 
            value={nombre} 
            className='input-search'
          />
          <input 
            type="submit" 
            value="Crear" 
            className='input-save'/>
        </form>

        <div>
          {
            (filas.length > 0) &&
              filas.map(row => 
              <Row key={row.id}>
                <div
                
                contentEditable
                suppressContentEditableWarning={true}
                className='title-row'
                >
                  <label>{row.nombre}</label>
                </div>
                {/* <textarea maxLength={16} defaultValue={row.nombre}/> */}
                <Drop id={row.id} row={row} key={row.id}/>
                <button onClick={() => deleteRow(row.id)}  className='button-delete'>
                  <AiFillDelete />
                </button>
              </Row>
            )
          }
        </div>

      </div>
    </DndProvider>
  )
}

export default App
