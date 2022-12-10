import React, { useState, useEffect } from 'react';
import Link from "next/link";
import authHeader from 'services/authHeader';
import { Router } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();



// Class Action button
const ClassActionButtom = ( prop ) => {
    const callRestApi = async (timeid, op) => {
        const url = 'http://localhost:8000/classes/modify/'
        const auth = authHeader()
        if (auth === null) {
            Router.push('accounts/login/');
        }

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': auth
            },
            body: JSON.stringify({
                'timeid': timeid,
                'op': op
            })
        });
        const jsonResponse = await response.json();
        console.log(jsonResponse)

        return new Promise((resolve, reject) => {
            if (response.status === 200) {
                resolve("Success: " + jsonResponse.success);
            } else {
                reject(Error("Error: " + jsonResponse.error));
            }
        });
    }
    
    // if op is 'enroll', then show fa-heart icon; else show fa-heart-crack icon
    if (prop.op == 'enroll') {
        return (
            <button
                className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => {
                    callRestApi(prop.timeid, prop.op)
                        .then((result) => {
                            toast.success(result, {
                                position: toast.POSITION.TOP_RIGHT,
                                autoClose: 2000
                            });
                        })
                        .catch((error) => {
                            toast.error(error.message, {
                                position: toast.POSITION.TOP_RIGHT,
                                autoClose: 2000
                            });
                        });
                }}
            >
                <i className="fas fa-heart"></i> Enroll
            </button>
        )
    }
    else {
        return (
            <button
                className="bg-orange-500 text-white active:bg-orange-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => {
                    callRestApi(prop.timeid, prop.op)
                        .then((result) => {
                            toast.success(result, {
                                position: toast.POSITION.TOP_RIGHT,
                                autoClose: 2000
                            });
                        })
                        .catch((error) => {
                            toast.error(error.message, {
                                position: toast.POSITION.TOP_RIGHT,
                                autoClose: 2000
                            });
                        });
                    }}
            >
                <i className="far fa-heart"></i> Drop
            </button>
        )
    }
}

export default ClassActionButtom;