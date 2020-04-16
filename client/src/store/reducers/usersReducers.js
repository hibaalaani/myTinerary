const initialState = {
  token: "",
  isLoggedin: false,
  users: [],
  err: "",
};

//you had some issues acting the payload to pass data from your action to your reducer
//I changed a bit the naming too so it makes more sense
function usersReducers(state = initialState, action) {
  console.log("user action", action);
  switch (action.type) {
    case "FETCH_USERS_SUCCESS":
      console.log("FETCH_USERS_SUCCESS", action);
      return { ...state, users: action.payload, err: "" };
    // case "REGISTER_SUCCESS":
    //   return {
    //     ...state,
    //     token: action.token,
    //     users: action.payload.name,
    //     email: action.payload.email,
    //     isLoggedin: true,
    //   };
    case "FETCH_USERS_ERROR":
      console.log("FETCH_USERS_ERROR", action);
      return { ...state, err: action.payload.data };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        // token: action.payload.data.token,
        token: action.token,
        users: action.payload.name,
        email: action.payload.email,
        isLoggedin: true,
      };
    case "LOGED_OUT":
      return {
        ...state,
        isLoggedin: false,
        token: null,
      };

    default:
      return state;
  }
}
export default usersReducers;
