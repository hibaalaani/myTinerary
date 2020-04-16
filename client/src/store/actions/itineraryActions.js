// I cleaned a bit your action, I was almost good, just a few probem with the .json() convertion and handeling the payload
//it shuld work now ;)
import axios from "axios";
import jwt_decode from "jwt-decode"; // import dependency

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
  return (dispatch) => {
    fetch("http://localhost:5000/api/itineraries/" + city)
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
export const fetchItinerariesFavorite = (emailAdded, name) => {
  console.log("name", name);
  return (dispatch) => {
    axios
      .post(`http://localhost:5000/api/itineraries/${name}/favorites`, {
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
export const fetchItinerariesDeleteFavorite = (emailAdded, name) => {
  console.log("name", name);
  return (dispatch) => {
    axios
      .delete(`http://localhost:5000/api/itineraries/${name}/favorites`, {
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
////////////////Add comments to the itinerary by user
export const addComments = (comments, name, email) => {
  console.log("name", name);
  return (dispatch) => {
    axios
      .post(`http://localhost:5000/api/itineraries/${name}/comments`, {
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
export const fetchDeleteComment = (comments, email, name) => {
  console.log("name", name);
  return (dispatch) => {
    axios
      .delete(`http://localhost:5000/api/itineraries/${name}/comments`, {
        comments: comments,
        email,
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
    // var token = localStorage.getItem("token");
    axios
      .post("http://localhost:5000/api/itineraries/", newitinerary, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("response", res);
        if (res.status === 200) {
          const token = res.data.token;
          localStorage.setItem("token", token);
          console.log("token", token);
          const decoded = jwt_decode(token); // decode your token here

          console.log("decoded", decoded);
          //send the user to his account page
          dispatch({ type: "ADD_ITINERARY", token });
          dispatch(fetchItinerariesByCityName(newitinerary.name));
        }
      })
      .catch((error) => {
        console.log("error" + error.response);
        if (error.response) {
          if (error.response.status === 409) {
            alert("problem with email");
          } else {
            //alert with something else
            alert("error from action itinerary");
          }
        }
      });
  };
};
