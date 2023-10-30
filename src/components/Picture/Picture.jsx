import { useDrag } from "react-dnd";

function Picture({imagen}){
    const [{isDragging} , drag] = useDrag(() => ({
        type:"image",
        item:{imagen:imagen},
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }) 
    }))
    return (
        <img 
        ref={drag}
        src={`img/${imagen.refImg}`} 
        alt={imagen.nombre}
        style={{border : isDragging ? "5px solid yellow" : "5px solid white" , width:"120px"}}
        
    />)

}

export default Picture;