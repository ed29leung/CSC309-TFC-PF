import React, { useState, useEffect } from 'react';
import Link from "next/link";


const callClassModify = async (timeid, op) => {
    const [showAlert, setShowAlert] = React.useState(true);

    const url = 'http://localhost:8000/classes/modify/'
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            timeid: timeid,
            op: op,
        }),
    });
    const jsonResponse = await response.json();
  
    if (jsonResponse.status == 200) {
        return (
            <>
                {showAlert ? (
                <div
                    className="text-white px-6 py-4 border-0 rounded relative mb-4 bg-emerald-500"
                >
                    <span className="text-xl inline-block mr-5 align-middle">
                    <i className="fas fa-bell" />
                    </span>
                    <span className="inline-block align-middle mr-8">
                    <b className="capitalize">Success!</b> {jsonResponse.message}
                    </span>
                    <button
                    className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
                    onClick={() => setShowAlert(false)}
                    >
                    <span>×</span>
                    </button>
                </div>
                ) : null}
            </>
        );
    } else {
        return (
            <>
                {showAlert ? (
                <div
                    className="text-white px-6 py-4 border-0 rounded relative mb-4 bg-orange-500"
                >
                    <span className="text-xl inline-block mr-5 align-middle">
                    <i className="fas fa-bell" />
                    </span>
                    <span className="inline-block align-middle mr-8">
                    <b className="capitalize">Error!</b> {jsonResponse.message}
                    </span>
                    <button
                    className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
                    onClick={() => setShowAlert(false)}
                    >
                    <span>×</span>
                    </button>
                </div>
                ) : null}
            </>
          );
    }
        
  };
  
export default RegisterClassAlert; 