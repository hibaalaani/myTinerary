// I cleaned a bit your action, It was almost good, just a few probem with the .json() convertion and handeling the payload
//it shuld work now ;)
import axios from "axios";
import jwt_decode from "jwt-decode"; // import dependency

// const jwtDecode = require("jwt-decode");
export const fetchUsersAction = () => {
  return (dispatch) => {
    //add the full url of your back end
    fetch("http://localhost:5000/api/users/all")
      .then((resp) => {
        return resp.json();
      })
      .then((json) => {
        dispatch({ type: "FETCH_USERS_SUCCESS", payload: json });
      })
      .catch((err) => {
        dispatch({ type: "FETCH_USERS_ERROR", payload: err });
      });
  };
};

export const register = (newUser) => {
  return (dispatch) => {
    axios
      .post("http://localhost:5000/api/users/register", newUser)
      .then((res) => {
        console.log("response", res);
        if (res.status === 200) {
          //send the user to his account page
          const token = res.data.token;
          localStorage.setItem("token", token);
          console.log("token", token);
          const decoded = jwt_decode(token); // decode your token here

          console.log("decoded", decoded);

          // dispatch({
          //   type: "REGISTER_SUCCESS",
          //   payload: decoded,
          //   token: token,
          // });
          window.location = "/UserAccount";
        }
      })
      .catch((error) => {
        console.log("error" + error.response);
        if (error.response) {
          if (error.response.status === 409) {
            alert("Register error");
          } else {
            //alert with something else
            alert("Be Sure From Your Register");
          }
        }
      });
    //add the full url of your back end
  };
};

export const login = (userData) => {
  return (dispatch) => {
    axios
      .post("http://localhost:5000/api/users/login", userData)
      .then((res) => {
        console.log("response", res);
        if (res.status === 200) {
          // decode the token

          const token = res.data.token;
          localStorage.setItem("token", token);
          console.log("token", token);
          const decoded = jwt_decode(token); // decode your token here

          console.log("decoded", decoded);
          console.log("res", res);
          //send the user to his account page
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: decoded,
            token: token,
            //  payload: token,
            //   user: decoded.name,
            //send the decoded token instead
          });
        }
        // window.location = "/UserAccount ";
      })
      .catch((error) => {
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

// ///////////////////add comments to the user
// export const addComments = (comments, name, email) => {
//   console.log("name", name);
//   return (dispatch) => {
//     axios
//       .post(`http://localhost:5000/api/users/${name}/comments`, {
//         comments: comments,
//         email,
//       })
//       .then((res) => {
//         console.log("response", res);
//         if (res.status === 200) {
//           //send the user to his account page
//           dispatch({ type: "ADD_COMMENTS", payload: res.payload });
//         }
//       })
//       .catch((error) => {
//         console.log("error" + error.response);
//         if (error.response) {
//           if (error.response.status === 409) {
//             alert("problem with email");
//           } else {
//             //alert with something else
//             alert("Be Sure From Your email and link");
//           }
//         }
//       });
//   };
// };
