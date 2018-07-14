import React from "react";
import {
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button
} from "reactstrap";
import { Link } from "react-router-dom";

export default class Header extends React.Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand tag={Link} to="/">
            ProdCode
          </NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {this.props.isAuth && this.props.user.roles.includes("Admin") ? (
                <NavItem>
                  <NavLink tag={Link} to="/dashboard">
                    Dashboard
                  </NavLink>
                </NavItem>
              ) : (
                ""
              )}

              {this.props.isAuth ? (
                <React.Fragment>
                  <NavItem>
                    <NavLink tag={Link} to="/product/create">
                      Create
                    </NavLink>
                  </NavItem>
                  <NavItem className="nav-link" style={{ cursor: "pointer" }}>
                    {this.props.user.name || "Mystery man"}
                  </NavItem>
                  <NavItem>
                    <Button
                      className="nav-link"
                      color="link"
                      onClick={this.props.logout}
                    >
                      Logout
                    </Button>
                  </NavItem>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <NavItem>
                    <NavLink tag={Link} to="/auth/register">
                      Register
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} to="/auth/login">
                      Login
                    </NavLink>
                  </NavItem>
                </React.Fragment>
              )}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
