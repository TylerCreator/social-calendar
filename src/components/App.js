import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import * as routes from "../constants/routes";

import withAuthentication from "./withAuthentication";
import Navigation from "./Navigation";
import SignInPage from "./SignIn";
import SignUpPage from "./SignUp";
import LandingPage from "./Landing";
import PasswordForgetPage from "./PasswordForget";
import HomePage from "./Home";
import AccountPage from "./Account";

const App = () => (
  <Router>
    <div className="text-center">
      <Navigation />
      <Route
        exact
        path={routes.LANDING}
        component={LandingPage}
        // component={() => {
        //   <HomePage />;
        // }}
      />
      <Route
        exact
        path={routes.HOME}
        component={HomePage}
        // component={() => {
        //   <HomePage />;
        // }}
      />
      <Route
        exact
        path={routes.SIGN_IN}
        component={SignInPage}
        // component={() => {
        //   <SignInPage />;
        // }}
      />
      <Route
        exact
        path={routes.SIGN_UP}
        component={SignUpPage}
        // component={() => {
        //   <SignUpPage />;
        // }}
      />
      <Route
        exact
        path={routes.PASSWORD_FORGET}
        // component={() => <PasswordForgetPage />}
        component={PasswordForgetPage}
      />
      <Route
        exact
        path={routes.ACCOUNT}
        // component={() => <AccountPage />}
        component={AccountPage}
      />
    </div>
  </Router>
);

export default withAuthentication(App);
