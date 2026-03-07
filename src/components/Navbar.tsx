"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import darkLogo from "../Asstes/dark-logo.png";
import whiteLogo from "../Asstes/white-logo.png";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "About", href: "/#about" },
        { name: "Services", href: "/#services" },
        { name: "Beauty & Wellness", href: "/#wellness" },
        { name: "Gallery", href: "/#gallery" },
        // { name: "Pricing", href: "#pricing" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-100 transition-all duration-300 ${isScrolled ? "bg-white py-2 shadow-sm border-b border-gray-100" : "bg-transparent py-4"
                }`}
        >
            <div className="container mx-auto px-4 lg:px-6 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="group">
                    <div className="relative h-20 w-40 lg:w-48 transition-all duration-300 transform group-hover:scale-105">
                        <Image
                            src={isScrolled ? darkLogo : whiteLogo}
                            alt="Angelic Beauty & Wellness Studio"
                            fill
                            className="object-contain object-left"
                            priority
                        />
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="relative py-2"
                        >
                            <span className={`text-sm tracking-widest font-sans uppercase ${isScrolled ? "text-charcoal/80 hover:text-rose-gold" : "text-white hover:text-rose-gold"
                                }`}>
                                {link.name}
                            </span>
                        </Link>
                    ))}
                </div>

                <div className="hidden lg:block">
                    <Link href="/book-appointment">
                        <button
                            className={`px-8 py-3 text-xs tracking-widest uppercase rounded-full transition-colors ${isScrolled ? "bg-charcoal text-white hover:bg-rose-gold" : "bg-rose-gold text-white hover:bg-white hover:text-charcoal"
                                }`}
                        >
                            Book Appointment
                        </button>
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className={`lg:hidden ${isScrolled ? "text-charcoal" : "text-white"}`}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
                    </svg>
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 w-full h-screen bg-white/98 backdrop-blur-md z-[200] lg:hidden flex flex-col items-center justify-center space-y-12"
                    >
                        {/* Close Button */}
                        <motion.button
                            initial={{ opacity: 0, rotate: -90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            transition={{ delay: 0.3 }}
                            className="absolute top-8 right-8 text-charcoal p-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </motion.button>

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="relative h-24 w-60 mb-8"
                        >
                            <Image src={darkLogo} alt="Logo" fill className="object-contain" />
                        </motion.div>

                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={{
                                visible: { transition: { staggerChildren: 0.1 } }
                            }}
                            className="flex flex-col items-center space-y-8"
                        >
                            {navLinks.map((link) => (
                                <motion.div
                                    key={link.name}
                                    variants={{
                                        hidden: { y: 20, opacity: 0 },
                                        visible: { y: 0, opacity: 1 }
                                    }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-2xl tracking-[0.3em] font-serif uppercase text-charcoal hover:text-rose-gold transition-colors px-4 py-1 block"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>

                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                        >
                            <Link href="/book-appointment" onClick={() => setIsMobileMenuOpen(false)}>
                                <button className="px-12 py-5 bg-charcoal text-white text-xs tracking-[0.4em] uppercase rounded-full shadow-2xl gold-glow mt-8">
                                    Book Appointment
                                </button>
                            </Link>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
