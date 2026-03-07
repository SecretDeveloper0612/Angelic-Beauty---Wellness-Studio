"use client";

import Link from "next/link";
import Image from "next/image";
import { FiInstagram, FiFacebook, FiTwitter } from "react-icons/fi";
import whiteLogo from "../Asstes/white-logo.png";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = [
        { title: "Quick Links", links: ["Home", "About Us", "Gallery", "Pricing", "Testimonials"] },
        { title: "Services", links: ["Hair Styling", "Skincare", "Beauty & Wellness", "Hair Treatments", "Bridal Makeup"] },
        { title: "Contact", links: ["mailto:mail.angelicstudio@gmail.com", "+91 7248034251", "123 Beauty Ave, Wellness St.", "Book an appointment", "Contact Form"] },
    ];

    return (
        <footer className="bg-charcoal text-white pt-24 pb-12 overflow-hidden relative border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
                    {/* Logo & About */}
                    <div className="space-y-8 text-left">
                        <Link href="/" className="group">
                            <div className="relative h-36 w-52 mb-4">
                                <Image src={whiteLogo} alt="Logo" fill className="object-contain" />
                            </div>
                        </Link>
                        <p className="text-white/50 font-sans text-sm leading-relaxed tracking-wider font-light">
                            Experience the pinnacle of luxury, beauty, and wellness at Angelic Beauty & Wellness Studio. Established in 2017, we have redefined the standards of elegance.
                        </p>
                        <div className="flex gap-4 pt-4">
                            {[<FiInstagram key="insta" />, <FiFacebook key="fb" />, <FiTwitter key="tw" />].map((icon, idx) => (
                                <a
                                    key={idx}
                                    href="#"
                                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-rose-gold"
                                >
                                    {icon}
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
                                            href="#"
                                            className="text-white/50 hover:text-white text-sm font-sans tracking-widest uppercase text-[10px]"
                                        >
                                            {link}
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
                    <div className="flex gap-8 text-white/30 text-[10px] uppercase font-sans tracking-[0.3em]">
                        <Link href="#" className="hover:text-rose-gold">Privacy Policy</Link>
                        <Link href="#" className="hover:text-rose-gold">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
