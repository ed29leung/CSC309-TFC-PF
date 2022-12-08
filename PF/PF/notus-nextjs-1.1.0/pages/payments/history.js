import React from "react";
import PaymentHistory from "components/PaymentHistory";

export default function Subscribe() {
    return (
      <>
        <div className="flex flex-wrap mt-4">
          <div className="w-full mb-12 px-4">
            <PaymentHistory color="dark" />
          </div>
        </div>
      </>
    );
  }