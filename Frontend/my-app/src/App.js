
import './App.css';



import Login from './components/Login';
import Update from './components/Update';
import Reg from './components/Reg';
import Home from './components/Home'
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';


function App() {
  return (
    <div className="App">
    <Router>
    <Routes>
    <Route path="/" exact element= { <Home />}  />
      <Route path="/register" exact element= { <Reg />} />  
      <Route path='/login' exact element = { <Login />}  />
      <Route path='/update' exact element = { <Update />} />
    </Routes>
    </Router>
    
     
    </div>
  );
}

export default App;
