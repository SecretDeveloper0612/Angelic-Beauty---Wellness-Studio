"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { FiMapPin, FiPhone, FiMail, FiClock, FiInstagram, FiFacebook, FiTwitter } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { useState } from "react";

const infoCards = [
    {
        icon: <FiMapPin className="w-6 h-6" />,
        title: "Salon Address",
        details: ["3rd floor, 2-145, do nehriya road", "near front of Indian Petrol Pump", "Haldwani, Nainital, Uttarakhand (263139)"],
        label: "Address"
    },
    {
        icon: <FiPhone className="w-6 h-6" />,
        title: "Phone Number",
        details: ["+91 86790 66679"],
        label: "Phone"
    },
    {
        icon: <FiMail className="w-6 h-6" />,
        title: "Email Address",
        details: ["contact@angelicbeauty.com", "appointments@angelicbeauty.com"],
        label: "Email"
    },
    {
        icon: <FiClock className="w-6 h-6" />,
        title: "Working Hours",
        details: ["Mon – Sun: 10:00 AM – 8:00 PM"],
        label: "Working Hours"
    }
];

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Section */}
            <section className="relative h-[65vh] w-full overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/contact-hero.png"
                        alt="Contact Angelic Studio"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/50" />
                </div>
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <div className="max-w-3xl mx-auto space-y-6">
                        <h4 className="text-xs uppercase font-sans tracking-[0.4em] text-rose-gold mb-6 font-medium animate-fade-in">Get In Touch</h4>
                        <h1 className="text-4xl md:text-7xl font-serif text-white mb-8 tracking-tight leading-tight">
                            Contact Angelic Beauty & <br />
                            <span className="italic">Wellness Studio</span>
                        </h1>
                        <p className="text-white/80 font-sans tracking-widest text-sm md:text-lg uppercase max-w-xl mx-auto leading-relaxed">
                            We’d love to hear from you. Get in touch with us for appointments, inquiries, or beauty consultations.
                        </p>
                    </div>
                </div>
            </section>

            {/* Info Cards Section */}
            <section className="py-24 bg-soft-cream/30">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {infoCards.map((card, idx) => (
                            <div key={idx} className="bg-white p-10 rounded-3xl shadow-xl hover:-translate-y-2 transition-transform duration-300 group border border-rose-gold/5">
                                <div className="w-14 h-14 bg-soft-cream rounded-2xl flex items-center justify-center text-rose-gold mb-8 group-hover:bg-rose-gold group-hover:text-white transition-colors">
                                    {card.icon}
                                </div>
                                <h4 className="text-[10px] uppercase font-sans tracking-[0.3em] text-rose-gold mb-2 font-medium">{card.label}</h4>
                                <h3 className="text-xl font-serif text-charcoal mb-4 uppercase tracking-[0.1em]">{card.title}</h3>
                                <div className="space-y-1">
                                    {card.details.map((line, i) => (
                                        <p key={i} className="text-charcoal/60 font-sans text-sm tracking-wide">{line}</p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section id="appointment-form" className="py-24 bg-white overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                        <div className="lg:col-span-4 space-y-8">
                            <h4 className="text-xs uppercase font-sans tracking-[0.4em] text-rose-gold mb-6 font-medium">APPOINTMENTS</h4>
                            <h2 className="text-4xl md:text-6xl font-serif text-charcoal mb-8 leading-tight">
                                Ready for Your <br />
                                <span className="italic">Beauty Journey?</span>
                            </h2>
                            <p className="text-charcoal/60 font-sans text-sm md:text-base leading-relaxed tracking-wider font-light">
                                Fill out the form to request an appointment. Our beauty consultants will reach out to you within 24 hours to confirm your schedule and tailor the experience to your needs.
                            </p>
                        </div>

                        <div className="lg:col-span-8">
                            {submitted ? (
                                <div className="bg-green-50/50 p-16 rounded-[2rem] text-center space-y-8 flex flex-col items-center justify-center border border-green-200/50 animate-fade-in">
                                    <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center mb-6 shadow-xl">
                                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h2 className="text-4xl font-serif text-charcoal">Successfully Sent!</h2>
                                    <p className="text-charcoal/60 font-sans tracking-widest uppercase text-sm">Our team will contact you shortly to confirm your appointment.</p>
                                    <button onClick={() => setSubmitted(false)} className="text-rose-gold underline font-sans text-sm tracking-widest uppercase mt-4 hover:text-charcoal transition-colors">Send another message</button>
                                </div>
                            ) : (
                                <div className="bg-soft-cream/30 p-8 md:p-12 rounded-[2rem] shadow-sm border border-rose-gold/10">
                                    <form onSubmit={handleSubmit} className="space-y-8">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-2">
                                                <label className="text-[10px] uppercase font-sans tracking-[0.2em] text-charcoal/40 font-medium">Full Name</label>
                                                <input type="text" required placeholder="Samantha Roberts" className="w-full bg-white border border-charcoal/5 rounded-xl px-6 py-4 font-sans text-sm focus:outline-none focus:border-rose-gold/50 transition-all" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] uppercase font-sans tracking-[0.2em] text-charcoal/40 font-medium">Email Address</label>
                                                <input type="email" required placeholder="contact@example.com" className="w-full bg-white border border-charcoal/5 rounded-xl px-6 py-4 font-sans text-sm focus:outline-none focus:border-rose-gold/50 transition-all" />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-2">
                                                <label className="text-[10px] uppercase font-sans tracking-[0.2em] text-charcoal/40 font-medium">Phone Number</label>
                                                <input type="tel" required placeholder="+91 XXXXX XXXXX" className="w-full bg-white border border-charcoal/5 rounded-xl px-6 py-4 font-sans text-sm focus:outline-none focus:border-rose-gold/50 transition-all" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] uppercase font-sans tracking-[0.2em] text-charcoal/40 font-medium">Select Service</label>
                                                <select className="w-full bg-white border border-charcoal/5 rounded-xl px-6 py-4 font-sans text-sm focus:outline-none focus:border-rose-gold/50 transition-all">
                                                    <option>Hair Styling</option>
                                                    <option>Hair Treatment</option>
                                                    <option>Facial & Skincare</option>
                                                    <option>Spa Therapy</option>
                                                    <option>Manicure & Pedicure</option>
                                                    <option>Bridal Makeup</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-2">
                                                <label className="text-[10px] uppercase font-sans tracking-[0.2em] text-charcoal/40 font-medium">Preferred Date</label>
                                                <input type="date" required className="w-full bg-white border border-charcoal/5 rounded-xl px-6 py-4 font-sans text-sm focus:outline-none focus:border-rose-gold/50 transition-all" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] uppercase font-sans tracking-[0.2em] text-charcoal/40 font-medium">Preferred Time</label>
                                                <select className="w-full bg-white border border-charcoal/5 rounded-xl px-6 py-4 font-sans text-sm focus:outline-none focus:border-rose-gold/50 transition-all">
                                                    <option>Morning (10:00 - 1:00)</option>
                                                    <option>Afternoon (1:00 - 4:00)</option>
                                                    <option>Evening (4:00 - 8:00)</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase font-sans tracking-[0.2em] text-charcoal/40 font-medium">Message</label>
                                            <textarea rows={4} placeholder="Your special requests or questions..." className="w-full bg-white border border-charcoal/5 rounded-xl px-6 py-4 font-sans text-sm focus:outline-none focus:border-rose-gold/50 transition-all resize-none"></textarea>
                                        </div>

                                        <button type="submit" className="w-full py-5 bg-charcoal text-white text-xs tracking-[0.4em] font-sans uppercase rounded-xl hover:bg-rose-gold gold-glow transition-all shadow-xl">
                                            Send Message
                                        </button>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Google Map Section */}
            <section className="py-24 bg-soft-cream/10">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h4 className="text-xs uppercase font-sans tracking-[0.4em] text-rose-gold mb-4 font-medium">FIND US</h4>
                        <h2 className="text-4xl md:text-5xl font-serif text-charcoal">Our Studio Location</h2>
                    </div>
                    <div className="w-full h-[500px] rounded-[3rem] overflow-hidden shadow-2xl border border-rose-gold/10 relative bg-white">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3484.2882250264155!2d79.51139467611894!3d29.15655546025686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a09ad74e98f6d7%3A0xe677ec788915ae34!2sIndian%20Petrol%20Pump!5e0!3m2!1sen!2sin!4v1710852000000!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            className="relative z-10 w-full h-full border-none shadow-none"
                        ></iframe>
                    </div>
                </div>
            </section>

            {/* Social Media Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 text-center">
                    <h4 className="text-xs uppercase font-sans tracking-[0.4em] text-rose-gold mb-6 font-medium">CONNECT WITH US</h4>
                    <h2 className="text-4xl md:text-5xl font-serif text-charcoal mb-12">Follow Our Beauty Journey</h2>
                    <div className="flex justify-center gap-6">
                        {[
                            { icon: <FiInstagram />, label: "Instagram", href: "https://www.instagram.com/angelic_studio_official/" },
                            { icon: <FiFacebook />, label: "Facebook", href: "https://www.facebook.com/angelic.beautyandwellnessstudio" },
                            { icon: <FaWhatsapp />, label: "WhatsApp", href: "https://wa.me/918679066679" },
                            { icon: <FiTwitter />, label: "Twitter", href: "#" }
                        ].map((social, i) => (
                            <a 
                                key={i} 
                                href={social.href} 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-16 h-16 rounded-full bg-soft-cream flex items-center justify-center text-charcoal/60 text-2xl hover:bg-rose-gold hover:text-white transition-all transform hover:scale-110 shadow-lg"
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-12 pb-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="relative h-[400px] rounded-[3rem] overflow-hidden shadow-2xl flex items-center justify-center text-center p-12">
                        <div className="absolute inset-0 z-0">
                            <Image
                                src="/hero-main.png"
                                alt="Spa"
                                fill
                                className="object-cover opacity-80"
                            />
                            <div className="absolute inset-0 bg-charcoal/80" />
                        </div>
                        <div className="relative z-10 space-y-8">
                            <h2 className="text-3xl md:text-6xl font-serif text-white leading-tight">Ready for Your <br /><span className="italic">Beauty Transformation?</span></h2>
                            <div className="flex justify-center">
                                <Link href="/book-appointment">
                                    <button className="px-10 py-4 bg-rose-gold text-white text-xs tracking-widest uppercase rounded-full hover:bg-white hover:text-charcoal transition-all gold-glow shadow-xl">
                                        Book Your Appointment
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
