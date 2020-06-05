import React from 'react';
import Main from './components/Main';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/LoginContent';
import SignUp from './components/SignUpComponent';
import {Provider} from 'react-redux';
import store from './store';
import {loadUser} from './actions/auth';
class App extends React.Component{
  componentDidMount(){
    store.dispatch(loadUser());
  }
  render() {
    console.log(store)
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Route path="/dashboard" component={()=><Main/>}/>
          <Route exact path="/" component={Home}/>
          <Route exact path= "/loginclient" component={Login}/>
          <Route exact path ="/signup" component={SignUp}/>
        </BrowserRouter>
      </Provider>
    );
  
  }
}

export default App;
