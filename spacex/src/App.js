
// import './App.css';
import logo from "./spacex-logo.png";
import Layout from "../src/layout/layout"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
     
       <Layout/>
      </header>
    </div>
  );
}

export default App;
