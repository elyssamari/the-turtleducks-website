import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Admin from './pages/Admin';
import Feed from './pages/Feed';
import Home from './pages/Home';
import './App.css';

// React components
export function getWebS(){
  return new WebSocket('ws://localhost:1234/ws');
}
function App() {
  function refreshPage(){
    window.location.reload();
  }
  return (
    <div className="App">      
      <nav>       
            <div onClick={refreshPage} class="alink"><Link to="/"><h3>Home</h3></Link></div>        
            <div onClick={refreshPage} class="alink"><Link to="/admin"><h3>Admin</h3></Link></div>         
            <div onClick={refreshPage} class="alink"><Link to="/feed"><h3>Feed</h3></Link></div>        
      </nav>
      <Switch>
        <Route path="/admin">
          <Admin />
        </Route>
        <Route path="/feed">
          <Feed />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
