import React, { useState, useEffect } from 'react';

import SubscriptionForm from "components/SubscriptionForm";
import authHeader from "services/authHeader";
import Router from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

import Admin from "layouts/Admin.js";

export default function CancelSubscription() {
    let auth;
    //declare variable here so we can assign it in the useEffect

    //use useffect to get the authorization on load
    const notify = (message) => toast(message);
    useEffect(() => {
        auth = authHeader();
        if (!auth){
            Router.push("/unauthorized");
          }
    }, [])

    function handleClick(e){
        //No error handling, should only access this 
        e.preventDefault();
        
		const requestOptions = {
    		    method: 'DELETE',
		    crossDomain: true,
		    mode: 'cors',
    		    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': auth},
    		};
    	fetch('http://localhost:8000/subscriptions/cancel', requestOptions).then(response => {
          if (!response.ok) {
            // get error message from response body if status is not ok and pass to error
            // https://stackoverflow.com/a/49160068
            return response.text().then(text => {throw new Error(text)})
            //otherwise there is no response from delete api view to return here, so do not return anything
            }
        }).catch(error => {
            //render any backend errors here.
            console.log(error);
            const errorObject = JSON.parse(error.message);
            if (errorObject.detail){
                notify("No subscription found or subscription already cancelled.")
            }
        })
        notify("You have cancelled your subscription");
        Router.push("/accounts/profile/");
        }
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
        <p className="text-base font-light leading-relaxed mt-0 mb-4 text-lightBlue-800">
            Are you sure you want to cancel your subscription? This will terminate your coverage immediately, and
            You will need to buy a new subscription plan to resume coverage. 
        </p>
            <div>
                <button className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                onClick={e => handleClick(e)}
                > Cancel Subscription
                </button>
            </div>
        </div>
      </div>
    </>
  );
}