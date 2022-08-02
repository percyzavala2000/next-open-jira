import React, {Fragment, useContext, useState} from 'react'
import {Box, Button, TextField} from '@mui/material'
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui/UIContext';

export const NewEntry = () => {
    const {addEntries} = useContext(EntriesContext);
    const {isAdding,setIsAdding} =useContext(UIContext);

    
    const [inputValue, setInputValue] = useState("");
    const [touched, setTouched] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };
    const onSave = () => {
        if (inputValue.trim().length === 0) return
        addEntries(inputValue);
        setIsAdding(false);
        setTouched(false);
        setInputValue("");

    }
    
    return (
      <Fragment>
        <Box sx={{marginBottom: 2,paddingX: 2}} >
          {isAdding ? (
            <Fragment>
              <TextField
                fullWidth
                sx={{ marginTop: 2,marginBottom: 1,}}
                placeholder="Agregar una nueva entrada"
                multiline
                autoFocus
                label="Nueva entrada"
                helperText={inputValue.length <= 0 && touched&&"Ingrese un Valor"}
                error={inputValue.length <= 0&& touched}
                value={inputValue}
                onChange={handleChange}
                onBlur={() => setTouched(true)}
              />
              <Box display="flex" justifyContent="space-between">
                <Button
                  variant="outlined"
                  color="error"
                  endIcon={<CancelOutlinedIcon />}
                  onClick={() => setIsAdding(false)}
                >
                  Cancelar
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  endIcon={<SaveOutlinedIcon />}
                    onClick={onSave}
                >
                  Guardar
                </Button>
              </Box>
            </Fragment>
          ) : (
            <Button
              startIcon={<AddOutlinedIcon />}
              fullWidth
              variant="outlined"
              onClick={() => setIsAdding(true)}
            >
              Agregar Tarea
            </Button>
          )}
        </Box>
      </Fragment>
    );
}
