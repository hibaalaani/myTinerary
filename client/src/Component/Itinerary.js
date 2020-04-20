import React, { Component } from "react";
import { connect } from "react-redux";
import AddComments from "../Component/AddComments";
import { fetchItinerariesByCityName } from "../store/actions/itineraryActions";
import {
  fetchItinerariesFavorite,
  fetchItinerariesDeleteFavorite,
  fetchDeleteComment,
} from "../store/actions/itineraryActions";
import AddItinerary from "./AddItinerary";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { Button, Card } from "react-bootstrap";

const green = "#ffff00";
const red = "#FF0000";
class Itinerary extends Component {
  constructor() {
    super();
    this.state = {
      itineraries: [],
      favorites: [],
      favColor: green,
      comments: [],
    };
  }
  componentDidMount() {
    const city = this.props.match.params.city;

    this.props.fetchItinerariesByCityName(city);
  }
  handelChange = (e) => {
    const newColor = this.state.favColor === green ? red : green;
    this.setState({ favColor: newColor });
  };
  handelFavorite = (name) => {
    const emailAdded = this.props.user.email;

    this.props.fetchItinerariesFavorite(emailAdded, name);
  };
  handelDeleteFavorite = (name) => {
    const emailAdded = this.props.user.email;
    this.props.fetchItinerariesDeleteFavorite(emailAdded, name);
  };
  handelDeleteComment = (name) => {
    const email = this.props.user.email;
    const comments = this.props.itineraries.comments;
    console.log("comment", comments);
    console.log("nameItiner", name);
    this.props.fetchDeleteComment(comments, email, name);
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
    const email = this.props.user.email;
    // const { itineraries } = this.props;
    return (
      <div className="container">
        <h1>Our Itineraries</h1>
        {filterList &&
          filterList.map((itinerary, index) => (
            <div
              className="container m-2 itinerary"
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
                    size="3x"
                    style={
                      itinerary.favorites.includes(email)
                        ? { color: "red" }
                        : { color: "green" }
                    }
                    // onClick={() => this.handelFavorite(itinerary.name)}
                    onClick={() =>
                      itinerary.favorites.includes(email)
                        ? this.handelDeleteFavorite(itinerary.name)
                        : this.handelFavorite(itinerary.name)
                    }
                  />

                  <AddComments itinerary={itinerary} />
                </div>
                <div>
                  <div>
                    {itinerary.comments &&
                      itinerary.comments.map((comment) => {
                        return (
                          <div>
                            <Card style={{ width: "18rem" }}>
                              <Card.Header>What Other Said</Card.Header>
                              <Card.Body>
                                <Card.Text className="textColor">
                                  {comment.msg}
                                </Card.Text>
                                <footer className="blockquote-footer">
                                  <cite title="Source Title">Written by</cite>{" "}
                                  {comment.email}{" "}
                                </footer>
                                <Button
                                  variant="primary"
                                  onClick={() =>
                                    comment.email &&
                                    comment.email.includes(email)
                                      ? this.handelDeleteComment(itinerary.name)
                                      : alert("its not your comment")
                                  }
                                >
                                  Delete Comment
                                </Button>
                              </Card.Body>
                            </Card>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        <React.Fragment>
          <AddItinerary />
        </React.Fragment>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    itineraries: state.itineraries.itineraries,
    user: state.users,
    favorites: state.itineraries.favorites,
  };
};
const mapDispatchToProps = (dispatch) => ({
  fetchItinerariesByCityName: (city) =>
    dispatch(fetchItinerariesByCityName(city)),

  fetchItinerariesFavorite: (emailAdded, name) =>
    dispatch(fetchItinerariesFavorite(emailAdded, name)),
  fetchDeleteComment: (comments, email, name) =>
    dispatch(fetchDeleteComment(comments, email, name)),
  fetchItinerariesDeleteFavorite: (emailAdded, name) =>
    dispatch(fetchItinerariesDeleteFavorite(emailAdded, name)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Itinerary);
