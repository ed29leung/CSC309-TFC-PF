import React, { useState, useEffect } from 'react';
import Cards from 'react-credit-cards';
import authHeader from 'services/authHeader';
import 'react-credit-cards/es/styles-compiled.css'

function SubView(){
    const [paymentData, setPaymentData] = useState({
        account: "",
        timestamp: "",
        amount: "",
        card_number: "",
        card_expiry: "",
        recurrence: "",
        card_name: ""
      });
      const [cardData, setCardData] = useState({
        cvc: '',
        expiry: '',
        focus: '',
        name: '',
        number: '',
      });

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
        fetch(`http://localhost:8000/payments/upcoming`, getOptions)
        .then(res => {
            if (!res.ok) {
                return res.text().then(text => {throw new Error(text)});}
            return res.json()})
        .then(data => {
            // set the subscription status of the user
            //update the total number of objects so we can decide when to display next button
            setPaymentData(data);
            if (data.recurrence === 'yearly'){
                setPaymentData({...data, recurrence: 'Annual'});
            }
            else if (data.recurrence === 'monthly'){
                setPaymentData({...data, recurrence: 'Monthly'});
            }
            else if (data.recurrence === 'weekly'){
                setPaymentData({...data, recurrence: 'Weekly'});
            }
            else if (data.recurrence === 'daily'){
                setPaymentData({...data, recurrence: 'Daily'});
            }
            setCardData({...cardData, name: data.card_name, number: data.card_number})
            return data;
        }).catch(error => {
            //if payment upcoming returns error
            //person does not have a payment or subscription
            const errorObject = JSON.parse(error.message);
            if (errorObject.detail && errorObject.code){
                //invalid token
                //TODO: display alert here
                Router.push("/accounts/login/");
            }
            else if (errorObject.error){ //this is custom error from backend
                console.log(errorObject.error);
                if (errorObject.error === "No upcoming payments, User is not subscribed"){
                    //TODO: handle 
                }
            }
            // Router.push("/");
        })
        }, [])

        return (
            <>
              <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                            <h3 className={"font-semibold text-lg "}> Upcoming Payment</h3>
                        </div>
                    </div>
                </div>
              <div id="UpcomingPaymentInfo">
                <Cards
                  cvc={cardData.cvc}
                  expiry={cardData.expiry}
                  focused={cardData.focus}
                  name={cardData.name}
                  number={cardData.number}
                />
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password">
                      CardHolder Name
                    </label>
                    <h6 className="text-xl font-normal leading-normal mt-0 mb-2 text-lightBlue-800">
                        {paymentData && paymentData.card_name}
                    </h6>
                    
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Card Number
                    </label>
                    <h6 className="text-xl font-normal leading-normal mt-0 mb-2 text-lightBlue-800">
                        {paymentData && paymentData.card_number}
                    </h6>
                  </div>
                  <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                      Card Expiry Date
                      </label>
                      <h6 className="text-xl font-normal leading-normal mt-0 mb-2 text-lightBlue-800">
                        {paymentData && paymentData.card_expiry}
                    </h6>
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                    TimeStamp
                    </label>
                    <h6 className="text-xl font-normal leading-normal mt-0 mb-2 text-lightBlue-800">
                        {paymentData && paymentData.timestamp}
                    </h6>
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                    Amount
                    </label>
                    <h6 className="text-xl font-normal leading-normal mt-0 mb-2 text-lightBlue-800">
                        ${paymentData && paymentData.amount}
                    </h6>
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                    Recurrance
                    </label>
                    <h6 className="text-xl font-normal leading-normal mt-0 mb-2 text-lightBlue-800">
                        {paymentData.recurrence}
                    </h6>
                  </div>
              </div>
              </>
            );
}

export default SubView;