import logo from './logo.svg';
import sombrilla from './sombrilla.PNG'
import './App.css';

function App() {
  return (
    

    <div className="App">
      <header className="App-header">
      <p>
        <h1>Regístrate y ven a disfrutar</h1>
      </p>
      <div classname="registro">
        <h1>Realice su registro a continuación</h1>
        <label htmlFor="username">Nombre de usuario</label>
        <input value={this.state.username} name="Username" id="username" type="text"/>
        
      </div>

      <div classname="imagen">
        <img src={sombrilla} classname="App-logo" alt="Sombrilla"/>  

      </div>
      
        
      </header>
    </div> 

  );
  
}



export default App;
