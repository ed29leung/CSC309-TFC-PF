import React from "react";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import GenericHeader from "components/Headers/GenericHeader.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

export default function Admin({ children }) {
  return (
    <>
	  {/* <Sidebar /> */}
      <div className="relative ">
        <AdminNavbar />
        {/* Header */}
        <GenericHeader />
        <div className="px-4 md:px-10 mx-auto w-full" style={{marginTop: "-10em"}}>
          {children}
        </div>
      </div>
	  {/*
          <FooterAdmin />
	  */}
    </>
  );
}
