import React from "react";
import Box from "@mui/material/Box";
import "./confirm.css";

import Modal from "@mui/material/Modal";

import Button from "@mui/material/Button";
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

const Confirm = ({ open, id, setOpen, functionality }) => {
  console.log(open);

  const action = () => {
    if (functionality === "eliminar") {
      try {
        axios
          .get(`${process.env.REACT_APP_BASE_URL}umbrella`)
          .then(async (resp1) => {
            let idUmbrella = null;
            for (let i of resp1.data.umbrellas) {
              if (i.number === id) {
                idUmbrella = i._id;
              }
            }
            await axios
              .delete(`${process.env.REACT_APP_BASE_URL}umbrella/${idUmbrella}`)
              .then((resp2) => {
                console.log(resp2);
                window.location.reload();
              });
          });
      } catch (error) {
        alert("No se puede eliminar esta carpa");
      }
    }
    if (functionality === "pagar") {
      try {
        axios
          .get(`${process.env.REACT_APP_BASE_URL}umbrella`)
          .then(async (resp1) => {
            let idUmbrella = null;
            for (let i of resp1.data.umbrellas) {
              if (i.number === id) {
                idUmbrella = i._id;
              }
            }
            await axios
              .put(`${process.env.REACT_APP_BASE_URL}umbrella/${idUmbrella}`, {
                status: "Pagado",
              })
              .then((resp2) => {
                console.log(resp2);
              });
            await axios
              .get(`${process.env.REACT_APP_BASE_URL}umbrella/${idUmbrella}`)
              .then(async (resp5) => {
                console.log(resp5);
                await axios
                  .get(
                    `${process.env.REACT_APP_BASE_URL}combo/${resp5.data.umbrella.idCombo}`
                  )
                  .then(async (resp7) => {
                    await axios
                      .get(`${process.env.REACT_APP_BASE_URL}payment`)
                      .then(async (resp8) => {
                        await axios
                          .post(`${process.env.REACT_APP_BASE_URL}payment`, {
                            number:resp8.data.payments.length+1,
                            total:resp7.data.combo.value,
                            idCombo:resp7.data.combo._id,
                            idUmbrella:resp5.data.umbrella._id,
                            idUser:resp5.data.umbrella.idUser,
                            fecha:Date.now()
                          })
                          .then((resp6) => {
                            console.log(resp6)
                            window.location.reload();
                          });
                      });
                    
                  });
              });
          });
      } catch (error) {
        alert("No se puede actualizar esta carpa");
      }
    }
    if (functionality === "liberar") {
      try {
        axios
          .get(`${process.env.REACT_APP_BASE_URL}umbrella`)
          .then(async (resp1) => {
            let idUmbrella = null;
            for (let i of resp1.data.umbrellas) {
              if (i.number === id) {
                idUmbrella = i._id;
              }
            }
            await axios
              .put(`${process.env.REACT_APP_BASE_URL}umbrella/${idUmbrella}`, {
                status: "Libre",
                idUser: null,
              })
              .then((resp2) => {
                console.log(resp2);
                window.location.reload();
              });
          });
      } catch (error) {
        alert("No se puede liberar esta carpa");
      }
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
        <div className="questionModal">
          <h2>Desea {functionality}?</h2>
        </div>
        <div className="questionModal">
          <Button
            onClick={action}
            variant="contained"
            disableElevation
            sx={{ marginRight: 5 }}
          >
            Aceptar
          </Button>
          <Button
            onClick={() => setOpen(false)}
            variant="contained"
            disableElevation
          >
            Cancelar
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default Confirm;
