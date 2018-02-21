import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem } from "reactstrap";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import * as routes from "../constants/routes";
import SignOutButton from "./SignOut";

const Navigation = (props, { authUser }) => (
  <div>{authUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>
);

Navigation.contextTypes = {
  authUser: PropTypes.object
};

const NavigationAuth = () => (
  <Navbar
    className="d-flex justify-content-between "
    color="faded"
    light
    expand="md"
  >
    <NavbarBrand className="h1" href="/">
      Social Calendar
    </NavbarBrand>
    <Nav navbar>
      <NavItem>
        <Link className="nav nav-link h4" to={routes.ACCOUNT}>
          Account
        </Link>
      </NavItem>
      <NavItem>
        <Link className="nav nav-link h4" to={routes.LANDING}>
          Landing
        </Link>
      </NavItem>
    </Nav>
    <Nav>
      <NavItem>
        <SignOutButton />
      </NavItem>
    </Nav>
  </Navbar>
);

const NavigationNonAuth = () => (
  <Navbar color="faded" light expand="md">
    <NavbarBrand className="h1" href="/">
      Social Calendar
    </NavbarBrand>
    <Nav className="ml-auto" navbar>
      <NavItem>
        <Link className=" nav nav-link text-primary" to={routes.SIGN_UP}>
          Sign up
        </Link>
      </NavItem>
      <span className="nav nav-link">or</span>
      <NavItem>
        <Link className="nav nav-link text-primary" to={routes.SIGN_IN}>
          Sign in
        </Link>
      </NavItem>
    </Nav>
  </Navbar>
);

export default Navigation;
