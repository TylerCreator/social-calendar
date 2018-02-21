import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { withRouter } from "react-router-dom";
import "./Form.css";
import { SignUpLink } from "./SignUp";
import { PasswordForgetLink } from "./PasswordForget";
import * as routes from "../constants/routes";
import { auth, firebase } from "../firebase";

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

const SignInPage = ({ history }) => (
  <div>
    <h1>Sign In</h1>
    <SignInForm history={history} />
    <PasswordForgetLink />
    <SignUpLink />
  </div>
);

class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATE
    };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    const { history } = this.props;

    auth
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(byPropKey("error", error));
      });

    event.preventDefault();
  };

  onSignInWithGoogle = () => {
    const { history } = this.props;

    auth
      .doSignInWithGoogle(firebase.googleProvider)
      .then(() => {
        history.push(routes.HOME);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { email, password } = this.state;
    const isInvalid = password === "" || email === "";

    return (
      <div className="auth">
        <Form onSubmit={this.onSubmit} className="form-auth">
          <FormGroup>
            <Label for="inputEmail">Email</Label>
            <Input
              className="form-control"
              type="email"
              name="email"
              id="inputEmail"
              placeholder="Email address"
              required
              autoFocus
              value={email}
              onChange={event =>
                this.setState(byPropKey("email", event.target.value))
              }
            />
          </FormGroup>
          <FormGroup>
            <Label for="inputPassword">Password</Label>
            <Input
              className="form-control"
              type="password"
              name="password"
              id="inputPassword"
              required
              value={password}
              onChange={event =>
                this.setState(byPropKey("password", event.target.value))
              }
            />
            <div className="d-flex justify-content-between">
              <Button disabled={isInvalid} type="submit" color="primary">
                Sign in
              </Button>
              <Button
                color="secondary"
                onClick={() => {
                  this.onSignInWithGoogle();
                }}
              >
                Sign in with Google
              </Button>
            </div>
          </FormGroup>
        </Form>
      </div>
    );
  }
}
export default withRouter(SignInPage);
export { SignInForm };
