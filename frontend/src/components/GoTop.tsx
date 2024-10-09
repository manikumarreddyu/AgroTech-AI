import React, { useState, useEffect } from "react";
import "../styles/goTop.css";

const GoTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(window.pageYOffset > 300);
    };

    const scrollToTop = () => {
        const scrollTo = (target, duration) => {
            const start = window.scrollY;
            const change = target - start;
            const startDate = +new Date();

            const animateScroll = () => {
                const currentDate = +new Date();
                const elapsed = currentDate - startDate;
                const progress = Math.min(elapsed / duration, 1);
                window.scrollTo(0, start + change * progress);

                if (elapsed < duration) {
                    requestAnimationFrame(animateScroll);
                }
            };
            requestAnimationFrame(animateScroll);
        };

        scrollTo(0, 600); 
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        return () => {
            window.removeEventListener("scroll", toggleVisibility);
        };
    }, []);

    return (
        <div className="fixed bottom-5 right-5 z-50">
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="bg-green-500 hover:bg-green-600 border border-green-700 shadow-2xl text-white font-bold py-3 px-3 rounded-full transition-all duration-300 animate-movebtn hover-stop"
                >
                    <svg
                        className="h-6 w-6 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 15l7-7 7 7"
                        />
                    </svg>
                </button>
            )}
        </div>
    );
};

export default GoTop;
