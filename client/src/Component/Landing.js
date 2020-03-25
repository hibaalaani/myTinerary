import React, { Component } from "react";
import "../App.css";
import PhotoWithCamera from "./PhotoWithCamera.jpg";
import Circle from "../Circle.png";
import CarouselImg from "./CarouselImg";
import { Link } from "react-router-dom";
<<<<<<< HEAD
import { fetchCitiesAction } from "../store/actions/cityActions";
import { connect } from "react-redux";
=======
import Itinerary from "./Itinerary";
// import AddCity from "./AddCity";
import { fetchCitiesAction } from "../store/actions/cityActions";
import { connect } from "react-redux";


>>>>>>> 11ae063289282a49cd4096dad0bec13360a33945
class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: null
    };
  }
  componentDidMount() {
<<<<<<< HEAD
=======
    this.props.fetchCitiesAction();

>>>>>>> 11ae063289282a49cd4096dad0bec13360a33945
    // fetch("http://localhost:5000/api/cities/all")
    //   .then(res => {
    //     return res.json();
    //   })
    //   .then(result => {
    //     console.log("result :", result);
    //     this.setState({ cities: result });
    //     console.log("from landing page ", this.state.cities);
    //   });
<<<<<<< HEAD
    this.props.fetchCitiesAction();
  }
  render() {
    const cities = this.props.cities;
    console.log("cities22", cities);
=======
  }
  render() {
    const cities = this.props.cities;
    console.log('cities :', cities);
>>>>>>> 11ae063289282a49cd4096dad0bec13360a33945
    return (
      <div className="container-fluid App">
        <header className="col-12 ">
          <img src={PhotoWithCamera} className="App-logo " alt="logo" />
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
<<<<<<< HEAD
=======
        {/* <AddCity cities={cities} /> */}
        {/* <Itinerary /> */}
>>>>>>> 11ae063289282a49cd4096dad0bec13360a33945
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
<<<<<<< HEAD
  console.log("mamatoSTte", state);
=======
  console.log("mamToState", state);

>>>>>>> 11ae063289282a49cd4096dad0bec13360a33945
  return {
    cities: state.cities.cities
  };
};
const mapDispatchToProps = dispatch => ({
  fetchCitiesAction: city => dispatch(fetchCitiesAction(city))
});
export default connect(mapStateToProps, mapDispatchToProps)(Landing);
<<<<<<< HEAD
=======

>>>>>>> 11ae063289282a49cd4096dad0bec13360a33945
