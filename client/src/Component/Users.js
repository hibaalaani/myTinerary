import React, { Component } from "react";
import axios from "axios";
export default class Users extends Component {
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
    this.props.fetchUsersAction();
    e.preventDefault();
    // const users = this.props.params.match.id;
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      picture: this.state.picture
    };
    axios
      .post("http://localhost:5000/api/users/register", { newUser })
      .then(res => {
        console.log("response", res);
        this.setState({
          users: [...this.state, newUser]
        });
      })
      .catch(error => {
        console.log(error);
      });

    console.log("new user", newUser);
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
