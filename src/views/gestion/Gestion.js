import React, {useState} from "react";
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

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];

const getNombrePlan= (idPlan) =>{
  
}

const Gestion = (props) => {


  const rol = localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")).rol:null;
  const history = useHistory();
  const[rows,setRows]=useState([])

  if(rol!=="ADMIN_ROLE"){
    history.push("/inicio")
  }
  const url = `${process.env.REACT_APP_BASE_URL}umbrella`;
  axios.get(url)
  .then(({data}) => {
    console.log(data.umbrellas)
    setRows(data.umbrellas);
  })
  .catch(err=>alert(err.response.msg))

  const getNombreUser= (idUser) =>{
    axios.get(`${process.env.REACT_APP_BASE_URL}users/${idUser}`)
    .then(({data}) => {
      console.log(data)
      return data.user.name
    });
  }

 

  return (
    <div className="outerContainer">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Numero de Sombrilla</TableCell>
              <TableCell>Tamaño</TableCell>
              <TableCell >Plan Asociado</TableCell>
              <TableCell >Ocupante</TableCell>
              <TableCell >Estado</TableCell>
              <TableCell >Acciones</TableCell>
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
                <TableCell >{row.size}</TableCell>
                <TableCell >{row.size}</TableCell>
                <TableCell >{getNombreUser(row.idUser)}</TableCell>
                <TableCell >{row.status}</TableCell>
                <TableCell >Editar</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Gestion;
