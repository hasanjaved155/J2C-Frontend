import axios from 'axios';
import React, { useEffect, useState } from 'react'

const HelpDesk = () => {

    const [help, setHelp] = useState([]);

    const getAllHelpDesk = async () => {
        try {
            const { data } = await axios.get('/help/all-help')
            if (data?.success) {
                setHelp(data?.help)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllHelpDesk();
    }, [])


    return (
        <div
            className=" ml-24 -translate-y-6"
            style={{ marginLeft: "80px", marginTop: "1.5rem" }}>
            <div className="indicator" style={{ marginRight: "800px" }}>
                <span className="indicator-item badge badge-secondary">
                    {help?.length}
                </span>
                <button className="btn">Help</button>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Help Desk</h1>
            <div>
                <div
                    className="overflow-x-auto overflow-scroll"
                    style={{ height: "22rem", width: "52rem" }}>
                    <table className="table table-xs table-pin-rows table-pin-cols">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email_Id</th>
                                <th>Message</th>
                                <th></th>
                            </tr>
                        </thead>
                        {help?.map((user) => (
                            <tbody>
                                {/* row 1 */}
                                <tr>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar placeholder">
                                                <div className="bg-gray-500 text-neutral-content rounded-full w-10">
                                                    <span className="text-xl">
                                                        {(user?.firstName && user?.firstName.slice(0, 1) + user?.lastName.slice(0, 1))}
                                                    </span>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{user?.firstName && user?.firstName + " " + user?.lastName}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {user?.email}
                                        <br />
                                    </td>
                                    <th>
                                        <button className="btn btn-ghost btn-xs">{user?.message}</button>
                                    </th>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                </div>
            </div>
        </div>
    )
}

export default HelpDesk
