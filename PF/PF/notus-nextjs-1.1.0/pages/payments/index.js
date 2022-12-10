import React, { useState, useEffect } from 'react';

import PaymentHistory from "components/PaymentHistory";
import SubView from "components/SubView";
import authHeader from "services/authHeader";
import Link from "next/link";

import Admin from "layouts/Admin.js";

const Tabs = () => {
  const [openTab, setOpenTab] = useState(1);
  useEffect(() => {
    const auth = authHeader();
    if (!auth){
        Router.push("/unauthorized");
      }
    //this tab is open by default
    setOpenTab(2);
    }, [])
  return (
    <>
	  	  	<div className="container mx-auto px-4 h-full">
            <div className="flex content-center items-center justify-center h-full">
              <div className="w-full px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">

      <div className="flex flex-wrap">
        <div className="w-full">
          <ul
            className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
            role="tablist"
          >
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 1
                    ? "text-white bg-lightBlue-600"
                    : "text-lightBlue-600 bg-white")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
                Add/Edit Payment Information
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 2
                    ? "text-white bg-lightBlue-600"
                    : "text-lightBlue-600 bg-white")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                href="#link2"
                role="tablist"
              >
                View Upcoming Payment
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 3
                    ? "text-white bg-lightBlue-600"
                    : "text-lightBlue-600 bg-white")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(3);
                }}
                data-toggle="tab"
                href="#link3"
                role="tablist"
              >
                Payment History
              </a>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                <Link href='/payments/add/'>
                    <button className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                    > Add/Edit Payment Information
                    </button>
                </Link>
                </div>
                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                  <SubView/>
                </div>
                <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                  <PaymentHistory color="dark"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        </div>
      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </>
  );
};
Tabs.layout=Admin;
export default Tabs;
