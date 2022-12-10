import React from "react";
import ClassList from "components/ClassList";
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

import Auth from "layouts/Auth.js";

export default function Upcoming() {
    const router = useRouter()
    const { studio_id } = router.query


    return (
        <>
            <div className="flex flex-wrap mt-4">
                <div className="w-full mb-12 px-4">
                    <ClassList
                        studio_id={studio_id}
                    />
                </div>
            </div>
        </>
    );
}

Upcoming.layout = Auth;
