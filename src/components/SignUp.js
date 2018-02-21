import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import * as routes from "../constants/routes";
import "./Form.css";
import { auth, db } from "../firebase";

const SignUpPage = ({ history }) => (
  <div>
    <h1>Sign Up</h1>
    <SignUpForm history={history} />
  </div>
);

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

const INITIAL_STATE = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  error: null
};

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { username, email, passwordOne } = this.state;
    const { history } = this.props;

    auth
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your own accessible Firebase Database too
        db
          .doCreateUser(authUser.uid, username, email)
          .then(() => {
            this.setState(() => ({ ...INITIAL_STATE }));
            history.push(routes.HOME);
          })
          .catch(error => {
            this.setState(byPropKey("error", error));
          });
      })
      .catch(error => {
        this.setState(byPropKey("error", error));
      });

    event.preventDefault();
  };

  render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      username === "";
    return (
      <div className="auth">
        <Form onSubmit={this.onSubmit} className="form-auth">
          <FormGroup>
            <Label for="inputName">Name</Label>
            <Input
              className="form-control"
              type="text"
              name="username"
              id="inputName"
              placeholder="Full name"
              required
              autoFocus
              value={username}
              onChange={event =>
                this.setState(byPropKey("username", event.target.value))
              }
            />
          </FormGroup>
          <FormGroup>
            <Label for="inputEmail">Email</Label>
            <Input
              className="form-control"
              type="email"
              name="email"
              id="inputEmail"
              placeholder="Email address"
              required
              value={email}
              onChange={event =>
                this.setState(byPropKey("email", event.target.value))
              }
            />
          </FormGroup>
          <FormGroup>
            <Label for="inputPasswordOne">Password</Label>
            <Input
              className="form-control"
              type="password"
              name="passwordOne"
              id="inputPasswordOne"
              required
              value={passwordOne}
              onChange={event =>
                this.setState(byPropKey("passwordOne", event.target.value))
              }
            />
          </FormGroup>
          <FormGroup>
            <Label for="inputPasswordOne">Confirm password</Label>
            <Input
              className="form-control"
              type="password"
              name="passwordTwo"
              id="inputPasswordTwo"
              required
              value={passwordTwo}
              onChange={event =>
                this.setState(byPropKey("passwordTwo", event.target.value))
              }
            />
          </FormGroup>
          <div className="d-flex justify-content-center">
            <Button
              size="lg"
              disabled={isInvalid}
              type="submit"
              color="primary"
            >
              Sign Up
            </Button>
          </div>
          {error && <p>{error.message}</p>}
        </Form>
      </div>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>
);

export default withRouter(SignUpPage);

export { SignUpForm, SignUpLink };
