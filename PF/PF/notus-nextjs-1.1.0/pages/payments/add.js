import React from "react";
import PaymentForm from "components/PaymentForm";

import Auth from "layouts/Auth.js";

export default function AddPayment() {
    return (
        <>
          <div className="container mx-auto px-4 h-full">
            <div className="flex content-center items-center justify-center h-full">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <PaymentForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
}

AddPayment.layout = Auth;
