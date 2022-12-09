import React, { useState, useEffect } from 'react';
import Link from "next/link";

// code from https://dev.to/will_yama/react-rest-api-how-to-render-a-list-from-a-json-response-4964
const callRestApi = async (pos, updateStudios, pgOffset, setTotal) => {
	if (pos === '') {
		return null
	}
	// process position string
	const clean_pos = pos.split(" ").join("").slice(1, -1)
	
	const url = 'http://localhost:8000/studios/list/' + clean_pos + `?limit=${perPage}&offset=${pgOffset}`
	console.log(url)
    const response = await fetch(url);
    const jsonResponse = await response.json();
	console.log(jsonResponse);
	setTotal(jsonResponse.count);
	const arrayOfLists = jsonResponse.results.map(
      key => (	<div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 shadow-lg">
			<div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
        <div className="flex-auto p-4">
          <div className="flex flex-wrap">
            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
	      <Link href={{
            pathname: '/studios/[id]',
            query: { id: key.id },
          }}>
		<a className="font-semibold text-blueGray-700"><h6>{key.address} - {key.name}</h6></a>
	      </Link>
		<small className="font-semibold text-blueGray-400">{key.phone_number}</small>
		</div>
		</div>
		</div>
		</div>
		</div>
      )
    )
	const studio_coords = jsonResponse.results.map(
		key => [key.latitude, key.longitude, key.name])
    updateStudios(studio_coords);
    return arrayOfLists;
};

const perPage = 4;



function MapList({ pos, updateStudios, pgOffset, setPgOffset }) {
		
	const [apiResponse, setApiResponse] = useState('');
	const [filter, setFilter] = useState({
		query: '',
		name: '',
		amenities: '',
		classes: '',
		coach: '' });
	    const [total, setTotal] = useState(0);




  useEffect(() => {
      callRestApi(pos, updateStudios, pgOffset, setTotal).then(
          result => setApiResponse(result));
  },[pos, filter, pgOffset]);

	function handle(e){
		const newFilter={...filter}
		newFilter[e.target.id] = e.target.value
		setFilter(newFilter)
	}

	return(
	<>
		{apiResponse}

		    {pgOffset > 0 ? 
        <button className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-6 py-3 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" 
            type="button"
            onClick={() => setPgOffset(Math.max(0, pgOffset - perPage))}> prev </button> : <></>}
    { pgOffset < (total - perPage) ? 
        <button className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-6 py-3 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => setPgOffset(pgOffset + perPage)}> next </button> : <></>}
	</>
	)
}
export default MapList;
