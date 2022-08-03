import React,{FC, useEffect, useReducer} from 'react'
import {EntriesContext, entriesReducer} from './' 
import { EntryInterface } from '../../interfaces';
import { v4 as uuidv4 } from 'uuid';
import { entriesApi } from '../../apis';
import { useSnackbar } from "notistack";

interface ProviderProps {
    children : React.ReactNode
}

export interface EntriesState {
  entries: EntryInterface[];
}

const EntriesInitialState: EntriesState = {
  entries: [],
};


export const EntriesProvider : FC < ProviderProps > = ({children}) => {

const [state, dispatch] = useReducer(entriesReducer, EntriesInitialState); 
const {enqueueSnackbar} =useSnackbar();

useEffect(() => {
  if(state.entries.length > 0){
    localStorage.setItem("entries", JSON.stringify(state.entries));
  }

}, [state]);

const addEntries =async (entry:string ) => {
  const {data}= await entriesApi.post<EntryInterface>(`/entries`,{description:entry,
});

dispatch ({
  type: "[Entries]-AddEntries",
  payload: data,  
});

};

const handleUpdateEntry =async ({_id,description,status}:EntryInterface,ShowSnackbar=false) => {
  const {data}= await entriesApi.put<EntryInterface>(`/entries/${_id}`,{description,status});


  dispatch ({
    type: "[Entries]-UpDateStausEntries",
    payload: data,
  });
  // TODO: mostrar snackbar
  if(ShowSnackbar){
    enqueueSnackbar("Entrada actualizada", {
      variant: "success",
      autoHideDuration: 2000,
      anchorOrigin:{
        vertical: "top",
        horizontal: "right",
      }
    });

  }

  
};

const handleDeleteEntry =async (id:string) => {
  const {data}= await entriesApi.delete<EntryInterface>(`/entries/${id}`);
  
  dispatch ({
    type: "[Entries]-DeleteEntries",
    payload: data
  });

  enqueueSnackbar("Entrada eliminada", {
    variant: "error",
    autoHideDuration: 2000,
    anchorOrigin:{
      vertical: "top",
      horizontal: "right",
    }
  });
  refreshEntries();
}


const refreshEntries=async ()=>{
  const {data} =await entriesApi.get<EntryInterface[]>("/entries");
  dispatch({
    type: "[Entries]-RefreshEntries",
    payload: data,
  });


}

useEffect(() => {
  refreshEntries();

}, []);


  return (
    <EntriesContext.Provider
      value={{ ...state, addEntries, handleUpdateEntry, handleDeleteEntry }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
