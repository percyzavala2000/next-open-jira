import {UIState} from "./UIProvider";

type UIActionTypes = |{
    type: "UI_Open_Sidebar"
} | {
    type: "UI_Close_Sidebar"
} | {
    type: "UI_IsAddingEntry",payload:boolean;
}
 | {
    type: "UI_StartIsDragging"
}
 | {
    type: "UI_EndtIsDragging"
}

export const uiReducer = (state : UIState, action : UIActionTypes) : UIState => {

    switch (action.type) {
        case "UI_Open_Sidebar":
            return {
                ...state,
                sidemenuOpen: true
            };
        case "UI_Close_Sidebar":
            return {
                ...state,
                sidemenuOpen: false
            };
        case "UI_IsAddingEntry":
            return {
                ...state,
                isAdding: action.payload
            };
        case "UI_StartIsDragging":
            return {
                ...state,
                isDragging: true
            } ;   
        case "UI_EndtIsDragging":
            return {
                ...state,
                isDragging: false
            }    
        default:
            return state;

    }

}
