import React from "react";
import {
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button
 } from 'reactstrap';
import {Link} from "react-router-dom";

export default class Header extends React.Component {
    state = {
        isOpen: false
    };

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
  render() {
    return (
        <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand tag={Link} to="/">ProdCode</NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink tag={Link} to="/dashboard">Home</NavLink>
              </NavItem>
              <NavItem>
                  {this.props.isAuth ? <Button className="nav-link" color="link" onClick={this.props.logout}>Logout</Button> : <NavLink tag={Link} to="/auth/login">Login</NavLink>}
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
