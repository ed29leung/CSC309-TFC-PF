import Router from 'next/router';
import React, { useState } from 'react';

function SignupForm() {
	const url = ""
	const [data, setData] = useState({
		username: "",
		first_name: "",
		last_name: "",
		email: "",
		password: "",
		password2: "",
		//avatar: "",
		phone_number: "",
	})

  const [userError, setUserError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [password2Error, setPassword2Error] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [phoneError, setPhoneError] = useState(null);

	// code from https://www.youtube.com/watch?v=9KaMsGSxGno
	function handle(e){
		const newData={...data}
		newData[e.target.id] = e.target.value
		setData(newData)
	}
	function submit(e){
		e.preventDefault();
		const requestOptions = {
    		    method: 'POST',
		    crossDomain: true,
		    mode: 'cors',
    		    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    		    body: JSON.stringify(data)
    		};
    		fetch('http://localhost:8000/accounts/signup/', requestOptions).then(response => {
          if (!response.ok) {
            // get error message from response body if status is not ok and pass to error
            // https://stackoverflow.com/a/49160068
            return response.text().then(text => {throw new Error(text)})
        } //otherwise return the tokens
         return response.json()})
        .then(formData => { //call the response.json() data
          Router.push("/accounts/login/");
      }).catch(error => {
        //render any backend errors here.
        const errorObject = JSON.parse(error.message);
        if (errorObject.username){
          setUserError(errorObject.username[0]);
        }
        else{setUserError(null);}

        if (errorObject.password){
          setPasswordError(errorObject.password[0]);
        }
        else{setPasswordError(null);}

        if (errorObject.password2){
          setPassword2Error(errorObject.password2[0]);
        }
        else{setPassword2Error(null);}

        if (errorObject.email){
          setEmailError(errorObject.email[0]);
        }
        else{setEmailError(null);}
        
        if (errorObject.phone_number){
          setPhoneError(errorObject.phone_number[0]);
        }
        else{setPhoneError(null);}
    });
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
                      Password
                    </label>
                    <input
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
			id="password"
	  		value={data.password}
	  		onChange={(e) => handle(e)}
                    />
                  {passwordError && <h2>{passwordError}</h2>}
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Repeat Password
                    </label>
                    <input
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Repeat Password"
			id="password2"
	  		value={data.password2}
	  		onChange={(e) => handle(e)}
                    />
                  {password2Error && <h2>{password2Error}</h2>}
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
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
			type="submit"
                    >
                      Create Account
                    </button>
                  </div>
                </form>
	);
}

export default SignupForm;
