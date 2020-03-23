import React from "react";

import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";
import Landing from "./Component/Landing";
import Create from "./Component/Create";
import Login from "./Component/Login";
import Cities from "./Component/Cities";
import AddCity from "./Component/AddCity";
// import Mytineraries from "./Component/Mytineraries";
import Itinerary from "./Component/Itinerary";
import "bootstrap/dist/css/bootstrap.min.css";

import Notfound from "./Component/Notfound";
import Header from "./Component/Header";

function App() {
  return (
    <Router>
      <Header />

      <div className="App">
        <Link to="/"></Link>

        <Link to="/Create"></Link>

        <Link to="/login"></Link>

        <Link to="/Cities"></Link>
        <Link to="/Itineraries"></Link>
        <Link to="/AddCity"></Link>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/Create" component={Create} />
          <Route exact path="/Login" component={Login} />
          <Route exact path="/Cities" component={Cities} />
          <Route exact path="/AddCity" component={AddCity} />
          <Route exact path="/Itinerary" component={Itinerary} />
          <Route exact path="/itineraries/:city" component={Itinerary} />
          <Route component={Notfound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
