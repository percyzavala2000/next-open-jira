import {FC, Fragment,DragEvent, useContext } from "react"
import { useRouter } from "next/router";
import {Card, CardActionArea, CardActions, CardContent, Typography} from "@mui/material"
import {  EntryInterface } from '../../interfaces/entryInterface';
import { UIContext } from "../../context/ui";
import { getFormatDistanceToNow } from "../../utils";

interface Props {
  entry: EntryInterface
}

export const EntriesCard:FC<Props> = ({entry}) => {
  
 const router =useRouter()
  const {handleStartDragging,handleEndDragging} = useContext(UIContext)
    const handleDragStart = (e:DragEvent<HTMLDivElement>) => {
        //console.log("drag start", e.dataTransfer.setData( "text", entry._id));
        e.dataTransfer.setData("text", entry._id!);
        //Modificar el estado para indicar que se esta haciendo drag
        handleStartDragging()   
    }
    const handleDragEnd = (e:DragEvent<HTMLDivElement>) => {
        // Cancelar el estado de drag
        console.log("drag end", e.dataTransfer.getData("text"));
        handleEndDragging()     
    }

    const handleClick = () => {
        router.push(`/entries/${entry._id}`)

    }


    return (
      <Fragment>
        <Card onClick={handleClick} sx={{ marginBottom: 1 }} draggable onDragStart={handleDragStart} onDragEnd={handleDragEnd}   >
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
              <Typography variant="body2"> {getFormatDistanceToNow(entry.createdAt) } </Typography>
            </CardActions>
          </CardActionArea>
        </Card>
      </Fragment>
    );
}
