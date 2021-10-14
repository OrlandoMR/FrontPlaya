import React, { useRef, useState } from "react";
import sombrilla from "./sombrilla.png";
import Button from "@material-ui/core/Button";

import TextField from "@material-ui/core/TextField";
import "./Registro.css";

import axios from "axios";

const Registro = (props) => {

  const emailRef = useRef("");
  const passRef = useRef("");
  const pass2Ref = useRef("");
  const nameRef = useRef("");

  const register = async() => {
    const url = `${process.env.REACT_APP_BASE_URL}users`;
    const email = emailRef.current.value;
    const password = passRef.current.value;
    const name= nameRef.current.value
    await axios
      .post(url, { email, password, name, rol:"USER_ROLE" })
      .then((res) => {
        console.log(res)
      })
      await axios
      .post(`${process.env.REACT_APP_BASE_URL}auth/login`, { email, password})
      .then((res) => {
        console.log(res)
        window.location.replace("/");
      })
  };


  return (
    <div className="outerContainer p2">
      <div className="title">
        <h1> Registrate </h1>
      </div>
      <div className="content">
        <div class="panel">
        <TextField
          inputRef={emailRef}
          id="outlined-basic"
          label="Correo Electronico"
          variant="outlined"
          className="input"
          InputLabelProps={{ style: { fontFamily: "Quicksand", fontSize: 20 } }}
        />
        <TextField
          inputRef={passRef}
          type="password"
          id="outlined-basic"
          label="Contraseña"
          variant="outlined"
          className="input"
          InputLabelProps={{ style: { fontFamily: "Quicksand", fontSize: 20 } }}
        />
        <TextField
          inputRef={pass2Ref}
          type="password"
          id="outlined-basic"
          label="Verificar contraseña"
          variant="outlined"
          className="input"
          InputLabelProps={{ style: { fontFamily: "Quicksand", fontSize: 20 } }}
        />
        <TextField
          inputRef={nameRef}
          id="outlined-basic"
          label="Nombre Completo"
          variant="outlined"
          className="input"
          InputLabelProps={{ style: { fontFamily: "Quicksand", fontSize: 20 } }}
        />
        <Button variant="contained" disableElevation onClick={register}>
          Registrarse
        </Button>
        </div>
        <div class="panel">
          <img src={sombrilla} alt="sombrilla"/>
        </div>
      </div>
    </div>
  );
};

export default Registro;
