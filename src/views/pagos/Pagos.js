import React, {useState, useEffect} from "react";
import SimpleDateTime  from 'react-simple-timestamp-to-date';
import { useHistory } from "react-router-dom";
import "./Pagos.css";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";



const Pagos = (props) => {

  const rol = localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")).rol:null;
  const history = useHistory();
  const[rows,setRows]=useState([])

  if(rol!=="ADMIN_ROLE"){
    history.push("/inicio")
  }

  useEffect(()=>{
    const url = `${process.env.REACT_APP_BASE_URL}payment`;
    var rowsAux=[]
    axios.get(url)
    .then(async (resp1) => {
      rowsAux= await resp1.data.payments;
      console.log(rowsAux)
        for (let i of rowsAux) {
          if (i.idUser) {
            await axios
              .get(`${process.env.REACT_APP_BASE_URL}users/${i.idUser}`)
              .then(async (resp2) => {
                i.idUser = await resp2.data.user.name;
              });
              await axios
              .get(`${process.env.REACT_APP_BASE_URL}combo/${i.idCombo}`)
              .then(async (resp3) => {
                
                i.idCombo = await resp3.data.combo.name;
              });
              await axios
              .get(`${process.env.REACT_APP_BASE_URL}umbrella/${i.idUmbrella}`)
              .then(async (resp4) => {
                
                i.idUmbrella = await resp4.data.umbrella.number;
              });
          }
        }
        console.log(rowsAux);
        setRows(rowsAux);
      
    })
    .catch(err=>alert(err.response.msg))
    
  },[])


    return ( 
        <div className="outerContainer p2">
        <h1>Historial de pagos</h1>
        
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Numero de pago</TableCell>
                <TableCell>Valor del pago</TableCell>
                <TableCell >Id de la carpa</TableCell>
                <TableCell >Cliente</TableCell>
                <TableCell >Combo</TableCell>
                <TableCell >Fecha</TableCell>
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
                  <TableCell >{row.total}</TableCell>
                  <TableCell >{row.idUmbrella}</TableCell>
                  <TableCell >{row.idUser}</TableCell>
                  <TableCell >{row.idCombo}</TableCell>
                  <TableCell ><SimpleDateTime dateFormat="DMY" dateSeparator="/"  timeSeparator=":">{row.fecha}</SimpleDateTime></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
}

export default Pagos