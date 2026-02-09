import React from 'react';

const VolleyballIcon = ({ size = 24, color = "white", strokeWidth = 2, className = "" }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            {/* Main Ball Outline */}
            <circle cx="12" cy="12" r="10" fill="rgba(255, 255, 255, 0.2)" />

            {/* Panel Lines - Creating the swirling 3-section look commonly seen on modern volleyballs */}

            {/* Curve 1: Left to Top */}
            <path d="M2.5 12 C 6 12 9 9 12 2.5" />

            {/* Curve 2: Top to Right */}
            <path d="M12 2.5 C 15 9 18 12 21.5 12" />

            {/* Curve 3: Right to Bottom */}
            <path d="M21.5 12 C 18 15 15 18 12 21.5" />

            {/* Curve 4: Bottom to Left */}
            <path d="M12 21.5 C 9 15 6 12 2.5 12" />

            {/* Inner detail to give it depth (Standard Volleyball "Y" seam offset) */}
            <path d="M12 2.5 C 10 7 10 17 12 21.5" strokeOpacity="0.5" strokeWidth={strokeWidth * 0.7} />
            <path d="M2.5 12 C 7 10 17 10 21.5 12" strokeOpacity="0.5" strokeWidth={strokeWidth * 0.7} />

        </svg>
    );
};

export default VolleyballIcon;
