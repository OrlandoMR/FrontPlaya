import React from "react";
import "./Plan.css";
import Button from "@material-ui/core/Button";

const Plan = (props) => {
  const planes = [
    {
      nombre: "Plan Básico",
      img: "./playa.png",
      desc: ["Uso de carpa por tiempo determinado."],
    },
    {
      nombre: "Plan Turista",
      img: "./pescado.png",
      desc: [
        "Uso de carpa por tiempo determinado.",
        "2 almuerzos de preferencia personal.",
      ],
    },
    {
      nombre: "Plan Carnaval",
      img: "./jetsky.png",
      desc: [
        "Uso de carpa por tiempo determinado.",
        "2 almuerzos de preferencia personal.",
        "Un ticket para paseo por 15 en moto acuatica.",
      ],
    },
  ];

  return (
    <div className="outerContainer">
      <div className="title">
        <h1>Escoge tu plan</h1>
      </div>
      <div className="planes">
        {planes.map((plan) => {
          return (
            <div className="cardContainer">
              <div className="card">
                <div className="imgContainer">
                  <img src={plan.img} alt="" />
                </div>

                <ul className="fa-ul">
                  {plan.desc.map((desc) => {
                    return (
                      <li>
                        <span className="fa-li">
                          <i className="fas fa-check"></i>
                        </span>
                        {desc}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <h2>{plan.nombre}</h2>
              <Button variant="contained" disableElevation>
               Quiero este
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Plan;
