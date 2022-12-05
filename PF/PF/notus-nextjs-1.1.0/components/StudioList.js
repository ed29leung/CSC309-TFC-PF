import React, { useState, useEffect } from 'react';

// code from https://dev.to/will_yama/react-rest-api-how-to-render-a-list-from-a-json-response-4964
const callRestApi = async (pos) => {
	if (pos === '') {
		return null
	}
	// process position string
	const clean_pos = pos.split(" ").join("").slice(1, -1)

	const url = 'http://localhost:8000/studios/list/' + clean_pos
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
    return arrayOfLists;
};

function StudioList({ pos }) {
		
	const [apiResponse, setApiResponse] = useState('');

  useEffect(() => {
      callRestApi(pos).then(
          result => setApiResponse(result));
  },[pos]);


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
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
              />
		<p>TODO: filters</p>
            </div>
          </form>
            </div>


	  	</div>
		{apiResponse}
	</>
	)
}
export default StudioList;
