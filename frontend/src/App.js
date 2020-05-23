import React from 'react';
import Main from './components/Main';
import {BrowserRouter} from 'react-router-dom';

// import Home from './components/Home';
// import {Switch,Route, Redirect} from 'react-router-dom';
function App() {
  // image url https://source.unsplash.com/random
  return (
    <BrowserRouter>
      <div>
        <Main/>
      </div>
    </BrowserRouter>
  
    
  );
}

export default App;
