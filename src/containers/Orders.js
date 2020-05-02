import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import fire from "../firebase";
import history from "./History";
import Login from "./Login";
class Orders extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    history.push("Orders");
  }
  logout() {
    fire.auth().signOut();
  }
  direct() {
    history.push("Login");
  }
  render() {
    return (
      <div>
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Pizzaroo</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem>
                <button
                  onClick={() => {
                    this.logout();
                    this.direct();
                  }}
                >
                  {" "}
                  logout
                </button>
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
export default Orders;
