import React, { Component } from "react";
import Router from "next/router";

export default class Logout extends Component {
  componentDidMount = () => {
    Router.push("/accounts/login");
  };

  render() {
    return <div />;
  }
}
