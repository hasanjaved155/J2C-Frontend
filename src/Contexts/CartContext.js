import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

// Create a context for the cart
const CartContext = createContext();

// Custom hook to use the CartContext


const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [cartLength, setCartLength] = useState(0);
    const user = JSON.parse(localStorage.getItem("user"));

    // Fetch cart details
    const fetchCartDetails = async () => {
        try {
            const res = await axios.get(`/cart/get-cart/${user?._id}`);
            setCart(res?.data?.cart || []);
            calculateTotal(res?.data?.cart || []);
        } catch (err) {
            console.error(`Failed to fetch cart details: ${err}`);
        }
    };

    useEffect(() => {
        if (user?._id) {
            fetchCartDetails();
        }
    }, [user?._id]);

    // Calculate total quantity
    const calculateTotal = (cartsData) => {
        let totalQ = 0;
        cartsData.forEach(cart => {
            totalQ += cart.quantity;
        });
        setCartLength(totalQ);
    };

    // Remove item from cart
    const removeCart = async (pid) => {
        try {
            const res = await axios.delete(`/cart/${user?._id}/delete-cart/${pid}`);
            if (res?.data?.success) {
                toast.success(res?.data?.message);
                fetchCartDetails();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <CartContext.Provider value={{ cart, setCart, cartLength, setCartLength, fetchCartDetails, removeCart }}>
            {children}
        </CartContext.Provider>
    );
};


const useCart = () => useContext(CartContext);
export { useCart, CartProvider };