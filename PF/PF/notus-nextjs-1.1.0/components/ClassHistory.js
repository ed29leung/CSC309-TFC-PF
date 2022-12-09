import React, { useState, useEffect } from 'react';

const callRestApi = async (studio_id) => {
    const url = 'http://localhost:8000/classes/' + studio_id + '/schedule/';
    const response = await fetch(url);
    const jsonResponse = await response.json();
    console.log(jsonResponse)

    const arrayOfLists = jsonResponse.map(
        key => (
            <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 shadow-lg">
                <div className="flex-auto p-4">
                    <div className="flex flex-wrap">
                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                            <h6 className="font-semibold text-blueGray-700">{key.classtime.time}</h6>
                            <small className="font-semibold text-blueGray-400">{key.class_detail}</small>
                        </div>
                    </div>
                </div>
            </div>
        )
    )
    return arrayOfLists;
};

const ClassHistory = ({ studio_id }) => {
    const [apiResponse, setApiResponse] = useState('');

    useEffect(() => {
        callRestApi(studio_id).then(
            (res) => setApiResponse(res)
        );
    }, [studio_id]);

    return (
        <>
            {apiResponse}
        </>
    );
}

export default ClassHistory;