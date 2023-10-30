import { createContext, useReducer} from "react";
import { InitialState , reducerTierList } from "../reducer/reducerTierList.jsx";
import { produce } from "immer";

export const ContextTierList = createContext();

export const ProviderTierList = ({children}) => {
    const [state , dispatch] = useReducer(produce(reducerTierList),InitialState);
    const {imagenes , filas } = state;
    return (
        <ContextTierList.Provider value={{imagenes , filas , dispatch}}>
            {children}
        </ContextTierList.Provider>
    )
}