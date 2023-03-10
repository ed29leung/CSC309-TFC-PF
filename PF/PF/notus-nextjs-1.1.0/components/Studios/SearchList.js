import React, { useState, useEffect } from 'react';
import Link from "next/link";

// code from https://dev.to/will_yama/react-rest-api-how-to-render-a-list-from-a-json-response-4964
const callRestApi = async (pos, updateStudios, filter, pgOffset, setTotal) => {
	if (pos === '') {
		return null
	}
	// process position string
	const clean_pos = pos.split(" ").join("").slice(1, -1)
	
	// process params if they exist
	var params = ''
	if (filter.query !== '') {
		params = params + 'search=' + filter.query + '&'
	} else {
		if (filter.name !== '') {
			params = params + 'name=' + filter.name + '&'
		} 
		if (filter.amenities !== '') {
			params = params + 'amenities__amenity_type=' + filter.amenities + '&'
		} 
		if (filter.classes !== '') {
			params = params + 'tfc_class__name=' + filter.classes + '&'
		} 
		if (filter.coach !== '') {
			params = params + 'tfc_class__coach=' + filter.coach + '&'
		}
	}



	const url = 'http://localhost:8000/studios/search/?' + params + `limit=${perPage}&offset=${pgOffset}`
	console.log(url)
    const response = await fetch(url);
    const jsonResponse = await response.json();
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
		<a className="font-semibold text-blueGray-700"><h6>{key.name} - {key.address}</h6></a>
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



function StudioList({ pos, updateStudios }) {
		
	const [apiResponse, setApiResponse] = useState('');
	const [filter, setFilter] = useState({
		query: '',
		name: '',
		amenities: '',
		classes: '',
		coach: '' });
	const [pgOffset, setPgOffset] = useState(0);
	    const [total, setTotal] = useState(0);




  useEffect(() => {
      callRestApi(pos, updateStudios, filter, pgOffset, setTotal).then(
          result => setApiResponse(result));
  },[pos, filter, pgOffset]);

	function handle(e){
		const newFilter={...filter}
		newFilter[e.target.id] = e.target.value
		setFilter(newFilter);
		setPgOffset(0);
	}

	return(
	<>
	<div className="relative flex flex-row min-w-0 w-full break-words rounded mb-6 ">
	<div className="relative flex flex-col p-4 min-w-0 w-6/12 break-words rounded mb-6 ">

			<div className="relative flex flex-col min-w-0 break-words rounded bg-white shadow-lg">
		          <form className="relative flex mb-6 xl:mb-0">
            <div className="relative flex w-full flex-wrap items-stretch">
              <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                <i className="fas fa-search"></i>
              </span>
              <input
                type="text"
                placeholder="Search here..."
		id="query"
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
		value={filter.query}
		onChange={(e) => handle(e)}
              />
		<div className="flex-col w-full">
		<h5 className="text-blueGray-400 uppercase font-bold text-xs m-1 w-full">
                Or Filter By:
              </h5>

		<div className="grid rpace-4 grid-cols-2 w-full">
		<div className="p-1">
              <input
                type="text"
                placeholder="Studio Name"
		id="name"
                className="border-0 px-3 py-3 placeholder-blueGray-400 text-blueGray-600 relative bg-white bg-white rounded text-sm outline-none focus:outline-none focus:ring w-full pl-10 "
		value={filter.name}
		onChange={(e) => handle(e)}
              />
		</div>
		<div className="p-1">
              <input
                type="text"
                placeholder="Studio Amenities"
		id="amenities"
                className="border-0 px-3 py-3 placeholder-blueGray-400 text-blueGray-600 relative bg-white bg-white rounded text-sm outline-none focus:outline-none focus:ring w-full pl-10 "
		value={filter.amenities}
		onChange={(e) => handle(e)}
              />
		</div>
		<div className="p-1">
              <input
                type="text"
                placeholder="Studio Class Name"
		id="classes"
                className="border-0 px-3 py-3 placeholder-blueGray-400 text-blueGray-600 relative bg-white bg-white rounded text-sm outline-none focus:outline-none focus:ring w-full pl-10 "
		value={filter.classes}
		onChange={(e) => handle(e)}
              />
		</div>
		<div className="p-1">
              <input
                type="text"
                placeholder="Coach Name"
		id="coach"
                className="border-0 px-3 py-3 placeholder-blueGray-400 text-blueGray-600 relative bg-white bg-white rounded text-sm outline-none focus:outline-none focus:ring w-full pl-10 "
		value={filter.coach}
		onChange={(e) => handle(e)}
              />
		</div>
		</div>
            </div>
		</div>
          </form>
            </div>


	  	</div>
	<div className="relative flex p-4 flex-col min-w-0 w-6/12 break-words rounded mb-6 ">
		{apiResponse}
		  <div>
		    {pgOffset > 0 ? 
        <button className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-6 py-3 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" 
            type="button"
            onClick={() => setPgOffset(Math.max(0, pgOffset - perPage))}> prev </button> : <></>}
    { pgOffset < (total - perPage) ? 
        <button className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-6 py-3 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => setPgOffset(pgOffset + perPage)}> next </button> : <></>}
		</div>
	  	</div>
	  	</div>
	</>
	)
}
export default StudioList;
