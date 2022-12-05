import React from "react";

class AuthService {
    logout(){
        localStorage.removeItem("tokens");
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
}