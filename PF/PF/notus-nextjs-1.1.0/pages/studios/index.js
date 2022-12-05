import React from "react";
import { render } from 'react-dom';


// components

import Map from "components/Maps/Map.js";
import StudioList from "components/StudioList.js";

// layout for page

import Admin from "layouts/Admin.js";

var coords = ""

function handleCoordChange() {
	coords = coords	
}

export default function Maps() {
	const [pos, updatePos] = React.useState('');
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-6/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
	<div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
        <div className="flex-auto p-4">
          <div className="flex flex-wrap">
            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">

              <span className="font-semibold text-xl text-blueGray-700">
	  		<h1> STUDIOS </h1>
	  	</span>
	                <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                Drop a pin to get started.
              </h5>

	  	</div>
	  	</div>
	  	</div>
	  	</div>

	  </div>
	  	<StudioList
	  		pos={pos}
	  	/>
	</div>
        <div className="w-6/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <Map
	  	updatePos={updatePos}
	  	/>
          </div>
        </div>
      </div>
    </>
  );
}

Maps.layout = Admin;
