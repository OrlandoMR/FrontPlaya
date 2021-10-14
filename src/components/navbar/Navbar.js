import React, { useRef, useState } from "react";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/core/Alert";
import axios from "axios";

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const emailRef = useRef("");
  const passRef = useRef("");
  const [error, setError] = useState(null);

  const login = () => {
    const url = `${process.env.REACT_APP_BASE_URL}auth/login`;
    const email = emailRef.current.value;
    const password = passRef.current.value;
    axios
      .post(url, { email, password })
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        window.location.reload();
      })
      .catch((err) => {
        setError(err.response.data.msg);
      });
  };

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="false">
      <div className="dialogContainer">
        {error ? (
          <Alert className="error" severity="error">
            {error}
          </Alert>
        ) : null}
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
        <Button variant="contained" disableElevation onClick={login}>
          Entrar
        </Button>
      </div>
    </Dialog>
  );
}

const Navbar = (props) => {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState("Nothing");
  let rol = "USER_ROLE";
  let userExist = false;
  if (localStorage.getItem("user")) {
    userExist = true;
    rol = JSON.parse(localStorage.getItem("user"))["rol"];
  }

  const logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <nav className="navbar">
      <Link className="navbar-brand" to="/">
        Umbrella
      </Link>
      <div className="sub-navbars">
        <div className="navbar-left">
          <NavLink
            activeClassName="active"
            className="navbar-item"
            exact="exact"
            to="/plan"
          >
            Planes
          </NavLink>
          {rol === "ADMIN_ROLE" ? (
            <NavLink
              activeClassName="active"
              className="navbar-item var"
              exact="exact"
              to="/gestion"
            >
              Gestión
            </NavLink>
          ) : null}
          {rol === "ADMIN_ROLE" ? (
            <NavLink
              activeClassName="active"
              className="navbar-item var"
              exact="exact"
              to="/pagos"
            >
              Pagos
            </NavLink>
          ) : null}
        </div>

        <div className="navbar-rigth">
          {userExist ? (
            <NavLink
              activeClassName="active"
              className="navbar-item"
              onClick={logout}
              exact="exact"
              to="/inicio"
            >
              Cerrar Sesión
            </NavLink>
          ) : (
            <div>
              <a className="navbar-item" onClick={handleClickOpen}>
                Iniciar Sesión
              </a>
              <SimpleDialog
                selectedValue={selectedValue}
                open={open}
                onClose={handleClose}
              />
              <NavLink
                activeClassName="active"
                className="navbar-item"
                exact="exact"
                to="/registro"
              >
                Registrarse
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
