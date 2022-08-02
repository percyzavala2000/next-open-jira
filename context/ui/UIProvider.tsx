
import React,{FC, useReducer} from 'react'
import {UIContext, uiReducer} from './' 


interface ProviderProps {
    children : React.ReactNode;
    
}

export  interface UIState {
  sidemenuOpen: boolean;
  isAdding:boolean;
  isDragging:boolean;
}

const UIInitialState: UIState = {
  sidemenuOpen: false,
  isAdding:false,
  isDragging:false,
};

export const UIProvider:FC< ProviderProps> = ({children}) => {

const [state, dispatch] = useReducer(uiReducer, UIInitialState);
  

const handleOpen = () => {
   dispatch({type:"UI_Open_Sidebar"})
};

const handleClose = () => {
  dispatch({type:"UI_Close_Sidebar"})
}

const setIsAdding=(add:boolean)=>{

  dispatch({type:"UI_IsAddingEntry",payload:add})
}
const handleStartDragging=()=>{

  dispatch({type:"UI_StartIsDragging"})
}

const handleEndDragging=()=>{
  dispatch({type:"UI_EndtIsDragging"})
}



  return (
    <UIContext.Provider
      value={{
        ...state,
        handleOpen,
        handleClose,
        setIsAdding,
        handleStartDragging,
        handleEndDragging,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
