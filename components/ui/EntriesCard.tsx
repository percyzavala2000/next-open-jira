import {FC, Fragment,DragEvent, useContext } from "react"
import {Card, CardActionArea, CardActions, CardContent, Typography} from "@mui/material"
import {  EntryInterface } from '../../interfaces/entryInterface';
import { UIContext } from "../../context/ui";

interface Props {
  entry: EntryInterface
}

export const EntriesCard:FC<Props> = ({entry}) => {

  const {handleStartDragging,handleEndDragging} = useContext(UIContext)

    const handleDragStart = (e:DragEvent<HTMLDivElement>) => {
        //console.log("drag start", e.dataTransfer.setData( "text", entry._id));
        e.dataTransfer.setData("text", entry._id!);
        //TODO: Modificar el estado para indicar que se esta haciendo drag
        handleStartDragging()
        
    }

    const handleDragEnd = (e:DragEvent<HTMLDivElement>) => {
        //TODO: Cancelar el estado de drag


        console.log("drag end", e.dataTransfer.getData("text"));
        handleEndDragging()
        



    }

    return (
      <Fragment>
        <Card sx={{ marginBottom: 1 }} draggable onDragStart={handleDragStart} onDragEnd={handleDragEnd} >
          <CardActionArea>
            <CardContent>
              <Typography
                sx={{
                  whiteSpace: "pre-line",
                }}
              >
                {entry.description}{" "}
              </Typography>
            </CardContent>
            <CardActions
              sx={{
                display: "flex",
                justifyContent: "end",
                paddingRight: 2,
              }}
            >
              <Typography variant="body2"> hace 30 minutos </Typography>
            </CardActions>
          </CardActionArea>
        </Card>
      </Fragment>
    );
}
