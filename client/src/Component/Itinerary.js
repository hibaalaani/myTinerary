import React, { Component } from "react";
import { connect } from "react-redux";
import AddComments from "../Component/AddComments";
import { login } from "../store/actions/usersAction";
import { fetchItinerariesByCityName } from "../store/actions/itineraryActions";
import {
  fetchItinerariesFavorite,
  fetchItinerariesDeleteFavorite,
} from "../store/actions/itineraryActions";
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

    // this.props.login(newFavorite);

    // this.props.fetchItinerariesFavorite(emailAdded);
    // console.log("emailAdded", emailAdded);
  };
  handelFavorite = (name) => {
    const emailAdded = this.props.user.email;
    //////////// if (this.props.user.logged)

    this.props.fetchItinerariesFavorite(emailAdded, name);
  };
  handelDeleteFavorite = (name) => {
    const emailAdded = this.props.user.email;
    this.props.fetchItinerariesDeleteFavorite(emailAdded, name);
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
                            <Card
                              className="col-sm-4"
                              border="warning"
                              variant="primary"
                              style={{ width: "12rem" }}
                            >
                              <Card.Title className="textColor">
                                {comment.email}
                              </Card.Title>
                              <Card.Body>
                                <Card.Text className="textColor">
                                  {comment.msg}
                                </Card.Text>
                                <Button variant="primary">
                                  Delete Comment
                                </Button>
                              </Card.Body>
                            </Card>
                            {/* {" "} */}
                            {/* <div className="row">
                            <div className="col">{comment.email}</div>
                            <div className="col">{comment.msg}</div>
                          </div> */}
                            {/* <Card style={{ width: "10rem" }}>
                            <Card.Body>
                              <Card.Title>{comment.email}</Card.Title>
                              <Card.Text>{comment.msg}</Card.Text>
                              <Button variant="primary">Delete Comment</Button>
                            </Card.Body>
                          </Card> */}
                            {/* <h2>{comment.msg}</h2>
                          <p>{comment.email}</p> */}
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  console.log("mamToState", state);

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
  fetchItinerariesDeleteFavorite: (emailAdded, name) =>
    dispatch(fetchItinerariesDeleteFavorite(emailAdded, name)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Itinerary);
