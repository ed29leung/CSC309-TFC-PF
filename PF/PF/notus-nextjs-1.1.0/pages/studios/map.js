import React, {useState} from "react";
import { render } from 'react-dom';
import Link from "next/link";


// components

import Map from "components/Studios/Map.js";
import MapList from "components/Studios/MapList.js";

// layout for page

import Admin from "layouts/Admin.js";

var coords = ""

function handleCoordChange() {
	coords = coords	
}

export default function Maps() {
	const [pos, setPos] = React.useState('(43.6426, -79.3871)');
	//const [studios, updateStudios] = React.useState('');
	const studiosRef = React.useRef();
	const [studios, setStudios] = React.useState('');
	const [pgOffset, setPgOffset] = useState(0);

	function updateStudios(new_studios) {
		studiosRef.current = new_studios;
	}
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-6/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
	<div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
        <div className="flex-auto p-4">
          <div className="flex flex-wrap">
            <div className="relative w-6/12 pr-4 max-w-full flex-grow flex-1">

              <span className="font-semibold text-xl text-blueGray-700">
	  		<h1> STUDIOS </h1>
	  	</span>
	                <h5 className="text-blueGray-400 uppercase font-bold text-xs absolute bottom-0">
                Drop a pin to get started.
              </h5>

	  	</div>
            <div className="relative w-6/12 p-4 max-w-full flex-grow justify-end flex-1">
	  	<div className="float-right">
			  	<Link href="/studios/search">
                <a
                  className="get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-orange-500 active:bg-blueGray-500 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                >
                  Or Search...
                </a>
	  	</Link>


	  	</div>
	  	</div>
	  	</div>
	  	</div>
	  	</div>

	  </div>
	  	<MapList
	  		pos={pos}
	  		updateStudios={updateStudios}
	  		pgOffset={pgOffset}
	  		setPgOffset={setPgOffset}
	  	/>
	</div>
        <div className="w-6/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <Map
	  	setPos={setPos}
	  	studios={studiosRef}
	  	setPgOffset={setPgOffset}
	  	/>
          </div>
        </div>
      </div>
    </>
  );
}

Maps.layout = Admin;
