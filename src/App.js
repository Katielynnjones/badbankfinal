import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import { UserProvider } from './context';
import CreateAccount from './createaccount';
import Login from './login';
import Balance from './balance';
import AllData from './alldata';
import NavBar from './navbar';
import Home from './home';

function Spa() {
  return (
    <HashRouter>
      <NavBar />
      <UserProvider>
        <Route path="/" exact component={Home} />
        <Route path="/CreateAccount/" component={CreateAccount} />
        <Route path="/login/" component={Login} />
        <Route path="/balance/" component={Balance} />
        <Route path="/alldata/" component={AllData} />
      </UserProvider>
    </HashRouter>
  );
}

ReactDOM.render(
  <Spa />,
  document.getElementById('root')
);
