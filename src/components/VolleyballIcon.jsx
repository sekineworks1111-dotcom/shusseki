import React from 'react';

const VolleyballIcon = ({ size = 24, className = "" }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
            <path d="M2 12h20" />
            <path d="M12 12a14.5 14.5 0 0 0 0 0" /> {/* Just a placeholder, let's make a better volleyball */}
            <path d="M2.5 7.5c3-1 9-1 12 1.5" />
            <path d="M14.5 9c1 3 1 9-1.5 12.5" />
            <path d="M9.5 9c-1 3-1 9 1.5 12.5" />
            <path d="M2.5 16.5c3 1 9 1 12-1.5" />
        </svg>
    );
};

// Better Volleyball SVG Path
const Volleyball = ({ size = 24, color = "currentColor", strokeWidth = 2 }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="white"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        {/* Main Circle */}
        <circle cx="12" cy="12" r="10" stroke="white" strokeWidth={strokeWidth} fill="none" />

        {/* Internal Lines (Arcing) */}
        <path d="M12 2c0 5-2 9-6 11" stroke="white" strokeWidth={strokeWidth} />
        <path d="M12 2c0 5 2 9 6 11" stroke="white" strokeWidth={strokeWidth} />
        <path d="M6 13c3 3 6 3 12 0" stroke="white" strokeWidth={strokeWidth} />
        <path d="M3.5 8.5c4-1 9-1 13 0" stroke="white" strokeWidth={strokeWidth} />
        <path d="M12 22c0-4-2-7-5-9" stroke="white" strokeWidth={strokeWidth} />
        <path d="M12 22c0-4 2-7 5-9" stroke="white" strokeWidth={strokeWidth} />
    </svg>
);

// Simplified Volleyball for clearer icon at small sizes
const SimpleVolleyball = ({ size = 24, color = "white", strokeWidth = 2 }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 64 64" // using a different viewbox for ease
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <circle cx="32" cy="32" r="30" stroke={color} strokeWidth={strokeWidth * 2.5} fill="rgba(255,255,255,0.2)" />
        <path d="M32 2 C32 22, 22 32, 2 32" stroke={color} strokeWidth={strokeWidth * 2.5} fill="none" />
        <path d="M32 2 C32 22, 42 32, 62 32" stroke={color} strokeWidth={strokeWidth * 2.5} fill="none" />
        <path d="M2 32 C22 32, 32 42, 32 62" stroke={color} strokeWidth={strokeWidth * 2.5} fill="none" />
        <path d="M62 32 C42 32, 32 42, 32 62" stroke={color} strokeWidth={strokeWidth * 2.5} fill="none" />
    </svg>
);

export default SimpleVolleyball;
