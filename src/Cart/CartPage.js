import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../Contexts/CartContext";
import { motion, AnimatePresence } from "framer-motion";
// Adjust the import path according to your file structure

const CartPage = () => {
    const { cart, fetchCartDetails, cartLength, removeCart } = useCart();
    const [clickedIndex, setClickedIndex] = useState(null);
    const [showRemoveButton, setShowRemoveButton] = useState(false);
    const [selectedCart, setSelectedCart] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCartDetails();
    }, []);

    const handleSize = (index) => {
        setClickedIndex((prevIndex) => (prevIndex === index ? null : index));
        setShowRemoveButton(false);
        setTimeout(() => {
            setShowRemoveButton(true);
        }, 500);
    };

    const handleCheckout = (selectedCart) => {
        setSelectedCart((prevState) => (prevState ? null : selectedCart));
        setClickedIndex(null);
    };

    return (
        <div className="px-10 py-10 bg-white">
            <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl text-zinc-800 text-left font-lato">
                Shopping Cart
            </h1>
            <h1 className="font-semibold text-sm sm:text-base md:text-lg text-zinc-700 my-4 text-left">
                {cart.length} items in the cart
            </h1>
            <div className="mt-6 w-full justify-between flex flex-col gap-y-10 custom-mid:flex-row  custom-mid:space-x-20">
                <div className="w-full sm:grow">
                    {cart.length > 0 ? (
                        cart.map((item, index) => (
                            <AnimatePresence>
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <div
                                        key={item._id}
                                        className="flex border-t border-zinc-300 py-3"
                                    >
                                        <img
                                            src={item.image}
                                            alt="banner"
                                            className="h-[40px] sm:h-[50px] md:h-[70px]"
                                            loading="lazy"
                                        />
                                        <div className="flex justify-between items-start grow pl-4">
                                            <div className="w-full mr-3 flex flex-col justify-between h-full">
                                                <div className="flex flex-col md:flex-row md:items-center">
                                                    <div>
                                                        <p className="text-lg font-bold mb-1 text-left">
                                                            {item.name}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex space-x-2 items-start">
                                                    <div className="font-bold text-xs sm:text-sm text-amber-950">
                                                        {item.rating}
                                                    </div>
                                                    {/* <Rating rating={item.rating} /> */}
                                                </div>
                                                <div className="flex flex-col items-start custom-420:flex-row text-sm text-zinc-500 gap-2 font-lato">
                                                    {/* <h1>{item.hours} total hours</h1> */}
                                                    <h1>44 total hours</h1>

                                                    <h1 className="font-bold hidden custom-420:block">•</h1>
                                                    {/* <h1>{item.lectures} lectures</h1> */}
                                                    <h1>30 lectures</h1>
                                                </div>
                                            </div>
                                            <div className="flex flex-col justify-between items-end h-full">
                                                <button
                                                    className="text-gray-600 text-xs sm:text-sm md:text-base"
                                                    onClick={() => removeCart(item._id)}
                                                >
                                                    Remove
                                                </button>
                                                <div className="text-sm sm:text-base font-bold text-sky-600">
                                                    ₹1111
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        ))
                    ) : (
                        <div className="flex items-center justify-center h-96">
                            <div className="text-center">
                                <p className="text-3xl font-bold text-gray-800">
                                    0 Courses in Cart
                                </p>
                                <p className="mt-4 text-gray-600">Cart Is Empty</p>
                            </div>
                        </div>
                    )}
                </div>
                {cart.length > 0 && (
                    <div className="bg-zinc-100 p-3 h-min w-full custom-mid:w-[400px]">
                        <h1 className="font-bold text-zinc-500 text-sm sm:text-base md:text-lg text-left font-lato">
                            Total
                        </h1>
                        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl text-zinc-800 text-left">
                            ₹{cart.reduce((total, item) => total + 1111, 0)}
                        </h1>
                        <div className="h-[1px] mt-3 mb-6 bg-zinc-200"></div>

                        <button
                            className="rounded bg-sky-600 text-white py-3 font-bold hover:bg-sky-700 transition-all text-sm sm:text-base md:text-lg w-full"
                            onClick={() => navigate("/checkout")}
                        >
                            Checkout
                        </button>
                    </div>
                )}
            </div>
            {selectedCart && (
                <div className="mt-4">
                    <h2 className="text-xl font-bold mb-2">Selected Cart</h2>
                    <ul className="divide-y divide-gray-200">
                        {selectedCart.map((item) => (
                            <li key={item._id} className="py-2">
                                <p className="text-base text-gray-800">
                                    <span className="font-semibold">{item.name}</span> - Quantity:{" "}
                                    {item.quantity}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default CartPage;