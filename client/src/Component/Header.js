import React, { Component } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { login } from "../store/actions/usersAction";
import { connect } from "react-redux";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  Form,
} from "reactstrap";
// import FormControl from "react-bootstrap/FormControl";
class Header extends Component {
  constructor(props) {
    super();
    this.state = {
      isOpen: false,
      search: "",
      user: "",
    };
  }

  componentDidMount() {
    const userData = {
      user: this.state.user,
    };
    console.log(userData);
    this.props.login(userData);
  }
  render() {
    //toggle = () => this.setState({ isOpen: !isOpen });
    return (
      <div>
        <Navbar color="dark" dark expand="sm">
          <Link to="/">
            <NavbarBrand>MyItenarary</NavbarBrand>
          </Link>
          <NavbarToggler
            onClick={() => this.setState({ isOpen: !this.state.isOpen })}
          />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem dark>
                <NavLink>
                  {" "}
                  <Link to="/Cities">Cities We Offer </Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink>
                  {" "}
                  <Link to="/AddCity">New City </Link>
                </NavLink>
              </NavItem>
              {this.props.user.isLoggedin ? (
                <NavLink>
                  <Link to="/LogOut"> LogOut</Link>
                </NavLink>
              ) : (
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Sign
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      {" "}
                      <Link to="/Login">Login </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link to="/Users">Sign Up </Link>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              )}
            </Nav>
            <Form inline>
              <Button variant="outline-success ">
                {this.props.user.isLoggedin ? (
                  <p> Hello {this.props.user.users}</p>
                ) : (
                  <Link to="/Login">Login </Link>
                )}
              </Button>
            </Form>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  console.log("mamToState", state);

  return {
    user: state.users,
  };
};
const mapDispatchToProps = (dispatch) => ({
  login: (userData) => dispatch(login(userData)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);
