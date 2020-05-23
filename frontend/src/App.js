import React from 'react';
import Main from './components/Main';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './components/Home';
// import Home from './components/Home';
// import {Switch,Route, Redirect} from 'react-router-dom';
function App() {
  // image url https://source.unsplash.com/random
  return (
    <BrowserRouter>
       <Route path="/dashboard" component={()=><Main/>}/>
       <Route exact path="/" component={Home}/>
    </BrowserRouter>
  
    
  );
}

export default App;
