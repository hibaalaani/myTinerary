import React, { Component } from "react";
import axios from "axios";
import { connect } from 'react-redux'
import { register } from '../store/actions/usersAction'
class Users extends Component {
  constructor() {
    super();
    this.state = {
      users: {
        name: "",
        email: "",
        password: "",
        picture: ""
      }
    };
  }

  // componentDidMount() {
  //   // fetch("http://localhost:5000/api/users/")
  //   .then(res => {
  //     return res.json();
  //   })
  //   .then(result => {
  //     console.log("result :", result);
  //     this.setState({ users: result });
  //     console.log("from landing page ", this.state.users);
  //   });
  // let url = "http://localhost:5000/api/users/";
  // axios.post(url).then(response => console.log(response));
  // }
  handelChange = e => {
    console.log(e);
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handelSubmit = e => {
    // this.props.fetchUsersAction();
    e.preventDefault();
    // const users = this.props.params.match.id;

    //finish the condition including all the fields
    if (
      this.state.name === "" ||
      this.state.email === "" ||
      this.state.password === ""
    ) {
      alert("You should fill all the fields");
    } else {
      const newUser = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        picture: this.state.picture
      };
      this.props.register(newUser);
      // axios
      //   .post("http://localhost:5000/api/users/register", newUser)
      //   .then(res => {
      //     console.log("response", res);
      //     if (res.status === 200) {
      //       //send the user to his account page
      //       window.location = "/UserAccount";
      //     }
      //     this.setState({
      //       users: [...this.state, newUser]
      //     });
      //   })
      //   .catch(error => {
      //     console.log("error" + error.response);
      //     if (error.response) {
      //       if (error.response.status === 409) {
      //         alert("This email is already in use");
      //       } else {
      //         //alert with something else
      //       }
      //     }
      //   });
    }
  };

  render() {
    return (
      <div className="container">
        <h5 className="card-title">Sign Up</h5>
        <form className="form-group" onSubmit={this.handelSubmit}>
          <div className="row block">
            <div className="col-md-4">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" onChange={this.handelChange} />
            </div>
            <div className="col-md-4">
              <label htmlFor="email">email</label>
              <input type="text" id="email" onChange={this.handelChange} />
            </div>
          </div>
          <div className="row block">
            <div className="col-md-4">
              <label htmlFor="password">password</label>
              <input
                type="password"
                id="password"
                onChange={this.handelChange}
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="picture">picture</label>
              <input type="picture" id="picture" onChange={this.handelChange} />
            </div>
          </div>
          <div className="col-md-4">
            <button>Sign Up</button>
          </div>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  console.log("mamToState", state);

  return {
    user: state.users
  };
};
const mapDispatchToProps = dispatch => ({
  register: newUser => dispatch(register(newUser))
});

export default connect(mapStateToProps, mapDispatchToProps)(Users)