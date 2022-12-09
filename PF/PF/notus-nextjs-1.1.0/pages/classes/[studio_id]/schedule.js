import React from "react";
import ClassHistory from "components/ClassHistory";
import { useRouter } from 'next/router'


export default function Upcoming() {
    const router = useRouter()
    const { studio_id } = router.query

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
