import { Router } from 'next/router';
import React, { useState, useEffect } from 'react';
import authHeader from 'services/authHeader';
import Link from 'next/link';
import ClassActionButtom from './ClassActionButtom';


const callRestApi = async (studio_id) => {
    const url = 'http://localhost:8000/classes/' + studio_id + '/schedule/';
    const auth = authHeader();
    if (auth === null) {
        Router.push('accounts/login/');
    }
    const response = await fetch(url, {
        method: 'GET',
        headers: {'Content-Type': 'application/json', 'Authorization': auth}
    });
    const jsonResponse = await response.json();
    console.log(jsonResponse)

    if (jsonResponse.count !== 0) {
        // need to render username, class time, class name, class description, coach name
        const arrayOfLists = jsonResponse.results.map(
            key => (
                <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 shadow-lg">
                    <div className="flex-auto p-4">
                        <div className="flex flex-wrap">
                            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                <h6 className="font-semibold text-blueGray-700">
                                    {key.class_detail.name
                                        + ' - ' + key.class_detail.coach}
                                </h6>
                                <span className="font-semibold text-xl text-blueGray-700">
                                    {key.classtime.time}
                                </span>

                                <p className="mt-2 mb-4 text-blueGray-500">
                                    {key.class_detail.description}
                                </p>

                                <ClassActionButtom timeid={key.classtime.id} op='drop' />

                            </div>
                        </div>
                    </div>
                </div>

            )
        )
        return arrayOfLists;
    }
    else {
        return (
            // notice the user that there are no classes to show
            // redirect to the studio page
            <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 shadow-lg">
                <div className="flex-auto p-4">
                    <div className="flex flex-wrap">
                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                            <h6 className="font-semibold text-blueGray-700">You haven't enroll any classe yet.</h6>
                            <Link href="/classes/[studio_id]/upcoming" as={`/classes/${studio_id}/upcoming`}>
                                <a className="font-semibold text-blueGray-400">Click here to enroll some class</a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

const ClassHistory = ({ studio_id }) => {
    const [apiResponse, setApiResponse] = useState('');

    // response might be an array
    useEffect(() => {
        callRestApi(studio_id).then(response => setApiResponse(response));
    }, [studio_id]);

    return (
        <div className="flex flex-wrap">
            <div className="w-full mb-12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-100 border-0">
                    <div className="rounded-t bg-white mb-0 px-6 py-6">
                        <div className="text-center flex justify-between">
                            <h6 className="text-blueGray-700 text-xl font-bold">Class History</h6>
                        </div>
                    </div>
                    <div className="block w-full overflow-x-auto">
                        {apiResponse}
                    </div>
                </div>
            </div>
        </div>
    );
};


export default ClassHistory;