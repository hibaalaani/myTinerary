const initialState = {
  token: "",
  isLoggedin: false,
  users: [],
  err: "",
  isLoggedOut: true
};

//you had some issues acting the payload to pass data from your action to your reducer
//I changed a bit the naming too so it makes more sense
function usersReducers(state = initialState, action) {
  console.log("city action", action);
  switch (action.type) {
    case "FETCH_USERS_SUCCESS":
      console.log("FETCH_USERS_SUCCESS", action);
      return { ...state, users: action.payload, err: "" };

    case "FETCH_USERS_ERROR":
      console.log("FETCH_ITINERARIES_ERROR", action);
      return { ...state, err: action.payload };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        token: action.payload.data.token,
        isLoggedin: true,
        isLoggedOut: false
      };
    default:
      return state;
  }
}
export default usersReducers;
