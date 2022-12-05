import React, { Component } from "react";
import Router from "next/router";

export default class Unauthorized extends Component {
    // componentDidMount = () => {
    //   Router.push("/");
    // };
  
    render() {
        return (
        <>
        <h2 className="font-semibold text-4xl text-gray-600">
        Unauthorized
        </h2>
      <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
        You must be logged in to access this page.
      </p>
      </>);
    }
  }