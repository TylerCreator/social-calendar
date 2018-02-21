import React, { Component } from "react";

import "./Form.css";
import { Button, Form, FormGroup, Input } from "reactstrap";

import { auth } from "../firebase";

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

const INITIAL_STATE = {
  passwordOne: "",
  passwordTwo: "",
  error: null
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { passwordOne } = this.state;

    auth
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
      })
      .catch(error => {
        this.setState(byPropKey("error", error));
      });

    event.preventDefault();
  };

  render() {
    const { passwordOne, passwordTwo, error } = this.state;

    const isInvalid = passwordOne !== passwordTwo || passwordOne === "";

    return (
      <div className="auth">
        <Form onSubmit={this.onSubmit} className="form-auth">
          <FormGroup>
            <Input
              className="form-control"
              type="password"
              name="passwordOne"
              id="inputPasswordOne"
              placeholder="New password"
              required
              value={passwordOne}
              onChange={event =>
                this.setState(byPropKey("passwordOne", event.target.value))
              }
            />
          </FormGroup>
          <FormGroup>
            <Input
              className="form-control"
              type="password"
              name="passwordTwo"
              id="inputPasswordTwo"
              placeholder="Confirm New Password"
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
              Reset My Password
            </Button>
          </div>
          {error && <p>{error.message}</p>}
        </Form>
      </div>
    );
  }
}

export default PasswordChangeForm;
