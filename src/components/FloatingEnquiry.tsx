"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPhone, FiMessageCircle, FiX } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const FloatingEnquiry = () => {
    const [isOpen, setIsOpen] = useState(false);
    const phoneNumber = "+918679066679";
    const whatsappMsg = encodeURIComponent("Hello Angelic Beauty & Wellness Studio! I would like to enquire about your services.");

    return (
        <div className="fixed bottom-8 right-8 z-[150] flex flex-col items-end">
            {/* Options Popup */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="mb-4 bg-white rounded-2xl shadow-2xl p-4 min-w-[200px] border border-gray-100 backdrop-blur-sm"
                    >
                        <div className="flex flex-col space-y-3">
                            <h4 className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-medium mb-1 px-2">How can we help?</h4>

                            {/* WhatsApp Button */}
                            <a
                                href={`https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${whatsappMsg}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 p-3 rounded-xl hover:bg-green-50 transition-colors group"
                            >
                                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                                    <FaWhatsapp size={20} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-semibold text-charcoal">WhatsApp</span>
                                    <span className="text-[10px] text-gray-500">Fast response</span>
                                </div>
                            </a>

                            {/* Call Button */}
                            <a
                                href={`tel:${phoneNumber}`}
                                className="flex items-center gap-4 p-3 rounded-xl hover:bg-blue-50 transition-colors group"
                            >
                                <div className="w-10 h-10 rounded-full bg-rose-gold flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                                    <FiPhone size={20} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-semibold text-charcoal">Call Now</span>
                                    <span className="text-[10px] text-gray-500">{phoneNumber}</span>
                                </div>
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-500 transform ${isOpen ? 'bg-charcoal rotate-0' : 'bg-rose-gold rotate-0'} gold-glow relative group`}
            >
                <div className="absolute inset-0 rounded-full bg-rose-gold animate-ping opacity-20 pointer-events-none group-hover:hidden" />

                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ opacity: 0, rotate: -90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 90 }}
                        >
                            <FiX size={28} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="open"
                            initial={{ opacity: 0, rotate: 90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: -90 }}
                        >
                            <FiMessageCircle size={28} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    );
};

export default FloatingEnquiry;
