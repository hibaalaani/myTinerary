import React, { Component } from "react";
import "../App.css";
import MYtinerary from "./MYtineraryLogo.png";
import Circle from "../Circle.png";
import Footer from "../Footer";
export default class Landing extends Component {
  render() {
    return (
      <div className="container App">
        <div>
          <header className="col-12">
            <img src={MYtinerary} className="App-logo " alt="logo" />
          </header>
        </div>
        <p className="mt-4 textSize col-sm-12 ">
          Find your perfect trip ,designed by insiders who know their cities{" "}
        </p>
        <h1 className="textSize mt-4 col-sm-12 ">Start Browing</h1>
        <img src={Circle} alt="looking" className="circle" />
        <p className="mt-4 textSize col-sm-12">
          Want to build your own MYtinerary ?
        </p>
        <a href="/" className="d-flex float-left m-4">
          {" "}
          Log In
        </a>
        <a href="/" className="d-flex float-right m-4">
          {" "}
          Craete Account
        </a>
        <div className="col-12 mt-4">
          {" "}
          <Footer />
        </div>
      </div>
    );
  }
}
