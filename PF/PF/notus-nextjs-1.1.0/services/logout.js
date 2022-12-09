import React from "react";

export default function logout(){
        localStorage.removeItem("tokens");
        localStorage.removeItem("currentUser");
    }
    
    // getCurrentToken(){
    //     const tokens = JSON.parse(localStorage.getItem("tokens"));
    //     if (tokens && tokens.access){
    //         return tokens.access;
    //     }
    //     else{
    //         return 'Not Logged In';
    //     }
    // }
