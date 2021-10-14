import React, { useState, useEffect, useRef } from "react";
import IconButton from "@material-ui/core/IconButton";
import Updater from "../../components/modals/updater";
import Confirm from "../../components/modals/confirm";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import CheckIcon from "@mui/icons-material/Check";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import { useHistory } from "react-router-dom";
import "./Gestion.css";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";

const Gestion = (props) => {
  const rol = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).rol
    : null;
  const history = useHistory();
  const [rows, setRows] = useState([]);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);
  const [open5, setOpen5] = React.useState(false);
  const [sizerow, setSizerow] = React.useState("");
  const [idrow, setIdrow] = React.useState("");
  const [iddel, setIddel] = React.useState("");
  const [idpay, setIdpay] = React.useState("");
  const [idfree, setIdfree] = React.useState("");
  const handleOpen1 = () => setOpen1(true);
  // const handleOpen2 = () => setOpen2(true);

  const handleOpen2 = (id, size) => {
    setIdrow(id);
    setSizerow(size);
    setOpen2(true);
  };

  const modalDel = (id) => {
    setIddel(id)
    setOpen3(true)
  };

  const modalPay = (id) => {
    setIdpay(id)
    setOpen4(true)
  };

  const modalFree = (id) => {
    setIdfree(id)
    setOpen5(true)
    
  };

  if (rol !== "ADMIN_ROLE") {
    history.push("/inicio");
  }

  useEffect(() => {
    const url = `${process.env.REACT_APP_BASE_URL}umbrella`;
    var rowsAux = [];
    axios
      .get(url)
      .then(async (resp1) => {
        rowsAux = await resp1.data.umbrellas;
        for (let i of rowsAux) {
          if (i.idUser) {
            await axios
              .get(`${process.env.REACT_APP_BASE_URL}users/${i.idUser}`)
              .then(async (resp2) => {
                i.idUser = await resp2.data.user.name;
              });
          }
        }
        console.log(rowsAux);
        setRows(rowsAux);
      })
      .catch((err) => alert(err.response.msg));
  }, []);

  const isDisabledPay = (status) => {
    if (status === "Reservado") {
      return false;
    }
    if (status === "Libre") {
      return true;
    } else {
      return true;
    }
  };

  const isDisabledFree = (status) => {
    if (status === "Reservado") {
      return false;
    }
    if (status === "Pagado") {
      return false;
    } else {
      return true;
    }
  };

  return (
    <div className="outerContainer p2">
      <div className="titleAdmin">
        <h1>Gestión de carpas </h1>
        <Button variant="contained" onClick={handleOpen1} endIcon={<AddIcon />}>
          Añadir Carpa
        </Button>
      </div>
      <Updater open={open1} setOpen={setOpen1} functionality={"Agregar"} />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Numero de Sombrilla</TableCell>
              <TableCell>Tamaño</TableCell>
              <TableCell>Ocupante</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.number}
                </TableCell>
                <TableCell>{row.size}</TableCell>
                <TableCell>{row.idUser}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>
                  <div>
                    <IconButton
                      onClick={() => modalDel(row.number)}
                      aria-label="delete"
                      className="iconSp"
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleOpen2(row.number, row.size)}
                      aria-label="delete"
                      className="iconSp"
                    >
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      aria-label="delete"
                      onClick={() => modalPay(row.number)}
                      className="iconSp"
                      disabled={isDisabledPay(row.status)}
                    >
                      <CheckIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => modalFree(row.number)}
                      className="iconSp"
                      disabled={isDisabledFree(row.status)}
                    >
                      <ExitToAppIcon />
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            <Updater
              open={open2}
              setOpen={setOpen2}
              id={idrow}
              size={sizerow}
              functionality={"Actualizar"}
            />
            <Confirm
              open={open3}
              setOpen={setOpen3}
              id={iddel}
              functionality={"eliminar"}
            />
            <Confirm
              open={open4}
              setOpen={setOpen4}
              id={idpay}
              functionality={"pagar"}
            />
            <Confirm
              open={open5}
              setOpen={setOpen5}
              id={idfree}
              functionality={"liberar"}
            />
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Gestion;
