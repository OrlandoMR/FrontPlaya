import React, { useEffect, useRef, useState } from "react";

import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import "./Pago.css";
import TextField from "@material-ui/core/TextField";
import axios from "axios";

const Pago = (props) => {
  const id = props.match.params.id;
  const [comboinfo, setComboinfo] = React.useState(1);
  const history = useHistory();
  if (!localStorage.getItem("user")) {
    history.push("/inicio");
  }

  const reservar = () => {
    axios.get(`${process.env.REACT_APP_BASE_URL}umbrella`).then(async(resp1) => {
      for(let i of resp1.data.umbrellas){
        
        if(i.status==="Libre" && i.idCombo==comboinfo._id){
          await axios.put(`${process.env.REACT_APP_BASE_URL}umbrella/${i._id}`,{
            idUser:JSON.parse(localStorage.getItem("user")).uid,
            status:"Reservado"

          }).then(async (resp2)=>{
            console.log(resp2)
            alert("Su reservación ha sido realizada con exito")
            history.push("/inicio");
            
          })
          break;
        }
      }
    });
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}combo`)
      .then(async (resp1) => {
        for (let i of resp1.data.combos) {
          if (i.number == id) {
            await axios
              .get(`${process.env.REACT_APP_BASE_URL}combo/${i._id}`)
              .then(async (resp2) => {
                console.log(resp2);
                setComboinfo(resp2.data.combo);
              })
              .catch((err) => alert(err.response.msg));
          }
        }
      })
      .catch((err) => alert(err.response.msg));
  }, [id]);

  return (
    <div className="outerContainer p2">
      <div className="title">
        <h1> Porque la diversión tiene un precio </h1>
      </div>
      <div className="content">
        <div className="panel">
          <div className="title">
            <h3> {comboinfo.name} </h3>
          </div>
          <div className="plan">
            <p>
              Recuerda ponerte en contacto con uno de nuestros asesores al
              momento de llegar a la playa, para su respectiva revisión y
              posterior pago.
            </p>
            <Button variant="contained" onClick={reservar} disableElevation>
              Pagar en el sitio
            </Button>
          </div>
        </div>

        <div className="panel">
          <h2> Metodo de pago </h2>
          <TextField
            id="outlined-basic"
            label="Numero de tarjeta"
            variant="outlined"
            className="input"
            InputLabelProps={{
              style: { fontFamily: "Quicksand", fontSize: 20 },
            }}
          />
          <TextField
            id="outlined-basic"
            label="Fecha de expiración"
            variant="outlined"
            className="input"
            InputLabelProps={{
              style: { fontFamily: "Quicksand", fontSize: 20 },
            }}
          />
          <TextField
            id="outlined-basic"
            label="CCV "
            variant="outlined"
            className="input"
            InputLabelProps={{
              style: { fontFamily: "Quicksand", fontSize: 20 },
            }}
          />

          <Button variant="contained" disabled disableElevation>
            Reservar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Pago;
