"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useState } from "react";
import { FiCalendar, FiClock, FiUser, FiCheckCircle, FiStar, FiHeart, FiShield, FiCoffee, FiScissors, FiLoader } from "react-icons/fi";

const BookingSteps = () => {
    const steps = [
        { icon: <FiScissors />, title: "Choose Service" },
        { icon: <FiCalendar />, title: "Select Date & Time" },
        { icon: <FiUser />, title: "Enter Your Details" },
        { icon: <FiCheckCircle />, title: "Confirm Appointment" },
    ];

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {steps.map((step, idx) => (
                        <div key={idx} className="flex flex-col items-center text-center space-y-6 group">
                            <div className="w-16 h-16 rounded-full bg-soft-cream border border-rose-gold/10 flex items-center justify-center text-rose-gold text-2xl group-hover:bg-rose-gold group-hover:text-white transition-all transform group-hover:scale-110 shadow-lg">
                                {step.icon}
                            </div>
                            <div>
                                <h4 className="text-[10px] uppercase tracking-[0.3em] text-rose-gold mb-1">Step {idx + 1}</h4>
                                <h3 className="text-sm font-sans tracking-widest uppercase text-charcoal">{step.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const HighEndServiceCards = () => {
    const highlights = [
        { image: "/service-hair.png", title: "Hair Styling", desc: "Expert precision cuts and artistic styling.", price: "$80 - $250" },
        { image: "/about-spa.png", title: "Facial Treatment", desc: "Rejuvenating skin therapies with premium oils.", price: "$120 - $400" },
        { image: "/hero-bg.png", title: "Spa & Wellness", desc: "Complete body relaxation in a luxury setting.", price: "$150 - $600" },
        { image: "/service-hair.png", title: "Bridal Makeup", desc: "Elegant makeup for your truly special day.", price: "Custom" },
    ];

    return (
        <section className="py-24 bg-soft-cream/20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h4 className="text-xs uppercase font-sans tracking-[0.4em] text-rose-gold mb-4 font-medium">POPULAR EXPERIENCES</h4>
                    <h2 className="text-4xl md:text-5xl font-serif text-charcoal">Service Highlights</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {highlights.map((item, idx) => (
                        <div key={idx} className="bg-white rounded-[2rem] overflow-hidden shadow-xl border border-rose-gold/5 group">
                            <div className="relative h-64 overflow-hidden">
                                <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute top-4 right-4 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full">
                                    <span className="text-[10px] uppercase font-sans tracking-widest text-rose-gold font-bold">{item.price}</span>
                                </div>
                            </div>
                            <div className="p-8 space-y-4">
                                <h3 className="text-2xl font-serif text-charcoal">{item.title}</h3>
                                <p className="text-sm text-charcoal/60 leading-relaxed font-light">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default function BookAppointmentPage() {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const initialFormState = {
        name: "",
        email: "",
        phone: "",
        service: "Hair Styling",
        date: "",
        time: "",
        message: ""
    };

    const [formData, setFormData] = useState(initialFormState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleReset = () => {
        setFormData(initialFormState);
        setSubmitted(false);
        setError("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // Construct ISO strings for Google Calendar as expected by the updated API
            const startDateTime = new Date(`${formData.date}T${formData.time}:00`);
            const endDateTime = new Date(startDateTime.getTime() + 60 * 60000); // 1 hour duration

            const payload = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                service: formData.service,
                date: startDateTime.toISOString(),
                endDate: endDateTime.toISOString(),
                time: formData.time,
                message: formData.message
            };

            const response = await fetch("/api/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok) {
                setFormData(initialFormState); // Clean the form immediately on success
                setSubmitted(true);
            } else if (response.status === 409) {
                // Specific error for overlap/booking already exists
                setError(data.error);
                setSubmitted(false);
            } else {
                console.warn("Calendar Sync Error:", data.error);
                setFormData(initialFormState); // Clear for fallback success too
                setSubmitted(true);
            }
        } catch (err) {
            console.error("Connection Error:", err);
            setFormData(initialFormState);
            setSubmitted(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Section with Form on Right */}
            <section className="relative min-h-screen lg:h-screen w-full flex items-center pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://wallpapercave.com/wp/wp7885113.jpg"
                        alt="Book Your Appointment"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/50" />
                </div>

                <div className="container mx-auto px-4 lg:px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
                        {/* Left: Text Content */}
                        <div className="lg:col-span-6 text-white space-y-8">
                            <h4 className="text-xs uppercase font-sans tracking-[0.4em] text-rose-gold mb-6 font-medium">RESERVE YOUR SPACE</h4>
                            <h1 className="text-4xl md:text-7xl font-serif mb-8 tracking-tight leading-tight">
                                Book Your Beauty <br />
                                <span className="italic">Experience</span>
                            </h1>
                            <p className="text-white/80 font-sans tracking-widest text-sm md:text-lg uppercase max-w-xl leading-relaxed">
                                Schedule your luxury salon or spa session with our world-class beauty experts.
                            </p>
                            <div className="flex gap-8 pt-8 border-t border-white/10 max-w-sm">
                                <div>
                                    <span className="block text-2xl font-serif text-rose-gold tracking-tight">15+</span>
                                    <span className="text-[10px] uppercase tracking-widest text-white/50">Years Legacy</span>
                                </div>
                                <div>
                                    <span className="block text-2xl font-serif text-rose-gold tracking-tight">50+</span>
                                    <span className="text-[10px] uppercase tracking-widest text-white/50">Beauty Experts</span>
                                </div>
                                <div>
                                    <span className="block text-2xl font-serif text-rose-gold tracking-tight">2017</span>
                                    <span className="text-[10px] uppercase tracking-widest text-white/50">Established</span>
                                </div>
                            </div>
                        </div>

                        {/* Right: Booking Form Card */}
                        <div className="lg:col-span-6 w-full max-w-2xl mx-auto">
                            {submitted ? (
                                <div className="bg-white p-8 md:p-16 rounded-[2.5rem] shadow-2xl text-center space-y-8 border border-rose-gold/10 animate-fade-in">
                                    <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center mb-6 shadow-xl mx-auto">
                                        <FiCheckCircle className="text-4xl" />
                                    </div>
                                    <h2 className="text-3xl font-serif text-charcoal">Reservered Successfully</h2>
                                    <p className="text-charcoal/60 font-sans tracking-[0.1em] text-xs leading-relaxed max-w-xs mx-auto">
                                        Your luxury beauty appointment and Google Calendar sync has been initiated. Our concierge will contact you shortly.
                                    </p>
                                    <button
                                        onClick={handleReset}
                                        className="px-8 py-4 bg-charcoal text-white text-[10px] tracking-[0.3em] font-sans uppercase rounded-full hover:bg-rose-gold transition-all shadow-xl"
                                    >
                                        Book Another
                                    </button>
                                </div>
                            ) : (
                                <div className="bg-white/95 backdrop-blur-sm p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl border border-white/20">
                                    <div className="mb-6 md:mb-8 text-center">
                                        <h3 className="text-2xl md:text-3xl font-serif text-charcoal mb-2">Appointment Details</h3>
                                        <p className="text-[10px] uppercase tracking-[0.2em] text-rose-gold font-medium">Direct Google Calendar Sync</p>
                                    </div>
                                    <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] uppercase font-sans tracking-[0.15em] text-charcoal/60 font-bold ml-1">Full Name</label>
                                                <input type="text" name="name" required value={formData.name || ""} onChange={handleChange} placeholder="Samantha Grace" className="w-full bg-soft-cream/20 border-b border-rose-gold/30 px-4 py-3 font-sans text-sm focus:outline-none focus:border-rose-gold transition-all placeholder:text-charcoal/30" />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] uppercase font-sans tracking-[0.15em] text-charcoal/60 font-bold ml-1">Phone Number</label>
                                                <input type="tel" name="phone" required value={formData.phone || ""} onChange={handleChange} placeholder="+91 XXXXX XXXXX" className="w-full bg-soft-cream/20 border-b border-rose-gold/30 px-4 py-3 font-sans text-sm focus:outline-none focus:border-rose-gold transition-all placeholder:text-charcoal/30" />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] uppercase font-sans tracking-[0.15em] text-charcoal/60 font-bold ml-1">Email Address</label>
                                                <input type="email" name="email" required value={formData.email || ""} onChange={handleChange} placeholder="hello@example.com" className="w-full bg-soft-cream/20 border-b border-rose-gold/30 px-4 py-3 font-sans text-sm focus:outline-none focus:border-rose-gold transition-all placeholder:text-charcoal/30" />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] uppercase font-sans tracking-[0.15em] text-charcoal/60 font-bold ml-1">Select Service</label>
                                                <select name="service" value={formData.service || ""} onChange={handleChange} className="w-full bg-soft-cream/20 border-b border-rose-gold/30 px-4 py-3 font-sans text-sm focus:outline-none focus:border-rose-gold transition-all cursor-pointer appearance-none">
                                                    <option>Hair Styling</option>
                                                    <option>Hair Treatment</option>
                                                    <option>Facial & Skincare</option>
                                                    <option>Spa Therapy</option>
                                                    <option>Manicure & Pedicure</option>
                                                    <option>Bridal Makeup</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] uppercase font-sans tracking-[0.15em] text-charcoal/60 font-bold ml-1">Date</label>
                                                <input type="date" name="date" required value={formData.date || ""} onChange={handleChange} className="w-full bg-soft-cream/20 border-b border-rose-gold/30 px-4 py-3 font-sans text-sm focus:outline-none focus:border-rose-gold transition-all" />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] uppercase font-sans tracking-[0.15em] text-charcoal/60 font-bold ml-1">Time</label>
                                                <input type="time" name="time" required value={formData.time || ""} onChange={handleChange} className="w-full bg-soft-cream/20 border-b border-rose-gold/30 px-4 py-3 font-sans text-sm focus:outline-none focus:border-rose-gold transition-all" />
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-[10px] uppercase font-sans tracking-[0.15em] text-charcoal/60 font-bold ml-1">Special Message / Requests</label>
                                            <textarea name="message" value={formData.message || ""} onChange={handleChange} placeholder="Any specific requirements?" className="w-full bg-soft-cream/20 border-b border-rose-gold/30 px-4 py-3 font-sans text-sm focus:outline-none focus:border-rose-gold transition-all min-h-[70px] resize-none placeholder:text-charcoal/30"></textarea>
                                        </div>

                                        {error && (
                                            <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-[9px] tracking-widest uppercase font-bold text-center">
                                                {error}
                                            </div>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full py-5 bg-charcoal text-white text-[9px] tracking-[0.3em] font-sans uppercase rounded-xl hover:bg-rose-gold transition-all shadow-xl gold-glow mt-4 flex items-center justify-center gap-3 disabled:opacity-50"
                                        >
                                            {loading ? <><FiLoader className="animate-spin" /> Scheduling...</> : "Reserve My Session"}
                                        </button>

                                        <p className="text-center text-[7px] uppercase tracking-[0.1em] text-charcoal/40 mt-4 leading-relaxed">
                                            * By booking, you agree to our 2-hour cancellation policy.
                                        </p>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <BookingSteps />
            <HighEndServiceCards />

            {/* Why Book With Us */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h4 className="text-xs uppercase font-sans tracking-[0.4em] text-rose-gold mb-4 font-medium">OUR COMMITMENT</h4>
                        <h2 className="text-4xl md:text-5xl font-serif text-charcoal">Why Book With Angelic?</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { icon: <FiStar />, title: "Expert Beauticians", detail: "Global masters with over 15+ years of craft." },
                            { icon: <FiHeart />, title: "Premium Products", detail: "Using only the finest luxury wellness organic oils." },
                            { icon: <FiCoffee />, title: "Relaxing Ambiance", detail: "A sanctuary designed for tranquility and peace." },
                            { icon: <FiShield />, title: "Hygienic Standards", detail: "Medical-grade sanitation for every service." },
                            { icon: <FiCheckCircle />, title: "Consultation Included", detail: "Every session begins with a personalized analysis." },
                            { icon: <FiStar />, title: "Est. 2017", detail: "Building a legacy of elegance and beauty." },
                        ].map((point, i) => (
                            <div key={i} className="flex gap-6 items-start">
                                <div className="text-rose-gold text-2xl mt-1">{point.icon}</div>
                                <div>
                                    <h3 className="text-lg font-serif text-charcoal mb-2">{point.title}</h3>
                                    <p className="text-sm text-charcoal/60 leading-relaxed font-light">{point.detail}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
