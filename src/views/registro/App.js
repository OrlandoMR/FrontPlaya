import logo from './logo.svg';
import sombrilla from './sombrilla.PNG'
import './App.css';

function App() {
  return (
    
    <body>
      <section class="contact-box">

      <div id="grande" className="App">
        <p>
          <center>
            <h1>Regístrate y ven a</h1> <br></br> <h1>disfrutar</h1>
          </center>
        </p>
        <div id= "formulario" classname="formulario" class="contenedor">
        
            <div id="datos" class="input-contenedor center" classname="jaja">
             <i class="fas fa-envelope icon"></i>
                <label class="font-weight-bold">Correo Electrónico<span class="text-danger">: </span></label><br></br>
                <input type="email" id="aaa" class="box" />
            </div>

            <div id="datos" class="input-contenedor center" classname="jaja" >
                <i class="fas fa-key icon"></i>
                <label class="font-weight-bold">Contraseña<span class="text-danger">: </span></label><br></br>
                <input type="password" id="aaa" class="box"/>
            </div>

            <div id="datos" class="input-contenedor center" classname="jaja">
                <i class="fas fa-key icon"></i>
                <label class="font-weight-bold">Verificar contraseña<span class="text-danger">: </span></label><br></br>
                <input type="password" id="aaa" class="box" />
            </div>

            <div id="datos" class="input-contenedor center" classname="jaja">
                <i class="fas fa-user icon"></i>
                <label class="font-weight-bold">Nombre completo<span class="text-danger">: </span></label><br></br>
                <input type="text" id="aaa" class="box"/>
            </div>

            <input type="submit" value="Registrarse" Class="button center" />
     
        </div> 

        <div id="imagen" classname="imagen" >
          <img id="foto" src={sombrilla} classname="App-logo" alt="Sombrilla" class="center"/>  

        </div>
    </div>
    </section>
    </body>
  );
  
}



export default App;
