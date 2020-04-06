import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { fetchItinerariesByCityName } from "../store/actions/itineraryActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { Button } from "react-bootstrap";
const green = "#ffff00";
const red = "#FF0000";
class Itinerary extends Component {
  constructor() {
    super();
    this.state = {
      itineraries: [],
      favourite: "",
      favColor: green,
    };
    this.handelChange = this.handelChange.bind(this);
  }
  componentDidMount() {
    const city = this.props.match.params.city;

    this.props.fetchItinerariesByCityName(city);
  }
  handelChange = (e) => {
    console.log(e);
    const newColor = this.state.favColor == green ? red : green;
    this.setState({ favColor: newColor });
    // this.setState({
    ///change the button color
    /////post the favourite to the user
    // const newFavourite = this.props.match.params.name;
    const newFavourite = this.props.itineraries;
    console.log("newFavourite", newFavourite);
    axios
      .post("http://localhost:5000/api/users/favourite", newFavourite)
      .then((res) => {
        console.log("response", res);
        if (res.status === 200) {
          //send the user to his account page
          let history = useHistory();
          history.push("/home");
        }
        if (this.state.favourite != newFavourite) {
          this.setState({
            users: [...this.state.favourite, newFavourite],
          });
        } else {
          this.setState({
            users: [...this.state.favourite, ""],
          });
        }
      })
      .catch((error) => {
        console.log("error " + error.response);
        if (error.response) {
          console.log(error.response.status);
          if (error.response.status === 409) {
            alert("This email is already in use");
          } else {
            //alert with something else
            alert("you add this itinerary");
          }
        }
      });
    // });
  };
  filter() {
    if (this.props.itineraries) {
      const filterItinerary = this.props.itineraries.filter(
        (itinerary, index) => {
          return itinerary.profile;
        }
      );
      return filterItinerary;
    } else {
      return [];
    }
  }
  render() {
    const filterList = this.filter();
    // const { itineraries } = this.props;
    return (
      <div>
        <h1>Our Itineraries</h1>
        {filterList &&
          filterList.map((itinerary, index) => (
            <div
              className="container  itinerary"
              key={index}
              itinerary={itinerary}
            >
              {/* <div> */}
              <h3 className="card-title pt-3 text-light">
                Activities in {itinerary.name} : {itinerary.activities}
              </h3>
              <img
                className="card-body  align-center"
                src={itinerary.profile}
                alt={itinerary.name}
              />
              <div className="text-light pb-3">
                <h4>
                  The Price for {itinerary.duration} With Hotels{" "}
                  {itinerary.price}
                </h4>
                <div className="row justify-content-around">
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="col-sm-4"
                    size="3x"
                    style={{ color: this.state.favColor }}
                    onClick={this.handelChange}
                  />
                  <Button
                    color="danger"
                    className="col-sm-4"
                    size="lg"
                    onClick={(id) => {
                      this.setState(() => ({
                        itineraries: this.state.itineraries.filter(
                          (itinerary) => itinerary.id != id
                        ),
                      }));
                    }}
                  >
                    &times;
                  </Button>
                </div>
              </div>
            </div>
          ))}
        {/* <FontAwesomeIcon
          icon={faHeart}
          className="mr-2 "
          style={{ background: this.state.favColor }}
          onClick={this.handelChange}
        /> */}
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  console.log("mamToState", state);

  return {
    itineraries: state.itineraries.itineraries,
  };
};
const mapDispatchToProps = (dispatch) => ({
  fetchItinerariesByCityName: (city) =>
    dispatch(fetchItinerariesByCityName(city)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Itinerary);
