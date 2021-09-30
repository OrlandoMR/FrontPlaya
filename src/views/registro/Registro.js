import React from "react";
import { useForm } from "../../Hooks/useForm";
import "./Registro.css";


export const Registro = () => {
  
  const [formValues, handleInputChange] = useForm({
    nombre: '',
    email: '',
    contra: '',
    confcontra: ''
  });
  
  const {nombre, email, contra, confcontra}= formValues;
  
  const handleSubmit = (e) =>{
    // evita que se recarge la pag
    e.preventDefault();
    console.log(formValues)
  }
  
  
  
  
  return (
    
    <div className="outerContainer">
      <div className="title"> 
        <h1> Registrate y ven a disfrutar </h1>
      </div>

        <form onSubmit={ handleSubmit}>
{/* nombre */}
          <div className="form-group">
            <input type="text"
              name="nombre"
              className="form-control"
              placeholder="Tu nombre"
              value={nombre}
              onChange={ handleInputChange } />
          </div>
{/* email */}
          <div className="form-group">
            <input type="text"
              name="email"
              className="form-control"
              placeholder="Tu email"
              autoComplete="off"
              value={email}
              onChange={ handleInputChange } />
          </div>
{/* contra */}
          <div className="form-group">
            <input type="password"
              name="contra"
              className="form-control"
              placeholder="*****"
              value={contra}
              onChange={ handleInputChange } />
          </div>
{/* CONFcON  */}
          <div className="form-group">
            <input type="password"
              name="confcontra"
              className="form-control"
              placeholder="*****"
              value={confcontra}
              onChange={ handleInputChange } />
          </div>
          
          <button type='submit' variant="contained" disableElevation>
            Registrarme
          </button>
        </form>
        {(contra === confcontra) ? null : "Las contraseñas no coinciden"}
        
    </div>
  );
};

export default Registro;
