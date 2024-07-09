import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const InstructorForm = () => {
    const [learn, setLearn] = useState("");
    const [requirements, setRequirements] = useState("");
    const [courseTarget, setCourseTarget] = useState("");
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/teach/instructorform', { email: user?.email, learn, requirements, courseTarget });
            if (res && res?.data?.success) {
                toast.success(res?.data?.message);
                navigate('/thankyou')
                // Update instructor status on successful submission
            } else if (!res.data.success) {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };
    return (
        <div className=''>
            <h1 className="text-xl font-bold text-gray-300">Intended learners</h1>

            <form className="card-body" onSubmit={handleSubmit}>

                <div className='grid gap-5'>
                    <div className="form-control">
                        <input
                            type="text"
                            placeholder="What will students learn in your course?"
                            className="input input-bordered"
                            name="learn"
                            value={learn}
                            onChange={(e) => setLearn(e.target.value)}
                            required
                        />
                    </div>


                    <div className="form-control">
                        <input
                            type="text"
                            placeholder="What are the requirements or prerequisites for taking your course?"
                            className="input input-bordered"
                            name="requirements"
                            value={requirements}
                            onChange={(e) => setRequirements(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-control">
                        <input
                            type="text"
                            placeholder="Who is this course for?"
                            className="input input-bordered"
                            name="courseTarget"
                            value={courseTarget}
                            onChange={(e) => setCourseTarget(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="form-control m-6">
                    <button className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default InstructorForm
