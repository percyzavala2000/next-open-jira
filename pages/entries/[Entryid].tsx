import { useContext, useMemo, useState } from "react";
import { NextPage,GetServerSideProps } from "next"
import { Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, RadioGroup, TextField,Radio,capitalize, IconButton } from "@mui/material";
import { useRouter } from "next/router";
import UpdateOutlinedIcon from "@mui/icons-material/UpdateOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { Layout } from '../../components/layouts';
import { EntryInterface, EntryStatus } from '../../interfaces';
import { getEntryById } from '../../database/dbEntries';
import { EntriesContext } from "../../context/entries";
import { getFormatDistanceToNow } from "../../utils";

const validStatus:EntryStatus[]=["pending","in-progress","finished"];

interface Props {
    entry: EntryInterface;
}

 const EntryidPage:NextPage<Props> = ( {entry} ) => {
  
    const router = useRouter();
   
const {handleUpdateEntry,handleDeleteEntry} = useContext(EntriesContext);
 
const [inputValue, setInputValue] = useState(entry.description);
const [status, setStatus] = useState<EntryStatus>(entry.status);
const [touch, setTouch] = useState(false);


const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setTouch(true);
};
const isNotValid =  useMemo(() => inputValue.length <= 0 && touch, [inputValue, touch]);

const handleStatusChange = (e:React.ChangeEvent<HTMLInputElement>) => {

    setStatus(e.target.value as EntryStatus);
    setTouch(true);
};

const handleSaveEntry = () => {
    handleUpdateEntry({_id: entry._id,description: inputValue,status: status} as EntryInterface ,true
    );
    setTouch(false);
    setInputValue("");
    router.push("/");
};

const handleDelete=()=>{
    handleDeleteEntry(entry._id as string);
    router.push("/");
}



  return (
    <Layout title={inputValue.substring(0, 20) + "..."}>
      <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title={`Entrada: ${capitalize(inputValue)}`}
              subheader={`Creada: ${getFormatDistanceToNow(entry.createdAt)}`}
            />
            <CardContent>
              <TextField
                sx={{ marginTop: 2, marginBottom: 1 }}
                fullWidth
                placeholder="Nueva entrada"
                autoFocus
                multiline
                label="Actualizar Entrada"
                value={inputValue}
                onChange={handleInputChange}
                helperText={isNotValid && "campo requerido"}
                error={isNotValid}
                onBlur={() => setTouch(true)}
              />
              {/* Radio */}
              <FormControl>
                <FormLabel>Estado:</FormLabel>
                <RadioGroup row value={status} onChange={handleStatusChange}>
                  {validStatus.map((option) => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      control={<Radio />}
                      label={capitalize(option)}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>
            <CardActions>
              <Button
                startIcon={<UpdateOutlinedIcon />}
                variant="contained"
                fullWidth
                onClick={handleSaveEntry}
                disabled={inputValue.length <= 0}
              >
                Actualizar
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <IconButton
        sx={{
          position: "fixed",
          bottom: 30,
          right: 30,
          backgroundColor: "error.dark",
        }}
        onClick={handleDelete}
      >
        <DeleteOutlinedIcon />
      </IconButton>
    </Layout>
  );
};


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const {Entryid} = params as {Entryid:string};

    const entry= await getEntryById(Entryid);

    if (!entry) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }


    return {
      props: {
        entry
      },
    };
}



export default EntryidPage;
