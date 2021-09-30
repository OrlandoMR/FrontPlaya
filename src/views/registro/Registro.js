import React from "react";
// import sombrilla from "./sombrilla.PNG";
import "./Registro.css";

const Registro = (props) => {
  return (
    <section class="contact-box">
      <div id="grande" className="App">
        <p>
          <center>
            <h1> Regístrate y ven a </h1> <br></br> <h1> disfrutar </h1>
          </center>
        </p>
        <div id="formulario" classname="formulario" class="contenedor">
          <div id="datos" class="input-contenedor center" classname="jaja">
            <i class="fas fa-envelope icon"> </i>
            <label class="font-weight-bold">
              
              Correo Electrónico <span class="text-danger">: </span>
            </label>
            <input type="email" id="aaa" class="box" />
          </div>

          <div id="datos" class="input-contenedor center" classname="jaja">
            <i class="fas fa-key icon"> </i>
            <label class="font-weight-bold">
              
              Contraseña <span class="text-danger">: </span>
            </label>
            <input type="password" id="aaa" class="box" />
          </div>

          <div id="datos" class="input-contenedor center" classname="jaja">
            <i class="fas fa-key icon"> </i>
            <label class="font-weight-bold">
              
              Verificar contraseña <span class="text-danger">: </span>
            </label>
             <input type="password" id="aaa" class="box" />
          </div>

          <div id="datos" class="input-contenedor center" classname="jaja">
            <i class="fas fa-user icon"> </i>
            <label class="font-weight-bold">
              
              Nombre completo <span class="text-danger">: </span>
            </label>
            <input type="text" id="aaa" class="box" />
          </div>

          <input type="submit" value="Registrarse" Class="button center" />
        </div>
        <div id="imagen" classname="imagen">
          <img
            id="foto"
            
            classname="App-logo"
            alt="Sombrilla"
            class="center"
          />
        </div>
      </div>
    </section>
  );
};

export default Registro;
