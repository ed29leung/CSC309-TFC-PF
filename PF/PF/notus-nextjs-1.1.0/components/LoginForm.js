import React, { useState } from 'react';

function LoginForm() {
	const url = ""
	const [data, setData] = useState({
		username: "",
		password: "",
	})

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
    		fetch('http://localhost:8000/api-auth/login/', requestOptions)
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
                      Log In
                    </button>
                  </div>
                </form>
	);
}

export default LoginForm;
