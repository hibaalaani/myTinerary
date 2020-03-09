import React from "react";

import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";
import Landing from "./Component/Landing";
import Create from "./Component/Create";
import Login from "./Component/Login";
import Cities from "./Component/Cities";
// import Mytineraries from "./Component/Mytineraries";

import "bootstrap/dist/css/bootstrap.min.css";

import Notfound from "./Component/Notfound";
import Header from "./Component/Header";

function App() {
  return (
    <Router>
      <Header />

      <div className="App">
        {/* <ul className="d-flex decoration-none p-1 m-2">
          <li className="m-1 btn-primary p-1 bg-light"> */}
        <Link to="/"></Link>
        {/* </li>
          <li className="m-1 btn-primary p-1 bg-light"> */}
        <Link to="/Create"></Link>
        {/* </li>
          <li className="m-1 btn-primary p-1 bg-light"> */}
        <Link to="/login"></Link>
        {/* </li>
          <li className="m-1 btn-primary p-1 bg-light"> */}
        {/* <Link to="/User"></Link> */}
        <Link to="/Cities"></Link>
        {/* </li>
        </ul> */}

        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/Create" component={Create} />
          {/* <Route path="/User" component={User} /> */}
          <Route exact path="/Login" component={Login} />
          <Route path="/Cities" component={Cities} />

          <Route component={Notfound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
