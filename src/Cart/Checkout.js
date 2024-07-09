import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Checkout = () => {
    const [cart, setCart] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    const fetchCartDetails = async () => {
        try {
            const res = await axios.get(`/cart/get-cart/${user._id}`);
            setCart(res?.data?.cart);

        } catch (err) {
            console.error(`Failed to fetch cart details: ${err}`);
        }
    };

    useEffect(() => {
        fetchCartDetails();
    }, []);
    return (
        <div>
            <div className="mt-4">
                <h2 className="text-xl font-bold mb-2">Selected Cart</h2>
                <ul className="divide-y divide-gray-200">
                    {cart.map(item => (
                        <li key={item?._id} className="py-2">
                            <p className="text-base text-gray-800">
                                <span className="font-semibold">{item?.name}</span> - Quantity: {item?.quantity}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Checkout
