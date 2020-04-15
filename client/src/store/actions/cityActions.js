import axios from "axios";
// export const FITCH_CITY = "FITCH_CITY";
import jwt_decode from "jwt-decode";
// I cleaned a bit your action, It was almost good, just a few probem with the .json() convertion and handeling the payload
//it shuld work now ;)
export const fetchCitiesAction = () => {
  return (dispatch) => {
    //add the full url of your back end
    fetch("http://localhost:5000/api/cities/all")
      .then((resp) => {
        return resp.json();
      })
      .then((json) => {
        dispatch({ type: "FETCH_CITIES_SUCCESS", payload: json });
      })
      .catch((err) => {
        dispatch({ type: "FETCH_CITIES_ERROR", payload: err });
      });
  };
};
export const fetchAddCity = (name, country, picture, token) => {
  return (dispatch) => {
    axios
      .post("http://localhost:5000/api/cities/", name, country, picture, {
        headers: {
          Authorization: `Basic ${token}`,
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
          dispatch({ type: "ADD_CITY", token });
          dispatch(fetchCitiesAction());
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
// add the token to the headers of the axios request
