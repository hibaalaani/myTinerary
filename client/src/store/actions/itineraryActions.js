import axios from "axios";
export const fitchItinerariesAction = () => {
  return (dispatch) => {
    //add the full url of your back end
    fetch("http://localhost:5000/api/itineraries")
      .then((resp) => {
        return resp.json();
      })
      .then((json) => {
        dispatch({ type: "FETCH_ITINERARIES_SUCCESS", payload: json });
      })
      .catch((err) => {
        dispatch({ type: "FETCH_ITINERARIES_ERROR", payload: err });
      });
  };
};
export const fetchItinerariesByCityName = (city) => {
  console.log("city", city);
  return (dispatch) => {
    fetch("http://localhost:5000/api/itineraries/" + city)
      .then((resp) => {
        return resp.json();
      })
      .then((json) => {
        console.log("json :", json);
        dispatch({ type: "FETCH_ITINERARIES_SUCCESS", payload: json });
      })
      .catch((err) => {
        dispatch({ type: "FETCH_ITINERARIES_ERROR", payload: err });
      });
  };
};
export const fetchItinerariesFavorite = (emailAdded, id, name) => {
  return (dispatch) => {
    axios
      .post(`http://localhost:5000/api/itineraries/${id}/favorites`, {
        email: emailAdded,
      })
      .then((res) => {
        console.log("response", res);
        if (res.status === 200) {
          //send the user to his account page
          dispatch({ type: "ADD_ITINERARY_FAVORITE" });
          dispatch(fetchItinerariesByCityName(name));
        }
      })
      .catch((error) => {
        console.log("error" + error.response);
        if (error.response) {
          if (error.response.status === 409) {
            alert("problem with email");
          } else {
            //alert with something else
            alert("Be Sure From Your email and link");
          }
        }
      });
  };
};

////////////delete email favorite from the itinerary
export const fetchItinerariesDeleteFavorite = (emailAdded, id, name) => {
  return (dispatch) => {
    axios
      .delete(`http://localhost:5000/api/itineraries/${id}/favorites`, {
        email: emailAdded,
      })
      .then((res) => {
        console.log("response", res);
        if (res.status === 200) {
          //send the user to his account page
          dispatch({ type: "DELETE_ITINERARY_FAVORITE" });
          dispatch(fetchItinerariesByCityName(name));
        }
      })
      .catch((error) => {
        console.log("error " + error.response);
        if (error.response) {
          if (error.response.status === 409) {
            alert("problem with email");
          } else {
            //alert with something else
            alert("Be Sure From Your email and link at delete fav");
          }
        }
      });
  };
};
////////////////Add comments to the itinerary by user
export const addComments = (comments, name, id, email) => {
  console.log("name", name);
  return (dispatch) => {
    axios
      .post(`http://localhost:5000/api/itineraries/${id}/comments`, {
        comments: comments,
        email,
      })
      .then((res) => {
        console.log("response", res);
        if (res.status === 200) {
          //send the user to his account page
          dispatch({ type: "ADD_COMMENTS" });
          dispatch(fetchItinerariesByCityName(name));
        }
      })
      .catch((error) => {
        console.log("error" + error.response);
        if (error.response) {
          if (error.response.status === 409) {
            alert("problem with email");
          } else {
            //alert with something else
            alert("Be Sure From Your email and link");
          }
        }
      });
  };
};
export const fetchDeleteComment = (comments, name, id) => {
  console.log("name", name);
  return (dispatch) => {
    axios
      .delete(`http://localhost:5000/api/itineraries/${id}/comments`, {
        comments: comments,
      })
      .then((res) => {
        console.log("response", res);
        if (res.status === 200) {
          //send the user to his account page
          dispatch({ type: "DELETE_COMMENTS" });
          dispatch(fetchItinerariesByCityName(name));
        }
      })
      .catch((error) => {
        console.log("error" + error.response);
        if (error.response) {
          if (error.response.status === 409) {
            alert("problem with email");
          } else {
            //alert with something else
            alert("Be Sure From Your email and link");
          }
        }
      });
  };
};
////////Add itinerary
export const fetchNewItinerary = (newitinerary, token) => {
  return (dispatch) => {
    console.log("newitinerary :", newitinerary);
    console.log("token", token);
    const config = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .post("http://localhost:5000/api/itineraries/add", newitinerary, config)
      .then((res) => {
        console.log("response", res);
        if (res.status === 200) {
          //why are you trying to get a token here? this is just bad copy pasting from other routes

          // const token = res.data.token;
          // localStorage.setItem("token", token);
          // console.log("token", token);
          // const decoded = jwt_decode(token); // decode your token here
          // console.log("decoded", decoded);
          //send the user to his account page

          dispatch({ type: "ADD_ITINERARY" });
          dispatch(fetchItinerariesByCityName(newitinerary.name));
        }
      })
      .catch((error) => {
        console.log("error" + error);
        if (error.response) {
          if (error.response.status === 409) {
            alert("problem with email");
          } else {
            //alert with something else
            alert("error from action itinerary", error);
          }
        }
      });
  };
};
