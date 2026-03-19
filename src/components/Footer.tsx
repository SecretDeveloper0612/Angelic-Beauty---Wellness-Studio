"use client";

import Link from "next/link";
import Image from "next/image";
import { FiInstagram, FiFacebook, FiTwitter } from "react-icons/fi";
import whiteLogo from "../Asstes/white-logo.png";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = [
        { 
            title: "Quick Links", 
            links: [
                { name: "Home", href: "/" },
                { name: "About Us", href: "/#about" },
                { name: "Gallery", href: "/#gallery" },
                { name: "Services", href: "/services" },
                { name: "Contact", href: "/contact" }
            ] 
        },
        { 
            title: "Services", 
            links: [
                { name: "Bridal & Hair", href: "/services#hair-bridal" },
                { name: "Skin & Face", href: "/services#skin-face" },
                { name: "Body & Wellness", href: "/services#body-wellness" },
                { name: "Nail Care", href: "/services#nails" },
                { name: "Specialty Packages", href: "/services#packages" }
            ] 
        },
        { 
            title: "Contact", 
            links: [
                { name: "Email Us", href: "mailto:mail.angelicstudio@gmail.com" },
                { name: "+91 8679066679", href: "tel:+918679066679" },
                { name: "Book Appointment", href: "/book-appointment" },
                { name: "Our Location", href: "/contact" }
            ] 
        },
    ];

    return (
        <footer className="bg-charcoal text-white pt-24 pb-12 overflow-hidden relative border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
                    {/* Logo & About */}
                    <div className="flex flex-col items-start space-y-8 text-left">
                        <Link href="/" className="group block w-full">
                            <div className="relative h-32 w-48 mb-4 -ml-4 md:-ml-6">
                                <Image src={whiteLogo} alt="Logo" fill className="object-contain object-left" />
                            </div>
                        </Link>
                        <p className="text-white/50 font-sans text-sm leading-relaxed tracking-wider font-light">
                            Experience the pinnacle of luxury, beauty, and wellness at Angelic Beauty & Wellness Studio. Established in 2017, we have redefined the standards of elegance.
                        </p>
                        <div className="flex gap-4 pt-4">
                            {[
                                { icon: <FiInstagram />, href: "https://www.instagram.com/angelic_studio_official/" },
                                { icon: <FiFacebook />, href: "https://www.facebook.com/angelic.beautyandwellnessstudio" },
                                { icon: <FiTwitter />, href: "#" }
                            ].map((social, idx) => (
                                <a
                                    key={idx}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-rose-gold transition-colors"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    {footerLinks.map((section, idx) => (
                        <div key={idx} className="space-y-8">
                            <h4 className="text-xs uppercase font-sans tracking-[0.4em] text-rose-gold font-medium">{section.title}</h4>
                            <ul className="space-y-4">
                                {section.links.map((link, lIdx) => (
                                    <li key={lIdx}>
                                        <Link
                                            href={link.href}
                                            className="text-white/50 hover:text-white text-sm font-sans tracking-widest uppercase text-[10px]"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-white/30 text-[10px] uppercase font-sans tracking-[0.3em]">
                        © {currentYear} Angelic Beauty & Wellness Studio. All Rights Reserved.
                    </p>
                    <div className="text-white/30 text-[10px] uppercase font-sans tracking-[0.3em]">
                        Developed By <a href="https://preettech.com/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-rose-gold transition-colors duration-300">Preet Tech</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
