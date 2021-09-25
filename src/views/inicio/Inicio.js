import React from "react";
import "./Inicio.css";
import Button from "@material-ui/core/Button";
import { Link, NavLink } from "react-router-dom";

const Inicio = (props) => {

  return (
    <div className="outerContainer">
      <div className="banner">
        
        <h1 className="relax">VEN A RELAJARTE</h1>
      </div>
      <div className="infoContainer">
        <h1>¡Reserva tu carpa ya!</h1>
        <hr/>
        <p>
          En Umbrella Corp. nos interesa que las personas que llegan a nuestros
          servicios sean bien atendidos y con la mayor confianza posible.
          Queremos que tus vacaciones no sea un dolor de cabeza y todos tus
          planes sean exitosos.
        </p>
        <div className="buttonContainer">
          <Button variant="contained" disableElevation>
          <NavLink
            className="buttonReservar"
            exact="exact"
            to="/plan"
          >
            Reserva ahora
          </NavLink>
            
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Inicio;
