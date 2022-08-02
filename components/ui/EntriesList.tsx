import { FC, useContext, useMemo,DragEvent } from "react";
import { List, Paper } from "@mui/material"
import { EntriesCard } from "./"
import { EntryStatus } from '../../interfaces/entryInterface';
import { EntriesContext } from "../../context/entries";
import { UIContext } from "../../context/ui";
import styles from "./EntriesList.module.css";

interface Props{
  status:EntryStatus
}

export const EntriesList:FC<Props> = ({status}) => {
  const {entries,handleUpdateEntry } = useContext(EntriesContext);
  const {isDragging, handleEndDragging } = useContext(UIContext);

 // if ( !entries ) return null

 
 
 

  const entriesByStatus = useMemo(() => entries.filter(entry => entry.status === status), [entries,status]);

  //console.log("entriesByStatus", entriesByStatus);
  

  const handleDragOver = (e:DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    //console.log(e);
    
  }

  const handleOndrop = (e:DragEvent<HTMLDivElement>) => {
    
    const id = e.dataTransfer.getData("text")
    console.log({id});
    const entry = entries.find(entry => entry._id === id)
    
    if (entry) {
      //handleUpdateEntry({...entry,status}) primera opcion
      entry.status = status
      handleUpdateEntry(entry)
      handleEndDragging()
    }

  }

  return (
    //TODO: Agregar el estado de drag
    <div onDrop={handleOndrop} onDragOver={handleDragOver} className={isDragging?styles.dragging:""} >
      <Paper
        sx={{
          height: "calc(100vh - 180px)",
          backgroundColor: "transparent",
          padding: "1px 5px",
          overflow: "auto",
        }}
      >
        {/* TODO: Cambiara dependiendo si esta haciendo drag o no */}
        <List sx={{ opacity:  isDragging?0.2: 1,transition:"all  .3s" }}>
          {entriesByStatus.map((entry) => (
            <EntriesCard key={entry._id} entry={entry} />
          ))}
        </List>
      </Paper>
    </div>
  );
}
