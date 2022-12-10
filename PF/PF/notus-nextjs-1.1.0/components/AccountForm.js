import React, { useState, useEffect } from 'react';
import Router from "next/router";
import authHeader from 'services/authHeader';

function AccountForm() {
	const url = ""
    // set the initial state of the variable
	const [data, setData] = useState({
		username: "",
		first_name: "",
		last_name: "",
		email: "",
		avatar: "",
		phone_number: "",
	})

  const [userError, setUserError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [phoneError, setPhoneError] = useState(null);
  // Need handle code to edit fields on forms
  function handle(e){
		const newData={...data}
		newData[e.target.id] = e.target.value
		setData(newData)
	}

    // code from https://www.youtube.com/watch?v=9KaMsGSxGno
    //include authorization in request: https://stackoverflow.com/a/70426220 
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
        fetch('http://localhost:8000/accounts/profile/', getOptions)
            .then(res => res.json())
            .then(json => {
                json.avatar = null;
                setData(json);
            })
    }, [])
    //do not include data in the variable for useeffect since it will 
    // reload every time the value changes
	function submit(e){
		e.preventDefault();
    const auth = authHeader();
		const requestOptions = {
    		    method: 'PATCH',
		    crossDomain: true,
		    mode: 'cors',
    		    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': auth},
    		    body: JSON.stringify(data)
    		};
        
    		fetch('http://localhost:8000/accounts/update/', requestOptions).then(response => {
          if (!response.ok) {
            // get error message from response body if status is not ok and pass to error
            // https://stackoverflow.com/a/49160068
            return response.text().then(text => {throw new Error(text)})
        } //otherwise return the tokens
         return response.json()})
        .then(formData => { //call the response.json() data
          //TODO: change username in local storage?
          Router.push("/accounts/profile/");
      }).catch(error => {
        //render any backend errors here.
        const errorObject = JSON.parse(error.message);
        if (errorObject.detail && errorObject.code){
          //invalid token
          Router.push("/accounts/login/");
        }
        if (errorObject.username){
          setUserError(errorObject.username[0]);
        }
        else{setUserError(null);}

        if (errorObject.email){
          setEmailError(errorObject.email[0]);
        }
        else{setEmailError(null);}
        
        if (errorObject.phone_number){
          setPhoneError(errorObject.phone_number[0]);
        }
        else{setPhoneError(null);}
    });
		//TODO: render any backend errors here.
	}
	return (
		<form onSubmit={(e) => submit(e)}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Username"
			id="username"
	  	      value={data.username}
	  		onChange={(e) => handle(e)}
                    />
                  {userError && <h2>{userError}</h2>}
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="First Name"
			id="first_name"
	  	      value={data.first_name}
	  		onChange={(e) => handle(e)}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Last Name"
			id="last_name"
	  	      value={data.last_name}
	  		onChange={(e) => handle(e)}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
			id="email"
	  		value={data.email}
	  		onChange={(e) => handle(e)}
                    />
                  {emailError && <h2>{emailError}</h2>}
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Phone Number
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Phone Number"
			id="phone_number"
	  		value={data.phone_number}
	  		onChange={(e) => handle(e)}
                    />
                  {phoneError && <h2>{phoneError}</h2>}
                  </div>
	  		{/*
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Avatar
                    </label>
                    <input
                      type="file"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
			id="avatar"
			value={data.avatar}
			onChange={(e) => handle(e)}
                    />
                  </div>

                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        I agree with the{" "}
                        <a
                          href="#pablo"
                          className="text-lightBlue-500"
                          onClick={(e) => e.preventDefault()}
                        >
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                  </div>
		  */}

                <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-600 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
			type="submit"
                    >
                      Update Account
                    </button>
                  </div>
                </form>
	);
}

export default AccountForm;
