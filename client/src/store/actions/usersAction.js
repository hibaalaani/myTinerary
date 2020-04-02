// I cleaned a bit your action, It was almost good, just a few probem with the .json() convertion and handeling the payload
//it shuld work now ;)
import axios from "axios";
import { Router } from "react-router-dom";

export const fetchUsersAction = () => {
  return dispatch => {
    //add the full url of your back end
    fetch("http://localhost:5000/api/users/all")
      .then(resp => {
        return resp.json();
      })
      .then(json => {
        dispatch({ type: "FETCH_USERS_SUCCESS", payload: json });
      })
      .catch(err => {
        dispatch({ type: "FETCH_USERS_ERROR", payload: err });
      });
  };

  console.log("action");
};

export const register = newUser => {
  return dispatch => {
    axios
      .post("http://localhost:5000/api/users/register", newUser)
      .then(res => {
        console.log("response", res);
        if (res.status === 200) {
          //send the user to his account page
          dispatch({ type: "REGISTER_SUCCESS", payload: res });
          window.location = "/UserAccount";
        }
      })
      .catch(error => {
        console.log("error" + error.response);
        if (error.response) {
          if (error.response.status === 409) {
            alert("loggin error");
          } else {
            //alert with something else
          }
        }
      });
    //add the full url of your back end
  };
};

export const login = user => {
  return dispatch => {
    axios
      .post("http://localhost:5000/api/users/login", user)
      .then(res => {
        console.log("response", res);
        if (res.status === 200) {
          //send the user to his account page
          dispatch({ type: "LOGIN_SUCCESS", payload: res });
          // window.location = "/UserAccount";
        }
      })
      .catch(error => {
        console.log("error" + error);
        if (error.response) {
          if (error.response.status === 409) {
            alert("loggin error");
          } else {
            //alert with something else
          }
        }
      });
    //add the full url of your back end
  };
};
