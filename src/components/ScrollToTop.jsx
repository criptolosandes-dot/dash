import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            // Show button when page is scrolled down 300px
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    onClick={scrollToTop}
                    initial={{ opacity: 0, scale: 0.5, y: 100 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 100 }}
                    transition={{ duration: 0.3, type: "spring", stiffness: 200, damping: 20 }}
                    className="fixed bottom-10 right-10 z-[9999] flex items-center justify-center w-14 h-14 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] hover:scale-110 active:scale-95 transition-all duration-300 group backdrop-blur-md"
                    style={{
                        background: 'rgba(23, 27, 49, 0.8)',
                        border: '2px solid #06b6d4', // Cyan accent
                        cursor: 'pointer'
                    }}
                    aria-label="Volver arriba"
                >
                    <ArrowUp
                        size={28}
                        color="#06b6d4"
                        className="group-hover:-translate-y-1 transition-transform duration-300"
                        strokeWidth={2.5}
                    />
                </motion.button>
            )}
        </AnimatePresence>
    );
};
