import React from "react";
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import Gestion from "./views/gestion/Gestion";
import Inicio from "./views/inicio/Inicio";
import Pago from "./views/pago/Pago";
import Plan from "./views/plan/Plan";
import Registro from "./views/registro/Registro";
import Comentario from "./views/comentario/Comentario";

const AppRouter = (props) => {
  return (
  <Router>
    <div>
      <Navbar/>

      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */
      }

      <Switch>
        <Route exact path="/inicio" component={Inicio}/>
        <Route exact path="/comentario" component={Comentario}/>
        <Route exact path="/pago" component={Pago}/>
        <Route exact path="/plan" component={Plan}/>
        <Route exact path="/registro" component={Registro}/>
        <Route exact path="/gestion" component={Gestion}/>
        <Redirect to="/inicio"/>
      </Switch>
    </div>
  </Router>
)
}

export default AppRouter
