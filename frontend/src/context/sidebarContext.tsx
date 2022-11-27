import { createContext, useReducer } from "react"
import {SidebarReducer} from './sidebarReducer'

export const SidebarContext = createContext<any>({})


interface ChildrenProps {
    children: any
}

export const SidebarContextProvider: React.FC<ChildrenProps> = ({children}) => {
    const initialState = {
        activeSidebar: false
    }

    const[state, dispatch] = useReducer(SidebarReducer, initialState)
    const { activeSidebar } = state;

    const setActiveSidebar = (): void => 
    dispatch ({
        type: "TOGGLE",
        payload: !activeSidebar
    })

    return(
        <SidebarContext.Provider value={{activeSidebar , setActiveSidebar}}>
            { children }
        </SidebarContext.Provider>
    )
}





