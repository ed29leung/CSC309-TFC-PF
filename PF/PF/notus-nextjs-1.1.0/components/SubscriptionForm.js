import React, { useState, useEffect } from 'react';
import Router from "next/router";
import authHeader from 'services/authHeader';

function SubscriptionForm({ color }) {
    const url = ""
    // set the initial state of the variable
	const [subData, setSubData] = useState([]);
    const [selected, setSelected] = useState();
    const [subStatus, setSubStatus] = useState({
        status: false,
        url: "",
        method: "",
    });
    //These variables wil be set in the use effect but 
    // we need it to be accessible outside of the use effect/function
    // so we can set the subData variable above
    //need the useEffect so this code runs on page load
    function handleClick(planid, interval){
        // when the radio button is clicked, trigger this function
        // which uses the plan id passed into this function to change
        // the state variable for the selected plan
        setSelected(planid);
    }
    useEffect(() => {
        const auth = authHeader();
        if (!auth){
          Router.push("/unauthorized");
        }
        const getOptions = {
            method: 'GET',
            crossDomain: true,
            mode: 'cors',
            headers: {'Content-Type': 'application/json' , 'Authorization': auth},
        };
        fetch('http://localhost:8000/subscriptions/status', getOptions)
        .then(res => {
            if (!res.ok) {
                return res.text().then(text => {throw new Error(text)});}
            return res.json()})
        .then(data => {
            // set the subscription status of the user
            console.log(data.subscription)
            if (data.subscription === true){
                setSubStatus({status: true, url: "update", method: 'PUT'});
            }
            else{setSubStatus({status: false,url: "subscribe", method: 'POST'});}
            fetch('http://localhost:8000/subscriptions/list/').then(res => res.json())
            .then(json => {
                const plancount = json.count;
                setSubData(json.results);
                return json;
            })
        }).catch(error => {
            //if payment upcoming returns error
            //person does not have a payment or subscription
            const errorObject = JSON.parse(error.message);
            if (errorObject.detail && errorObject.code){
                //invalid 
                //TODO: display alert here
                Router.push("/accounts/login/");
            }
            else if (errorObject.error){ //this is custom error from backend
                console.log(errorObject.error);
            }
        })
        }, [])
        //do not include subData in the use effect because we do not want to reload this
    function submit(e){
        e.preventDefault();
        const auth = authHeader();
        const requestOptions = {
            method: subStatus.method,
            crossDomain: true,
            mode: 'cors',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': auth},
                body: JSON.stringify({"plan": selected})
            };
            
        fetch(`http://localhost:8000/subscriptions/${subStatus.url}/`, requestOptions).then(response => {
            if (!response.ok) {
            // get error message from response body if status is not ok and pass to error
            // https://stackoverflow.com/a/49160068
            return response.text().then(text => {throw new Error(text)})
        } //otherwise return the tokens
             return response.json()})
            .then(formData => { //call the response.json() data
              return formData;
          }).catch(error => {
            //render any backend errors here.
            const errorObject = JSON.parse(error.message);

        });
        }
        return (
        <>
        <div
            className={
            "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
            (color === "light" ? "bg-white" : "bg-blueGray-700 text-white")
            }
        >
            <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                    <h3
                        className={
                        "font-semibold text-lg " +
                        (color === "light" ? "text-blueGray-700" : "text-white")
                        }
                    >
                        Available Subscriptions
                    </h3>
                    </div>
                </div>
            </div>
            <div className="block w-full overflow-x-auto">
                {/* Projects table */}
                <table className="items-center w-full bg-transparent border-collapse">
                  <thead>
                    <tr>
                        <th
                        className={
                          "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                          (color === "light"
                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                            : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                        }
                      >
                        Selection
                        </th>
                        <th
                            className={
                            "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                            (color === "light"
                                ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                            }
                        >
                            Plan #
                        </th>
                        <th
                            className={
                            "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                            (color === "light"
                                ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                            }
                        >
                            Payment
                        </th>
                        <th
                            className={
                            "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                            (color === "light"
                                ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                            }
                        >
                            Interval
                        </th>
                    </tr>
                  </thead>
                <tbody>
                    {subData.map((plan, index) => (
                        <tr key={plan.id}>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <input type="radio" onChange={() => handleClick(plan.id, plan.interval)} checked={(selected === plan.id)}/>
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                { plan.id }
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                ${ plan.payment }
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                { plan.interval }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>       
        </div>
    </div>
        {selected && <h1> Selected Plan: {selected}</h1>}
        {subStatus && subStatus.status ? <h1> User currently has subscription plan.</h1> : <h1> User is currently not subscribed. </h1> }
    <form onSubmit={(e) => submit(e)}>
        <div className="text-center mt-6">
            <button className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                type="submit">
                    {subStatus && subStatus.status ? "Update Subscription" : "Subscribe"}
            </button>
        </div>
    </form>
    </>
    );
}
export default SubscriptionForm;