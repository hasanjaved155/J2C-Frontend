import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import toast from 'react-hot-toast';

const Review = ({ id, setRie }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [reviews, setReviews] = useState([]);


    const user = JSON.parse(localStorage.getItem("user"));

    const getInitials = (name) => {
        if (!name) return '';

        const nameArray = name.split(' ');
        if (nameArray.length === 1) {
            return nameArray[0].slice(0, 1).toUpperCase();
        }

        return nameArray[0]?.slice(0, 1).toUpperCase() + nameArray[1]?.slice(0, 1).toUpperCase();
    };


    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            // Make a POST request to your backend endpoint
            const res = await axios.post(`/review/${id}/reviews`, {
                username: user?.name,
                rating: rating,
                comment: comment
            });
            if (res && res?.data?.success) {
                toast.success(res.data.message);
                // Refresh reviews after successful submission
                fetchReviews();
            }

            // Reset form fields after successful submission
            // setRating(0);
            // setComment('');
        } catch (error) {
            // Handle errors if any
            console.error('Error submitting review:', error);
        }
    };

    const fetchReviews = async () => {
        try {
            const res = await axios.get(`/review/${id}/reviews`);
            if (res && res?.data?.success) {
                setReviews(res?.data?.reviews);
                setRie(res?.data?.averageRating);
            }
        } catch (error) {
            // Handle errors if any
            console.error('Error fetching reviews:', error);
        }
    };

    useEffect(() => {
        // Fetch reviews when component mounts
        fetchReviews();
    }, []);


    const renderStars = (count) => {
        const roundedCount = Math.ceil(count); // Round up to the nearest integer
        const stars = [];

        if (roundedCount === 0) {
            // If count is 0, show 5 empty stars
            for (let i = 0; i < 5; i++) {
                stars.push(<span key={i}>&#9734;</span>);
            }
        } else {
            // Show stars according to the rounded count
            for (let i = 0; i < 5; i++) {
                if (i < roundedCount) {
                    stars.push(<span key={i} className="text-yellow-400 ">&#9733;</span>);
                } else {
                    stars.push(<span key={i}>&#9734;</span>);
                }
            }
        }

        return stars;
    };

    const textRating = (count) => {
        if (count === 5) {
            return "Excellent";
        } else if (count < 5 && count >= 4) {
            return "Very Good";
        } else if (count < 4 && count >= 3) {
            return "Good";
        } else if (count < 3 && count >= 2) {
            return "Average";
        } else {
            return "Critical";
        }
    }

    return (

        <div className='flex justify-around mt-12'>

            <div>
                <h2 className="font-bold text-xl mb-2">Product Review</h2>
                <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-6 m-4">

                    {/* Star rating component */}
                    <div className="flex items-center mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                className={`text-2xl cursor-pointer ${star <= rating ? 'text-yellow-500' : 'text-gray-300'
                                    }`}
                                onClick={() => handleRatingChange(star)}
                            >
                                ★
                            </span>
                        ))}
                        <span className="ml-2">{rating} stars</span>
                    </div>
                    {/* Comment textarea */}
                    <form onSubmit={handleSubmit}>
                        <textarea
                            className="border rounded-lg p-2 w-full"
                            placeholder="Write your comment..."
                            value={comment}
                            onChange={handleCommentChange}
                        />

                        {/* Submit button */}
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
            {/* Display reviews */}
            <div className="carousel w-[70%]">
                {reviews?.map((review, index) => (
                    <div>
                        <div className="bg-base-200 mr-5 h-56 w-80 shadow-xl rounded-lg p-6">

                            <div className="avatar flex justify-evenly ">
                                <div className="w-16 h-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    {/* <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" /> */}

                                    <div className="text-2xl absolute px-4 py-3">
                                        {getInitials(review?.username)}
                                    </div>
                                </div>
                                <h2 className="card-title">{review?.username}</h2>
                            </div>

                            <div key={index} className="card-body flex items-start">

                                <h4 className="text-base text-gray-600">{textRating(review?.rating)} {renderStars(review?.rating)}</h4>
                                <p>{review?.comment}</p>

                            </div>

                        </div>
                    </div>
                ))}

            </div>

        </div>


    );
};

export default Review;
