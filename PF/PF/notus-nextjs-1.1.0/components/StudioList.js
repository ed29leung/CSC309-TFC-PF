import React, { useState, useEffect } from 'react';

// code from https://dev.to/will_yama/react-rest-api-how-to-render-a-list-from-a-json-response-4964
const callRestApi = async (pos, updateStudios, filter) => {
	if (pos === '') {
		return null
	}
	// process position string
	const clean_pos = pos.split(" ").join("").slice(1, -1)
	
	// process params if they exist
	var params = '?'
	if (filter.query !== '') {
		params = params + 'search=' + filter.query
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
		params = params.slice(0, -1)
	}



	const url = 'http://localhost:8000/studios/list/' + clean_pos + params
    const response = await fetch(url);
    const jsonResponse = await response.json();
	const arrayOfLists = jsonResponse.results.map(
      key => (	<div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 shadow-lg">
			<div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
        <div className="flex-auto p-4">
          <div className="flex flex-wrap">
            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
		<h6 className="font-semibold text-blueGray-700">{key.address} - {key.name}</h6>
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



function StudioList({ pos, updateStudios }) {
		
	const [apiResponse, setApiResponse] = useState('');
	const [filter, setFilter] = useState({
		query: '',
		name: '',
		amenities: '',
		classes: '',
		coach: '' });

  useEffect(() => {
      callRestApi(pos, updateStudios, filter).then(
          result => setApiResponse(result));
  },[pos]);

	function handle(e){
		const newFilter={...filter}
		newFilter[e.target.id] = e.target.value
		setFilter(newFilter)
	}

	return(
	<>
	<div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 shadow-lg">

			<div className="relative flex flex-col min-w-0 break-words rounded shadow-lg">
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
		<h5 className="text-blueGray-400 uppercase font-bold text-xs m-1 w-full">
                Or Filter By:
              </h5>

		<div className="grid rpace-4 grid-cols-2 w-full">
		<div>
              <input
                type="text"
                placeholder="Studio Name"
		id="name"
                className="border-0 px-3 py-3 placeholder-blueGray-400 text-blueGray-600 relative bg-white bg-white rounded text-sm outline-none focus:outline-none focus:ring w-full pl-10 "
		value={filter.name}
		onChange={(e) => handle(e)}
              />
		</div>
		<div>
              <input
                type="text"
                placeholder="Studio Amenities"
		id="amenities"
                className="border-0 px-3 py-3 placeholder-blueGray-400 text-blueGray-600 relative bg-white bg-white rounded text-sm outline-none focus:outline-none focus:ring w-full pl-10 "
		value={filter.amenities}
		onChange={(e) => handle(e)}
              />
		</div>
              <input
                type="text"
                placeholder="Studio Class Name"
		id="classes"
                className="border-0 px-3 py-3 placeholder-blueGray-400 text-blueGray-600 relative bg-white bg-white rounded text-sm outline-none focus:outline-none focus:ring w-5/12 pl-10 "
		value={filter.classes}
		onChange={(e) => handle(e)}
              />
              <input
                type="text"
                placeholder="Coach Name"
		id="coach"
                className="border-0 px-3 py-3 placeholder-blueGray-400 text-blueGray-600 relative bg-white bg-white rounded text-sm outline-none focus:outline-none focus:ring w-5/12 pl-10 "
		value={filter.coach}
		onChange={(e) => handle(e)}
              />
		</div>
            </div>
          </form>
            </div>


	  	</div>
		{apiResponse}
	</>
	)
}
export default StudioList;
