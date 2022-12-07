import { useRouter } from 'next/router'
import Admin from "layouts/Admin.js";
import React, { useState, useEffect } from 'react';

const ClassListApi = async (studio_id) => {
    if (studio_id === '') {
        return null
    }
    
    const url = 'http://localhost:8000/classes/' + studio_id + '/upcoming/'
    const response = await fetch(url);
    const jsonResponse = await response.json();
    console.log(jsonResponse)
    if (jsonResponse.count === 0) {
        return (	<div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 ">
            <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 ">
        <div className="flex-auto p-4">
            <div className="flex flex-wrap">
            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
            <p className="font-semibold text-xl text-blueGray-400"> no classes to show. </p>
            {/*
            <small className="font-semibold text-blueGray-400">{key.phone_number}</small>
            */}
            </div>
            </div>
            </div>
            </div>
            </div>
        )

    }

    return jsonResponse
}

const get = () => {
    const router = useRouter()
    const [classes, setClasses] = useState(
        {
            'id': '',
            'time': '',
            'spotleft': '',
            'class_detail': {
                'name': '',
                'description': '',
                'coach': '',
                'keywords': '',
            },
        }
    );
    const { studio_id } = router.query
    useEffect(() => {
        ClassListApi(studio_id).then((data) => {
            setClasses(data)
        })
    }  
    , [studio_id])

        return (
            <>
<div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 shadow-lg">
			<div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
        <div className="flex-auto p-4">
          <div className="flex flex-wrap">
            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
		<h1 className="font-semibold text-4xl text-blueGray-700">test - test</h1>
		<p className="font-semibold text-xl text-blueGray-400">Phone: test Postal Code: test</p>
		</div>
		</div>
		</div>
		</div>
		</div>
        </>
        )

}

get.layout = Admin;
export default get;