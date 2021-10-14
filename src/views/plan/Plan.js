import React from "react";
import "./Plan.css";
import Button from "@material-ui/core/Button";

import { Link, NavLink } from "react-router-dom";

const Plan = (props) => {
  const planes = [
    {
      nombre: "Plan Básico",
      img: "./playa.png",
      desc: ["Uso de carpa por tiempo determinado."],
      number: 1
    },
    {
      nombre: "Plan Turista",
      img: "./pescado.png",
      desc: [
        "Uso de carpa por tiempo determinado.",
        "2 almuerzos de preferencia personal.",
      ],
      number: 2
    },
    {
      nombre: "Plan Carnaval",
      img: "./jetsky.png",
      desc: [
        "Uso de carpa por tiempo determinado.",
        "2 almuerzos de preferencia personal.",
        "Un ticket para paseo por 15 en moto acuatica.",
      ],
      number: 3
    },
  ];

  return (
    <div className="outerContainer">
      <div className="title">
        <h1> Escoge tu plan </h1>
      </div>
      <div className="planes">
        {planes.map((plan) => {
          return (
            <div className="cardContainer">
              <div className="card">
                <div className="imgContainer">
                  <img src={plan.img} alt="" />
                </div>
                <ul>
                  {plan.desc.map((desc) => {
                    return <li>{desc} </li>;
                  })}
                </ul>
              </div>
              <h2> {plan.nombre} </h2>
              <Button variant="contained" disableElevation>
                <NavLink
                  activeClassName="active"
                  className="navbar-item"
                  exact="exact"
                  to={`pago/${plan.number}`}
                >
                  Quiero este
                </NavLink>
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Plan;
