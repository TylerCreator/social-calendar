import React from "react";
import { Button } from "reactstrap";
import { auth } from "../firebase";

const SignOutButton = () => (
  <Button className="btn btn-link text-danger" onClick={auth.doSignOut}>
    {" "}
    Sign Out
  </Button>
);

export default SignOutButton;
