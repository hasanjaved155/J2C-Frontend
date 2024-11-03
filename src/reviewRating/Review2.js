import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Flex, Rate } from "antd";
const desc = ["terrible", "bad", "normal", "good", "wonderful"];

const Review2 = ({ id, setRie, width }) => {
    const [ratingValue, setRatingValue] = useState("");
    const [review, setReview] = useState("");
    const [flipped, setFlipped] = useState(false);
    const [sent, setSent] = useState(false);
    // const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [reviews, setReviews] = useState([]);

    const [rating, setRating] = useState(3);
    const user = JSON.parse(localStorage.getItem("user"));

    const hoverColors = ["red", "orange", "yellow", "chartreuse", "lime"];
    const emoticons = ["😡", "😟", "😐", "😊", "🥳"];
    const satisfactionTxt = [
        "Highly Unsatisfied",
        "Slightly Unsatisfied",
        "Feeling Indifferent",
        "Quite Satisfied",
        "Extremely Satisfied",
    ];

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setSent(true);
            // Make a POST request to your backend endpoint
            const res = await axios.post(`/review/${id}/reviews`, {
                username: user?.name,
                rating: rating,
                comment: comment,
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
            console.error("Error submitting review:", error);
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
            console.error("Error fetching reviews:", error);
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
                    stars.push(
                        <span key={i} className="text-yellow-400 ">
                            &#9733;
                        </span>
                    );
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
    };

    const getInitials = (name) => {
        if (!name) return "";

        const nameArray = name.split(" ");
        if (nameArray.length === 1) {
            return nameArray[0].slice(0, 1).toUpperCase();
        }

        return (
            nameArray[0]?.slice(0, 1).toUpperCase() +
            nameArray[1]?.slice(0, 1).toUpperCase()
        );
    };

    const reverseValue = (value) => 100 - value;

    const handleStarClick = (i) => {
        setRating(i + 1);
    };

    const handleInputChange = (e) => {
        let value = e.target.value === "" ? "" : parseFloat(e.target.value);
        if (value < 0) value = 0;
        if (value > 5) value = 5;
        setRating(value);
    };

    const userRating = {
        RatingValue: ratingValue,
        satisfaction: ratingValue
            ? satisfactionTxt[Math.min(Math.floor(ratingValue / 2 - 0.5), 4)]
            : "",
        review: review,
    };

    return (
        <div className="mt-3 px-14 mb-20 ">
            <h1 className="text-start font-semibold text-xl font-lato text-slate-700 mt-20 mb-6">
                Reviews
            </h1>
            <div
                className="grid sm:grid-cols-2 custom-1000:grid-cols-3 gap-8 mb-20 w-full"
            // style={{ width: width ? `${width}px` : "auto" }}
            >
                {reviews?.map((review, index) => (
                    <div key={index} className="h-full">
                        <div className="rounded-lg py-2 px-3 bg-zinc-100/90 border h-full">
                            <div className=" flex justify-between ">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full border bg-slate-800 border-black flex justify-center items-center text-2xl text-white">
                                        {/* <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" /> */}

                                        {getInitials(review?.username)}
                                    </div>
                                    <div className="flex flex-col justify-between items-start">
                                        <h2 className="text-lg">{review?.username}</h2>
                                        <h4 className="text-lg font-lato text-gray-600">
                                            {renderStars(review?.rating)}
                                            {/* {textRating(review?.rating)} */}
                                        </h4>
                                    </div>
                                </div>
                            </div>
                            <p className="text-lg text-start mt-3">{review?.comment}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="w-full mb-3 border-2 py-10  text-zinc-800 flex flex-col rounded-lg items-center">
                {/* <h1 className="text-3xl">Review & Rating</h1> */}

                <main className="flex-grow flex items-center justify-center">
                    {!sent ? (
                        <div
                            className={`relative rounded-lg  transform transition-transform duration-700 ${flipped ? "rotate-y-180" : ""
                                }`}
                        >
                            <div
                                className={`inset-0  rounded-lg  grid place-items-center ${flipped ? "hidden" : ""
                                    }`}
                            >
                                <h2 className="text-3xl mb-4 ">Please Rate Us</h2>
                                {/* <div className="text-xl mb-2">
                  {rating
                    ? emoticons[Math.min(Math.floor(rating / 2 - 0.5), 4)]
                    : " "}
                </div>
                <p className="mb-4">
                  {rating
                    ? satisfactionTxt[Math.min(Math.floor(rating / 2 - 0.5), 4)]
                    : " "}
                </p> */}
                                {/* <div className="relative flex items-center cursor-pointer user-select-none">
                  <div className="filled-stars text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 flex">
                    <span className="text-2xl">⭐</span>
                    <span className="text-2xl">⭐</span>
                    <span className="text-2xl">⭐</span>
                    <span className="text-2xl">⭐</span>
                    <span className="text-2xl">⭐</span>
                  </div>
                  <div
                    className="absolute inset-y-0 right-0 transition-width duration-300"
                    style={{ width: `${reverseValue(rating * 20)}%` }}
                  ></div>
                  <div className="absolute flex  justify-between">
                    {hoverColors.map((color, i) => (
                      <span
                        key={i}
                        className="text-3xl mr-[8.8px] cursor-pointer transition-colors duration-300"
                        style={{
                          color: rating >= i + 1 ? color : "transparent",
                          WebkitTextStroke:
                            rating >= i + 1 ? "none" : "0.5px gray",
                          opacity: "100%",
                        }}
                        onClick={() => handleStarClick(i)}
                      >
                        &#x2730;
                      </span>
                    ))}
                  </div>
                </div> */}
                                <Flex gap="middle" vertical >
                                    <Rate
                                        tooltips={desc}
                                        onChange={setRating}
                                        value={rating}
                                        className="text-2xl text-yellow-500"
                                        allowClear={false}
                                    />
                                    {rating ? <span className="text-xl">{desc[rating - 1]}</span> : null}
                                </Flex>
                                <input
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    max="10"
                                    value={rating}
                                    onChange={handleInputChange}
                                    className="mt-4 p-2  text-center text-lg outline-none transition-border duration-300 focus:border-lightBlue"
                                    placeholder="1 - 5"
                                />
                                <button
                                    onClick={() => setFlipped(true)}
                                    className="mt-6 px-4 py-2 text-xl bg-cyan-600 text-white rounded transition-shadow duration-300 hover:shadow-lg font-lato"
                                >
                                    Write Review
                                </button>
                            </div>
                            <div
                                className={` inset-0 rounded-lg  p-6 grid place-items-center ${flipped ? "block" : "hidden"
                                    }`}
                            >
                                <h2 className="text-2xl mb-4">Write Review</h2>
                                <p className=" text-center mb-3 w-84">
                                    Please share your thoughts about our course, so we can serve
                                    you better.
                                </p>
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    className="w-11/12 p-2 bg-transparent border-2 border-darkGray rounded-lg resize-none outline-none text-base text-whitesmoke transition-border duration-300 focus:border-lightBlue"
                                    placeholder="Write a review..."
                                ></textarea>
                                <button
                                    onClick={handleSubmit}
                                    className="mt-6 px-4 py-2 text-darkBlue font-semibold rounded-lg transition-shadow duration-300 hover:shadow-lg"
                                >
                                    Rate Us
                                </button>
                                <span
                                    onClick={() => setFlipped(false)}
                                    className=" text-lightBlue font-bold text-7xl cursor-pointer transition-transform duration-300 hover:scale-125"
                                >
                                    ⇦
                                </span>
                            </div>
                        </div>
                    ) : (
                        <div className="sent grid place-items-center">
                            <h2 className="text-2xl mb-4">Review Sent!</h2>
                            <p className="mb-4">Thank you for rating us.</p>
                            <button
                                onClick={() => {
                                    setSent(false);
                                    setComment("");
                                    setRating(0);
                                }}
                                className="mt-6 px-4 py-2 text-xl bg-cyan-600 text-white font-semibold rounded-lg transition-shadow duration-300 hover:shadow-lg"
                            >
                                Go Back
                            </button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Review2;