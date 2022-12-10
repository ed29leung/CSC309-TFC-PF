import React, { useState, useEffect } from 'react';
import Cards from 'react-credit-cards';
import authHeader from 'services/authHeader';
import Router from 'next/router';
import 'react-credit-cards/es/styles-compiled.css'
import {
  formatCreditCardNumber,
  formatCVV,
  formatExpirationDate
} from "./PaymentUtils";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

//based off example code here: 
// https://www.npmjs.com/package/react-credit-cards 

function PaymentForm() {
    const [payData, setPayData] = useState({
      cvc: '',
      expiry: '',
      focus: '',
      name: '',
      number: '',
    });
    const [existing, setExisting] = useState ({exist: false, url: "", method: ""});
    
    const notify = (message) => toast(message);

    function convertExpiryDate(data){
      // https://stackoverflow.com/a/14630840 
      var month=parseInt(data.substr(0,2));
      //subsstring from index 2
      var year=parseInt("20"+ data.substr(2,2));
      return `${year}-${month}-01`
    }

    function handleInputFocus(e) {
      // keep the previous state of variable payData using ...payData but change the focus
      setPayData({...payData,focus: e.target.name})}

    //validation partially from here: https://codesandbox.io/s/ovvwzkzry9 
    function handleInputChange(e) {
      // keep the previous state of variable payData but change the name: value
      if (e.target.name === "number") {
        e.target.value = formatCreditCardNumber(e.target.value);}
      else if (e.target.name === "cvc") {
        e.target.value = formatCVV(e.target.value);}
      else if (e.target.name === "expiry") {
        e.target.value = formatExpirationDate(e.target.value);}
      // format before setting the name and value
      const { name, value } = e.target;
      setPayData({...payData, [name]: value });
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
      fetch(`http://localhost:8000/payments/view/`, getOptions)
      .then(res => {
          if (!res.ok) {
              return res.text().then(text => {throw new Error(text)});}
          return res.json()})
      .then(data => {
          // set the subscription status of the user
          //update the total number of objects so we can decide when to display next button
          if (data.payinfo === true){
              setExisting({exist: true, url: "update", method: "PUT"});
          }
          else{setExisting({exist: false, url: "add", method: "POST"});}
      })
      .catch(error => {
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
          }
      })
      }, []);
  
  function submit(e){
  e.preventDefault();
  const auth = authHeader();
  const requestOptions = {
          method: existing.method,
      crossDomain: true,
      mode: 'cors',
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': auth},
          body: JSON.stringify({
                  "name_on_card": payData.name,
                  "card_number": payData.number,
                  "cvv": payData.cvc,
                  "expiry_date": convertExpiryDate(payData.expiry)
              })
      };
      fetch(`http://localhost:8000/payments/${existing.url}/`, requestOptions)
      .then(response => {
        if (!response.ok) {
          // get error message from response body if status is not ok and pass to error
          // https://stackoverflow.com/a/49160068
          return response.text().then(text => {throw new Error(text)})
      } //otherwise return the tokens
       return response.json()})
      .then(json => { //call the response.json() data
        notify("Sucessfully Updated Payment Info")
        Router.push("/payments/");
        //do not return json here for reouter to work
    }).catch(error => {
      const errorObject = JSON.parse(error.message);
      if (errorObject.expiry_date){
        console.log(errorObject.expiry_date[0]);
        notify(errorObject.expiry_date[0]);
      }
      
  });
}

    //used this code to create the form: 
    // https://codesandbox.io/s/react-credit-card-3pw31?file=/src/App.js:1695-3518 

    return (
    <>
      <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                {existing.exist === true ? <h3 className={"font-semibold text-lg "}> Update Payment</h3> : <h3 className={"font-semibold text-lg "}> Add Payment</h3>}
                </div>
            </div>
        </div>
      <div id="PaymentForm">
	    <div className="pb-4">
        <Cards
          cvc={payData.cvc}
          expiry={payData.expiry}
          focused={payData.focus}
          name={payData.name}
          number={payData.number}
        />
	    </div>
        <form onSubmit={(e) => submit(e)}>
          <div className="relative w-full mb-3">
            <label
              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              htmlFor="grid-password">
              CardHolder Name
            </label>
            <input
              type="text"
              name='name'
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              placeholder='Name'
              pattern='[a-z A-Z-]+'
              required
              onChange={(e) => handleInputChange(e)}
              onFocus={(e) => handleInputFocus(e)}
              />
          </div>
          <div className="relative w-full mb-3">
            <label
              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Card Number
            </label>
            <input
                type='tel'
                name='number'
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                placeholder='Card Number'
                pattern='[\d| ]{16,22}'
                maxLength='19'
                required
                onChange={(e) => handleInputChange(e)}
                onFocus={(e) => handleInputFocus(e)}
              />
          </div>
          <div className="relative w-full mb-3">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
              Card Expiry Date
              </label>
              <input
                type='tel'
                name='expiry'
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                placeholder='Valid Thru'
                required
                onChange={(e) => handleInputChange(e)}
                onFocus={(e) => handleInputFocus(e)}
              />    
          </div>
          <div className="relative w-full mb-3">
            <label
              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
            CVV
            </label>
            <input
                type='tel'
                name='cvc'
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                placeholder='CVV'
                pattern='\d{3}'
                required
                onChange={(e) => handleInputChange(e)}
                onFocus={(e) => handleInputFocus(e)}
              />
          </div>
          <div className="text-center mt-6">
              <button
                 className="bg-blueGray-600 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
			            type="submit"
              >
                {existing.exist === true ? "Update Credit Card Info" : "Add Credit Card Info"}
              </button>
          </div>
        </form>
      </div>
      </>
    );
}

export default PaymentForm;
