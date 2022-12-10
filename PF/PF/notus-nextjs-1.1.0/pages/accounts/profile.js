import React, { useState, useEffect } from "react";

import Navbar from "components/Navbars/AccountNavbar.js";
import Footer from "components/Footers/Footer.js";
import authHeader from "services/authHeader";
import Router from "next/router";

const profileViewApi = async (studio_id) => {
	if (studio_id === '') {
		return null
	}
	
	const url = 'http://localhost:8000/studios/' + studio_id
	const response = await fetch(url);
    const jsonResponse = await response.json();
	console.log(jsonResponse)
	return jsonResponse
}


const Profile = () => {

	const [profileInfo, setProfileInfo] = useState({
		username: '',
		first_name: '',
		last_name: '',
		email: '',
		phone_number: '',
		avatar: ''});

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
                setProfileInfo(json);
		    console.log(json);
            })
    }, [])
  return (
    <>
      <Navbar transparent />
      <main className="profile-page">
        <section className="relative block h-500-px">
          <div
            className="absolute top-0 w-full h-full bg-center bg-orange-500 bg-cover"
          >
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-16"
            style={{ transform: "translateZ(0)" }}
          >
          </div>
        </section>
        <section className="relative py-16 bg-blueGray-200">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative">
                      <img
                        src={profileInfo.avatar}
                        className="shadow-xl rounded-full align-middle mx-auto border-none -m-16 w-32 h-32"
	  		style={{minWidth:'150px', minHeight:'150px', maxWidth:'150px', maxHeight:'150px', objectFit:'cover', backgroundImage:'url("https://t4.ftcdn.net/jpg/00/64/67/63/240_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg")', backgroundSize:'cover'}}
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-3 mt-32 sm:mt-0">
                      <a
                        className="bg-blueGray-700 active:bg-blueGray-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                        type="button"
	  		href="/accounts/update"
                      >
                        Edit
                      </a>
                      <a
                        className="bg-blueGray-700 active:bg-blueGray-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                        type="button"
	  		href="/payments/"
                      >
                        Payments
                      </a>
                      <a
                        className="bg-blueGray-700 active:bg-blueGray-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                        type="button"
	  		href="/accounts/logout"
                      >
                        Log Out
                      </a>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                      <div className="mr-4 p-3 text-center">
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-12">
                  <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
	  		{profileInfo.first_name} {profileInfo.last_name}
                  </h3>
                  <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                    <i className="fas fa-envelope mr-2 text-lg text-blueGray-400"></i>{" "}
	  {profileInfo.email}
                  </div>
                  <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                    <i className="fas fa-phone mr-2 text-lg text-blueGray-400"></i>{" "}
	  {profileInfo.phone_number}
                  </div>
                </div>
                <div className="mt-10 py-10 text-center">
	  {/*
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                        An artist of considerable range, Jenna the name taken by
                        Melbourne-raised, Brooklyn-based Nick Murphy writes,
                        performs and records all of his own music, giving it a
                        warm, intimate feel with a solid groove structure. An
                        artist of considerable range.
                      </p>
                      <a
                        href="#pablo"
                        className="font-normal text-lightBlue-500"
                        onClick={(e) => e.preventDefault()}
                      >
                        Show more
                      </a>
                    </div>
                  </div>
		*/}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Profile

