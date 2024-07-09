import React, { Fragment } from 'react'
import ListName from './ListName';
// import { useState } from 'react';
// import { useEffect } from 'react';

const CourseDetails = ({ listobject, setRie }) => {
    // const [valid, setValid] = useState(false);
    // const user = JSON.parse(localStorage.getItem("user"));

    // useEffect(() => {
    //     if (user?.employeeId) {
    //         setValid(true);
    //     } else {
    //         setValid(false);
    //     }
    // }, [])

    return (
        <Fragment>
            <div >
                <ListName
                    courseName={listobject?.courseName}
                    FOLDER_ID={listobject?.folderId}
                    role={listobject?.role}
                    id={listobject?._id}
                    setRie={setRie}
                />
            </div>
        </Fragment>
    )
}

export default CourseDetails
