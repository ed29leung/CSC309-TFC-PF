import React, { useState, useEffect } from 'react';
import Router from "next/router";
import authHeader from 'services/authHeader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

function PaymentHistory({ color }) {
    const url = ""
    //set the page size 
    const perPage =5;
    // set the initial state of the variable
	const [historyData, setHistoryData] = useState([]);
    //set the offset variable that determines which page we are on
    const [pgOffset, setPgOffset] = useState(0);
    //have to make this a state variable??
    const [total, setTotal] = useState(0);
    
    // use toast notify to display an alert upon error
    const notify = (message) => toast(message);

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
        fetch(`http://localhost:8000/payments/history/?limit=${perPage}&offset=${pgOffset}`, getOptions)
        .then(res => {
            if (!res.ok) {
                return res.text().then(text => {throw new Error(text)});}
            return res.json()})
        .then(data => {
            // set the subscription status of the user
            //update the total number of objects so we can decide when to display next button
            if (data.count == 0){
                notify("No payments in User's payment History");
            }
            setTotal(data.count);
            setHistoryData(data.results);
        }).catch(error => {
            //if payment upcoming returns error
            //person does not have a payment or subscription
            const errorObject = JSON.parse(error.message);
            if (errorObject.detail && errorObject.code){
                //invalid token
                notify("Session Expired. Please Log in Again");
                Router.push("/accounts/login/");
            }
            else if (errorObject.error){ //this is custom error from backend
                console.log(errorObject.error);
                notify(errorObject.error);
            }
        })
        }, [pgOffset])
        //whenever pgOffset is changed by next and previous, reload the table with the new page
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
                        Payment History
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
                        Timestamp
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
                            Card Number
                        </th>
                        <th
                            className={
                            "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                            (color === "light"
                                ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                            }
                        >
                            Card Expiry
                        </th>
                    </tr>
                  </thead>
                <tbody>
                    {historyData.map((payment, index) => (
                        <tr key={index}>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                { payment.timestamp }
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                ${ payment.amount }
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                { payment.card_number }
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                { payment.card_expiry }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>       
        </div>
    </div>
    {pgOffset > 0 ? 
        <button className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-6 py-3 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" 
            type="button"
            onClick={() => setPgOffset(Math.max(0, pgOffset - perPage))}> prev </button> : <></>}
    { pgOffset < (total - perPage) ? 
        <button className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-6 py-3 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => setPgOffset(pgOffset + perPage)}> next </button> : <></>}
    </>
    );

}

export default PaymentHistory;