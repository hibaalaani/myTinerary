import React, { Component } from "react";
import "../App.css";
import Header from "./Header.jpg";
import Circle from "../Circle.png";
import CarouselImg from "./CarouselImg";
import { Link } from "react-router-dom";

export default class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: null
    };
  }
  componentDidMount() {
    fetch("http://localhost:5000/api/cities/all")
      .then(res => {
        return res.json();
      })
      .then(result => {
        console.log("result :", result);
        this.setState({ cities: result });
        console.log(this.state.cities);
      });
  }
  render() {
    const cities = this.state.cities;
    return (
      <div>
        <header className="col-12">
          <img src={Header} className="App-logo " alt="logo" />
        </header>

        <div className="container App">
          <p className="mt-4 textSize col-sm-12 ">
            Find your perfect trip ,designed by insiders who know their cities{" "}
          </p>
          <h1 className="textSize mt-4 col-sm-12 ">Start Browing</h1>
          <Link to="/Cities" pro>
            <img src={Circle} alt="looking" className="circle" />
          </Link>
          <p className="mt-4 textSize col-sm-12">
            Want to build your own MYtinerary ?
          </p>

          {cities && <CarouselImg cities={cities} />}
        </div>
      </div>
    );
  }
}
