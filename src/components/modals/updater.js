import React, { useRef } from "react";
import Box from "@mui/material/Box";
import "./updater.css";

import Modal from "@mui/material/Modal";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "5px solid #ABEDFC ",
  boxShadow: 24,
  p: 4,
};

const Updater = ({ id, size, open, setOpen, functionality }) => {
  const sizeRef = useRef(size);
  const handleChange = () => {
    const sizeForm = sizeRef.current.value;
    console.log(sizeForm);
    if (functionality === "Agregar") {
      axios.get(`${process.env.REACT_APP_BASE_URL}umbrella`)
      .then(async(resp1)=>{
        let combazo=null;
        await axios.get(`${process.env.REACT_APP_BASE_URL}combo`).then(
          (resp4)=>{
            let codigoCombo=null;
            
            if(sizeForm==="Grande"){
              codigoCombo=1
            }
            if(sizeForm==="Mediana"){
              codigoCombo=2
            }
            if(sizeForm==="Pequeña"){
              codigoCombo=3
            }
            
            for(let i of resp4.data.combos){
              if(i.number===codigoCombo){
                combazo=i._id;
              }
            }
            
          }
        )
        await axios.post(`${process.env.REACT_APP_BASE_URL}umbrella`,{size:sizeForm,number:resp1.data.umbrellas.length+1,status:"Libre",idCombo:combazo}).then((resp2)=>{
          console.log(resp2)
          window.location.reload();
        })
      })
      
      console.log("Creanding");
    }
    if (functionality === "Actualizar") {
      axios.get(`${process.env.REACT_APP_BASE_URL}umbrella`)
      .then(async(resp1)=>{
        let idUmbrella=null
        for(let i of resp1.data.umbrellas){
          if(i.number===id){
            idUmbrella=i._id;
          }
        }
        await axios.put(`${process.env.REACT_APP_BASE_URL}umbrella/${idUmbrella}`,{size:sizeForm}).then((resp2)=>{
          console.log(resp2)
          window.location.reload();
        })
      })
      console.log("Actualizanding");
    }
    setOpen(false);
  };
  return (
    <Modal
      open={open}
      // onClose={setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="titleModal">
          <h2>{functionality} carpa</h2>
          <IconButton onClick={()=>setOpen(false)} aria-label="delete" className="iconSp">
            <CloseIcon />
          </IconButton>
        </div>

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Tamaño</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={size}
            label="Age"
            inputRef={sizeRef}
          >
            <MenuItem value="Grande">Grande</MenuItem>
            <MenuItem value="Mediana">Mediana</MenuItem>
            <MenuItem value="Pequeña">Pequeña</MenuItem>
          </Select>
          <div className="centerButton">
            <Button onClick={handleChange} variant="contained" disableElevation>
              Agregar
            </Button>
          </div>
        </FormControl>
      </Box>
    </Modal>
  );
};

export default Updater;
