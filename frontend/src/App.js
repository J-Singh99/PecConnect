import React from 'react';
import Main from './components/Main';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/LoginContent';
import SignUp from './components/SignUpComponent';
function App() {
  return (
    <BrowserRouter>
      <Route path="/dashboard" component={()=><Main/>}/>
      <Route exact path="/" component={Home}/>
      <Route exact path= "/loginclient" component={Login}/>
      <Route exact path ="/signup" component={SignUp}/>
    </BrowserRouter>
  
    
  );
}

export default App;
