import React from 'react';
import Main from './components/Main';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/LoginContent';
function App() {
  return (
    <BrowserRouter>
      <Route path="/dashboard" component={()=><Main/>}/>
      <Route exact path="/" component={Home}/>
      <Route exact path= "/loginclient" component={Login}/>
    </BrowserRouter>
  
    
  );
}

export default App;
