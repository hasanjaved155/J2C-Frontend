import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const HeroSection = () => {
    return (
        <section className="w-full text-start grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-6xl mx-auto">
            <div>
                <span className="block mb-8 text-xl md:text-xl text-black font-medium">
                    Mern Stack Development
                </span>
                <div className="border-2 p-7 border-black">
                    <h3 className="text-xl md:text-xl font-bold">
                        What will you Learn
                    </h3>
                    <p className="text-base md:text-lg text-slate-700 my-4 md:my-6">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam nobis in
                        error repellat voluptatibus ad.
                    </p>
                </div>
            </div>

        </section>
    );
};




export default HeroSection;