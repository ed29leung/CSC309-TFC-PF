import React, { useState, useEffect } from 'react';
import Link from "next/link";


const callRestApi = async (studio_id, filter) => {
   // process filter params if they exist
   // example: http://127.0.0.1:8000/classes/1/upcoming/?classid__name=1&classid__coach=1&classid__duration=1&time=1

    var params = '?'
    if (filter.name !== '') {
        params = params + 'classid__name=' + filter.name + '&'
    }
    if (filter.coach !== '') {
        params = params + 'classid__coach=' + filter.coach + '&'
    }
    if (filter.duration !== '') {
        params = params + 'classid__duration=' + filter.duration + '&'
    }
    if (filter.time !== '') {
        params = params + 'time=' + filter.time + '&'
    }
    params = params.slice(0, -1)

    const url = 'http://localhost:8000/classes/' + studio_id + '/upcoming/' + params
    const response = await fetch(url);
    const jsonResponse = await response.json();
    console.log(jsonResponse)

    const arrayOfLists = jsonResponse.results.map(
        key => (
            <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 shadow-lg">
                <div className="flex-auto p-4">
                    <div className="flex flex-wrap">
                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                            
                                <a>
                                    <h3 className="text-blueGray-400 uppercase font-bold text-xs">
                                        {key.class_detail.name
                                            + ' - ' + key.class_detail.coach}
                                    </h3>
                                </a>
                                
                            <span className="font-semibold text-xl text-blueGray-700">
                                {key.time}
                            </span>

                            <p className="mt-2 mb-4 text-blueGray-500">
                                {key.class_detail.description}
                            </p>

                            <button className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                >
                                <i className="fas fa-heart"></i> Enroll
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    )
    return arrayOfLists;
}

    // example response:
    // {
    //     "count": 3,
    //     "next": null,
    //     "previous": null,
    //     "results": [
    //       {
    //         "id": 3,
    //         "time": "2022-12-14T12:38:35-05:00",
    //         "spotleft": 5,
    //         "class_detail": {
    //           "name": "sleep",
    //           "description": "tired",
    //           "coach": "me",
    //           "keywords": []
    //         }
    //       },
    //       {
    //         "id": 4,
    //         "time": "2022-12-21T12:38:35-05:00",
    //         "spotleft": 5,
    //         "class_detail": {
    //           "name": "sleep",
    //           "description": "tired",
    //           "coach": "me",
    //           "keywords": []
    //         }
    //       },
    //       {
    //         "id": 5,
    //         "time": "2022-12-28T12:38:35-05:00",
    //         "spotleft": 5,
    //         "class_detail": {
    //           "name": "sleep",
    //           "description": "tired",
    //           "coach": "me",
    //           "keywords": []
    //         }
    //       }
    //     ]
    //   }

const ClassList = ({ studio_id }) => {
    const [apiResponse, setApiResponse] = useState('');
    const [filter, setFilter] = useState({
        name: '',
        coach: '',
        duration: '',
        time: '' });

    useEffect(() => {
        callRestApi(studio_id, filter).then(
            res => setApiResponse(res)
        );
    }
    , [studio_id]);

    function handle(e){
		const newFilter={...filter}
		newFilter[e.target.id] = e.target.value
		setFilter(newFilter)
        console.log(newFilter)
	}

    return (
        <>
            <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-100 border-0">
                        <div className="rounded-t bg-white mb-0 px-6 py-6">
                            <div className="text-center flex justify-between">
                                <h6 className="text-blueGray-700 text-xl font-bold">Filter Classes</h6>
                            </div>
                        </div>
                        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                            <form>
                                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                    Class Name
                                </h6>
                                <div className="flex flex-wrap">
                                    <div className="w-full lg:w-12/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <input type="text" id="name" onChange={(e)=>handle(e)} className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="Class Name" value={filter.name} />
                                        </div>
                                    </div>
                                </div>
                                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                    Coach
                                </h6>
                                <div className="flex flex-wrap">
                                    <div className="w-full lg:w-12/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <input type="text" id="coach" onChange={(e)=>handle(e)} className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="Coach" value={filter.coach} />
                                        </div>
                                    </div>
                                </div>
                                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                    Duration
                                </h6>
                                <div className="flex flex-wrap">
                                    <div className="w-full lg:w-12/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <input type="text" id="duration" onChange={(e)=>handle(e)} className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="Duration" value={filter.duration}/>
                                        </div>
                                    </div>
                                </div>
                                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                    Time
                                </h6>
                                <div className="flex flex-wrap">
                                    <div className="w-full lg:w-12/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <input type="text" id="time" onChange={(e)=>handle(e)} className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="Time" value={filter.time}/>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-100 border-0">
                        <div className="rounded-t bg-white mb-0 px-6 py-6">
                            <div className="text-center flex justify-between">
                                <h6 className="text-blueGray-700 text-xl font-bold">Upcoming Classes</h6>
                            </div>
                        </div>
                        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                            {apiResponse}
                        </div>
                    </div>
                </div>                                                                        
            </div>
        </>
    )
}

export default ClassList;