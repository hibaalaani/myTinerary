import React, { Component } from "react";
import "../App.css";
import PhotoWithCamera from "./PhotoWithCamera.jpg";
import Circle from "../Circle.png";
import CarouselImg from "./CarouselImg";
import { Link } from "react-router-dom";
import { fetchCitiesAction } from "../store/actions/cityActions";
import { connect } from "react-redux";
class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: null
    };
  }
  componentDidMount() {
    // fetch("http://localhost:5000/api/cities/all")
    //   .then(res => {
    //     return res.json();
    //   })
    //   .then(result => {
    //     console.log("result :", result);
    //     this.setState({ cities: result });
    //     console.log("from landing page ", this.state.cities);
    //   });
    this.props.fetchCitiesAction();
  }
  render() {
    const cities = this.props.cities;
    console.log("cities22", cities);
    return (
      <div className="container-fluid">
        <header className="col-12 header">
          <section className="container-for-header-text col-12">
            <div className="header-text-wrapper col-md-6 col-sm-12">
              <h1>My Itinerary</h1>
              <p>make your trip with LOVE</p>
            </div>
          </section>

          {/* <img src={PhotoWithCamera} className="App-logo " alt="logo" /> */}
        </header>

        <div>
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

          {cities.length > 0 && <CarouselImg cities={cities} />}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  console.log("mamatoSTte", state);
  return {
    cities: state.cities.cities
  };
};
const mapDispatchToProps = dispatch => ({
  fetchCitiesAction: city => dispatch(fetchCitiesAction(city))
});
export default connect(mapStateToProps, mapDispatchToProps)(Landing);
