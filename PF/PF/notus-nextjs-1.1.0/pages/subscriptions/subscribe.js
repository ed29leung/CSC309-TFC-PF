import React from "react";

import SubscriptionForm from "components/SubscriptionForm";

import Admin from "layouts/Admin.js";

export default function Subscribe() {
  return (
    <>
	<div className="container mx-auto px-4 h-full">
            <div className="flex content-center items-center justify-center h-full">
              <div className="w-full px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <SubscriptionForm color="dark" />
        </div>
      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

    </>
  );
}
Subscribe.layout = Admin;
