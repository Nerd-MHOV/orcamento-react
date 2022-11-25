
interface State {
    activeSidebar: boolean
}

interface Action {
    type: string
    payload: boolean
}

export const SidebarReducer = (state: State, action: Action): State => {
    switch(action.type){
        case "TOGGLE": {
            return {
                ...state,
                activeSidebar: action.payload,
            }
        }
        default:
            return state
    }
}
