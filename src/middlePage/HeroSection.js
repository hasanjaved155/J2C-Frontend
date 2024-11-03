import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import CoursePlaylist from "./CoursePlaylist";
import axios from "axios";
import toast from "react-hot-toast";

const HeroSection = ({ savedItem, width }) => {

    return (
        <section className="w-full text-start flex gap-10 items-start">
            <div
                className="flex flex-col py-20"
                style={{ width: width ? `${width}px` : "auto" }}>
                <div className="border-2 p-7">
                    <h1 className="text-2xl font-bold">What you'll Learn</h1>
                    <p className="text-base md:text-lg text-slate-700 my-4 md:my-6">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam nobis
                        in error repellat voluptatibus ad.
                    </p>
                </div>
                <div className="mt-8 mb-4">
                    <h1 className="mt-3 text-2xl font-bold text-start">
                        Course Content
                    </h1>
                    <CoursePlaylist
                        path={savedItem?.path}
                        folderId={savedItem?.folderId}
                    />
                </div>

                <div className="bg-white p-6">
                    <h2 className="text-2xl font-bold  mb-4">Requirements</h2>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                        <li>
                            No programming experience needed — I'll teach you everything you
                            need to know
                        </li>
                        <li>A Mac or PC computer with access to the internet</li>
                        <li>
                            No paid software required - all websites will be created with VS
                            Code (which is free)
                        </li>
                        <li>
                            I'll walk you through, step-by-step how to get all the software
                            installed and set up
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;