import React,{FC, useEffect, useReducer} from 'react'
import {EntriesContext, entriesReducer} from './' 
import { EntryInterface } from '../../interfaces';
import { v4 as uuidv4 } from 'uuid';
import { entriesApi } from '../../apis';

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

useEffect(() => {
  if(state.entries.length > 0){
    localStorage.setItem("entries", JSON.stringify(state.entries));
  }

}, [state]);

const addEntries = (entry:string ) => {
  const entries:EntryInterface = {
  _id: uuidv4(),
  description:entry,
  status: "pending",
  createdAt: Date.now(),
};

  dispatch({
    type: "[Entries]-AddEntries",
    payload: entries,
  });

};

const handleUpdateEntry = (entry:EntryInterface) => {
  dispatch({
    type: "[Entries]-UpDateStausEntries",
    payload: entry,
  });
};

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
    <EntriesContext.Provider value={{ ...state, addEntries,handleUpdateEntry }}>
      {children}
    </EntriesContext.Provider>
  );
};
