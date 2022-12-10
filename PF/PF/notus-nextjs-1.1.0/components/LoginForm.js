import Router  from 'next/router';
import React, { useState } from 'react';


function LoginForm() {
	const url = ""
	const [data, setData] = useState({
		username: "",
		password: "",
	});
  //make a state variable for the errors in the form: 
  const [userError, setUserError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

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
    		fetch('http://localhost:8000/accounts/login/', requestOptions)
        .then(response => {
          if (!response.ok) {
            // get error message from response body if status is not ok and pass to error
            // https://stackoverflow.com/a/49160068
            return response.text().then(text => {throw new Error(text)})
        } //otherwise return the tokens
         return response.json()})
        .then(tokenData => { //call the response.json() data
          if (tokenData.access) {
            //JSON.stringify before storing
            localStorage.setItem("tokens", JSON.stringify(tokenData));
            //Source: https://www.bezkoder.com/react-jwt-auth/
            //if login sucessful, store the username from the form data in browser 
            localStorage.setItem("currentUser", data.username);
          }
          Router.push("/accounts/profile");
          return tokenData;
      }).catch(error => {
        //render any backend errors here.
        // the JSON text is in Error Message, so convert to JSON object using Parse and 
        // then extract the message from the array
        console.log(error);
        const errorObject = JSON.parse(error.message);
        //console.log(errorObject.username[0]);
        // if the field is in the error response, display error, otherwise remove it
        if (errorObject.username){
          setUserError(errorObject.username[0]);
        }
        if (errorObject.detail && (!errorObject.code)){
          //backend sent invalid login message
          setUserError("Please check your username and password and try again.");
        }
        else if ((!errorObject.username) && (!errorObject.detail)){
          setUserError(null);
        }
        if (errorObject.password){
          setPasswordError(errorObject.password[0]);
        }
        else{setPasswordError(null);}
        
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
                      Log In
                    </button>
                  </div>
                </form>
	);
}

export default LoginForm;
