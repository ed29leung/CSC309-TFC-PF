import React, { useEffect } from "react";
import ClassHistory from "components/ClassHistory";
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import authHeader from "services/authHeader";

import Admin from "layouts/Admin.js";

toast.configure();


export default function Upcoming() {
    const router = useRouter()
    const { studio_id } = router.query
    
    useEffect(() => {
        const auth = authHeader();
        if (!auth){
            router.push("/unauthorized");
            console.log("not logged in")
        }
    }, [])


    return (
        <>
            <div className="flex flex-wrap mt-4">
                <div className="w-full mb-12 px-4">
                    <ClassHistory
                        studio_id={studio_id}
                    />
                </div>
            </div>
        </>
    );
}
Upcoming.layout = Admin;
