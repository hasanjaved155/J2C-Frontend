import * as React from "react";
const PromotionSVG = (props) => (
    <svg
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full"
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            fill="#F29C1F"
            d="M80 100L56 0H44L20 100h13l17-73.914L67 100z"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            fill="#ECF0F1"
            d="M0 10h100v62H0V10z"
        />
        <path
            clipRule="evenodd"
            stroke="#E64C3C"
            strokeWidth={4}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit={10}
            d="M10 61l13.024-13.024L29 53l16.988-16.012L55 46l15-15 5 5 15-15"
            fill="none"
        />
        <path
            d="M73.28 72H60.56l.46 2h12.74zm-47.04 2h12.74l.46-2H26.72z"
            fillRule="evenodd"
            clipRule="evenodd"
            fill="#E57E25"
        />
    </svg>
);
export default PromotionSVG;