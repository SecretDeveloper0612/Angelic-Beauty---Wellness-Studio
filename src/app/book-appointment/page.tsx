"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useState, useEffect, Suspense, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { 
    FiCalendar, 
    FiClock, 
    FiUser, 
    FiCheckCircle, 
    FiStar, 
    FiHeart, 
    FiShield, 
    FiCoffee, 
    FiScissors, 
    FiLoader,
    FiChevronLeft,
    FiChevronRight
} from "react-icons/fi";

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
        { image: "/service-hair-styling.png", title: "Hair Styling", desc: "Expert precision cuts and artistic styling." },
        { image: "/service-facial.png", title: "Facial Treatment", desc: "Rejuvenating skin therapies with premium oils." },
        { image: "/hero-main.png", title: "Skin & Wellness", desc: "Complete body relaxation in a luxury setting." },
        { image: "/service-bridal.png", title: "Bridal Makeup", desc: "Elegant makeup for your truly special day." },
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

// Inline Elegant Time Selector (3 separate blocks)
const InlineTimeField = ({ selectedTime, onChange }: { selectedTime: string, onChange: (time: string) => void }) => {
    const getInitialTime = () => {
        if (!selectedTime) return { h: "10", m: "00", p: "AM" };
        const [hour24, minute] = selectedTime.split(':').map(Number);
        const p = hour24 >= 12 ? "PM" : "AM";
        const h = hour24 % 12 || 12;
        return { h: String(h).padStart(2, '0'), m: String(minute || 0).padStart(2, '0'), p };
    };

    const { h, m, p } = getInitialTime();

    const updateTime = (newH: string, newM: string, newP: string) => {
        let h24 = parseInt(newH);
        if (newP === "PM" && h24 < 12) h24 += 12;
        if (newP === "AM" && h24 === 12) h24 = 0;
        onChange(`${String(h24).padStart(2, '0')}:${newM}`);
    };

    const hours = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
    const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));

    return (
        <div className="flex items-center gap-3">
            <div className="flex-1">
                <select 
                    value={h} 
                    onChange={(e) => updateTime(e.target.value, m, p)}
                    className="w-full bg-soft-cream/40 border-b border-rose-gold/30 px-2 py-3 font-sans text-sm focus:outline-none focus:border-rose-gold transition-all cursor-pointer appearance-none text-center rounded-t-lg hover:bg-soft-cream/60"
                >
                    {hours.map(hr => <option key={hr} value={hr}>{hr}</option>)}
                </select>
                <div className="text-[7px] uppercase tracking-[0.2em] text-rose-gold/60 font-bold text-center mt-1">Hour</div>
            </div>
            <span className="text-rose-gold font-bold mb-4">:</span>
            <div className="flex-1">
                <select 
                    value={m} 
                    onChange={(e) => updateTime(h, e.target.value, p)}
                    className="w-full bg-soft-cream/40 border-b border-rose-gold/30 px-2 py-3 font-sans text-sm focus:outline-none focus:border-rose-gold transition-all cursor-pointer appearance-none text-center rounded-t-lg hover:bg-soft-cream/60"
                >
                    {minutes.map(min => <option key={min} value={min}>{min}</option>)}
                </select>
                <div className="text-[7px] uppercase tracking-[0.2em] text-rose-gold/60 font-bold text-center mt-1">Min</div>
            </div>
            <div className="flex-1">
                <select 
                    value={p} 
                    onChange={(e) => updateTime(h, m, e.target.value)}
                    className="w-full bg-soft-cream/40 border-b border-rose-gold/30 px-2 py-3 font-sans text-sm focus:outline-none focus:border-rose-gold transition-all cursor-pointer appearance-none text-center font-bold text-rose-gold rounded-t-lg hover:bg-soft-cream/60"
                >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                </select>
                <div className="text-[7px] uppercase tracking-[0.2em] text-rose-gold/60 font-bold text-center mt-1">Session</div>
            </div>
        </div>
    );
};

// Custom Premium Date Picker
const CustomDatePicker = ({ selectedDate, onChange }: { selectedDate: string, onChange: (date: string) => void }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [viewDate, setViewDate] = useState(new Date());
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

    const formatDateDisplay = (dateStr: string) => {
        if (!dateStr) return "Select Date";
        const date = new Date(dateStr);
        const d = String(date.getDate()).padStart(2, '0');
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const y = date.getFullYear();
        return `${d}/${m}/${y}`;
    };

    const handleSelectDate = (day: number) => {
        const d = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const dayStr = String(d.getDate()).padStart(2, '0');
        onChange(`${year}-${month}-${dayStr}`);
        setIsOpen(false);
    };

    const nextMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1));
    const prevMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1));

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const days = [];
    const totalDays = daysInMonth(viewDate.getFullYear(), viewDate.getMonth());
    const skipDays = firstDayOfMonth(viewDate.getFullYear(), viewDate.getMonth());

    for (let i = 0; i < skipDays; i++) days.push(null);
    for (let i = 1; i <= totalDays; i++) days.push(i);

    return (
        <div className="relative" ref={containerRef}>
            <div 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-soft-cream/20 border-b border-rose-gold/30 px-4 py-3 font-sans text-sm flex items-center justify-between cursor-pointer hover:border-rose-gold transition-all"
            >
                <span className={selectedDate ? "text-charcoal" : "text-charcoal/30"}>
                    {formatDateDisplay(selectedDate)}
                </span>
                <FiCalendar className="text-rose-gold" />
            </div>

            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white shadow-2xl rounded-2xl border border-rose-gold/10 p-4 z-50 animate-fade-in">
                    <div className="flex items-center justify-between mb-4">
                        <button type="button" onClick={prevMonth} className="p-2 hover:bg-soft-cream rounded-full text-rose-gold transition-colors"><FiChevronLeft /></button>
                        <h4 className="font-serif text-charcoal">{monthNames[viewDate.getMonth()]} {viewDate.getFullYear()}</h4>
                        <button type="button" onClick={nextMonth} className="p-2 hover:bg-soft-cream rounded-full text-rose-gold transition-colors"><FiChevronRight /></button>
                    </div>
                    <div className="grid grid-cols-7 gap-1 mb-2 text-center text-[10px] uppercase tracking-widest text-charcoal/40 font-bold">
                        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => <div key={d}>{d}</div>)}
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                        {days.map((day, idx) => (
                            <div key={idx}>
                                {day ? (
                                    <button
                                        type="button"
                                        onClick={() => handleSelectDate(day)}
                                        className={`w-full aspect-square text-xs rounded-lg transition-all flex items-center justify-center ${
                                            selectedDate === `${viewDate.getFullYear()}-${String(viewDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
                                                ? 'bg-rose-gold text-white shadow-lg'
                                                : 'text-charcoal hover:bg-soft-cream hover:text-rose-gold'
                                        }`}
                                    >
                                        {day}
                                    </button>
                                ) : <div className="w-full aspect-square" />}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

const BookingForm = () => {
    const searchParams = useSearchParams();
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

    useEffect(() => {
        const serviceParam = searchParams.get("service");
        if (serviceParam) {
            setFormData(prev => ({ ...prev, service: decodeURIComponent(serviceParam) }));
        }
    }, [searchParams]);

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
        
        if (!formData.date || !formData.time) {
            setError("Please select both date and time.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const startDateTime = new Date(`${formData.date}T${formData.time}:00`);
            const endDateTime = new Date(startDateTime.getTime() + 60 * 60000);

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

            if (response.ok) {
                setFormData(initialFormState);
                setSubmitted(true);
            } else {
                const data = await response.json();
                setError(data.error || "Something went wrong. Please try again.");
            }
        } catch (err) {
            setError("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="lg:col-span-6 w-full max-w-2xl mx-auto">
            {submitted ? (
                <div className="bg-white p-8 md:p-16 rounded-[2.5rem] shadow-2xl text-center space-y-8 border border-rose-gold/10 animate-fade-in">
                    <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center mb-6 shadow-xl mx-auto">
                        <FiCheckCircle className="text-4xl" />
                    </div>
                    <h2 className="text-3xl font-serif text-charcoal">Reserved Successfully</h2>
                    <p className="text-charcoal/60 font-sans tracking-[0.1em] text-xs leading-relaxed max-w-xs mx-auto">
                        Your luxury beauty transformation has been scheduled. Our beauty concierge will contact you shortly to finalize your experience.
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
                        <p className="text-[10px] uppercase tracking-[0.3em] text-rose-gold font-bold">RESERVE YOUR RADIANCE</p>
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
                                    <option>Holistic Therapy</option>
                                    <option>Manicure & Pedicure</option>
                                    <option>Bridal Makeup</option>
                                    <option>Bridal & Hair Style</option>
                                    <option>Treatment & Styling (Ladies)</option>
                                    <option>Treatment & Styling (Gents)</option>
                                    <option>Facial</option>
                                    <option>Bleach, D-Tan & Cleanup</option>
                                    <option>Threading</option>
                                    <option>Waxing</option>
                                    <option>Body Polishing</option>
                                    <option>Body Scrub</option>
                                    <option>Wellness</option>
                                    <option>Indian Ayurveda</option>
                                    <option>Pedicure & Manicure</option>
                                    <option>Nail Magic</option>
                                    <option>Pre Bridal Packages</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase font-sans tracking-[0.15em] text-charcoal/60 font-bold ml-1">Date (DD/MM/YYYY)</label>
                                <CustomDatePicker 
                                    selectedDate={formData.date} 
                                    onChange={(date) => setFormData({...formData, date})} 
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase font-sans tracking-[0.15em] text-charcoal/60 font-bold ml-1">Time Selection</label>
                                <InlineTimeField 
                                    selectedTime={formData.time} 
                                    onChange={(time) => setFormData({...formData, time})} 
                                />
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
    );
};

export default function BookAppointmentPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <section className="relative min-h-screen lg:h-screen w-full flex items-center pt-32 pb-20">
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <Image
                        src="/booking-hero.png"
                        alt="Book Your Appointment"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/50" />
                </div>

                <div className="container mx-auto px-4 lg:px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
                        <div className="lg:col-span-6 text-white space-y-8">
                            <h4 className="text-xs uppercase font-sans tracking-[0.4em] text-rose-gold mb-6 font-medium">RESERVE YOUR SPACE</h4>
                            <h1 className="text-4xl md:text-7xl font-serif mb-8 tracking-tight leading-tight">
                                Book Your Beauty <br />
                                <span className="italic">Experience</span>
                            </h1>
                            <p className="text-white/80 font-sans tracking-widest text-sm md:text-lg uppercase max-w-xl leading-relaxed">
                                Schedule your luxury salon or wellness session with our world-class beauty experts.
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

                        <Suspense fallback={<div className="lg:col-span-6 text-white text-center">Loading Booking Form...</div>}>
                            <BookingForm />
                        </Suspense>
                    </div>
                </div>
            </section>

            <BookingSteps />
            <HighEndServiceCards />

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
