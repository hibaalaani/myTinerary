import React, { Component } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import login from "../store/actions/usersAction";
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
  Form
} from "reactstrap";
import FormControl from "react-bootstrap/FormControl";
export default class Header extends Component {
  constructor(props) {
    super();
    this.state = {
      isOpen: false,
      search: ""
    };
  }

  handleChangeChild = e => {
    console.log("e from header", e);
    const user = this.props.user.token;
    //console.log("this.props", this.props);
    // this.props.callbackFromParent(e);
    this.props.login(user);
  };

  render() {
    //toggle = () => this.setState({ isOpen: !isOpen });
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">MyItenarary</NavbarBrand>
          <NavbarToggler
            onClick={() => this.setState({ isOpen: !this.state.isOpen })}
          />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
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
                  {/* <DropdownItem divider /> */}
                  {/* <DropdownItem>Reset</DropdownItem> */}
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
            <Form inline>
              {/* <FormControl
                value={this.state.search}
                onChange={this.handleChangeChild}
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />*/}
              <Button variant="outline-success ">
                {" "}
                {this.props.user}
                Search
              </Button>
            </Form>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
