import React, { useState, useEffect } from "react";
import { createPopper } from "@popperjs/core";
import authHeader from "services/authHeader";
import logout from "services/logout.js";

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



const UserDropdown = () => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
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


  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  return (
    <>
      <a
        className="text-blueGray-500 block"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="items-center flex">
          <span className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
            <img
              className="w-full rounded-full align-middle border-none shadow-lg"
	        src={profileInfo.avatar}
	  	style={{minWidth:'50px', minHeight:'50px', maxWidth:'50px', maxHeight:'50px', objectFit:'cover', backgroundImage:'url("https://t4.ftcdn.net/jpg/00/64/67/63/240_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg")', backgroundSize:'cover'}}

            />
          </span>
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <a
          href="/accounts/profile"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
        >
          Profile
        </a>
        <a
          href="/accounts/update"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
        >
          Edit Profile
        </a>
        <a
          href="/subscriptions/subscribe"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
        >
          Manage Subscription
        </a>
        <div className="h-0 my-2 border border-solid border-blueGray-100" />
        <a
	  href="/accounts/logout"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
	  onClick={logout}
        >
          Logout
        </a>
      </div>
    </>
  );
};

export default UserDropdown;
