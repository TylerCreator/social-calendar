import React, { Component } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import * as routes from "../constants/routes";
import "./Form.css";
import { Button, Form, FormGroup, Input } from "reactstrap";

const PasswordForgetPage = () => (
  <div>
    <h1>Password Forget</h1>
    <PasswordForgetForm />
  </div>
);

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

const INITIAL_STATE = {
  email: "",
  error: null
};

class PasswordForgetForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;

    auth
      .doPasswordReset(email)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
      })
      .catch(error => {
        this.setState(byPropKey("error", error));
      });

    event.preventDefault();
  };

  render() {
    const { email, error } = this.state;

    const isInvalid = email === "";

    return (
      <div className="auth">
        <Form onSubmit={this.onSubmit} className="form-auth">
          <FormGroup>
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
          <div className="d-flex justify-content-center">
            <Button
              disabled={isInvalid}
              size="lg"
              type="submit"
              color="primary"
            >
              Reset my Password
            </Button>
          </div>
          {error && <p>{error.message}</p>}
        </Form>
      </div>
    );
  }
}

const PasswordForgetLink = () => (
  <p>
    <Link to={routes.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

export default PasswordForgetPage;

export { PasswordForgetForm, PasswordForgetLink };
