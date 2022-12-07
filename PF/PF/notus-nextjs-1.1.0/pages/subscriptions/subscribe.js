import React from "react";

import SubscriptionForm from "components/SubscriptionForm";

import Admin from "layouts/Admin.js";

export default function Subscribe() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <SubscriptionForm color="dark" />
        </div>
      </div>
    </>
  );
}
// Subscribe.layout = Admin;