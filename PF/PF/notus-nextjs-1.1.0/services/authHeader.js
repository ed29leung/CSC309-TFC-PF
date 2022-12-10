import React from "react";

//helper function for authentication header for fetch requests
//https://www.bezkoder.com/react-jwt-auth/
export default function authHeader() {
    const tokens = JSON.parse(localStorage.getItem("tokens"));
    console.log(tokens)

    if (tokens && tokens.access){
        return 'Bearer ' + tokens.access;
    }
    else{
        return null;
    }
}