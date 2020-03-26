// I cleaned a bit your action, It was almost good, just a few probem with the .json() convertion and handeling the payload
//it shuld work now ;)
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
