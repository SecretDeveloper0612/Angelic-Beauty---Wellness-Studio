"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { 
    FiScissors, 
    FiWind, 
    FiDroplet, 
    FiHeart, 
    FiStar, 
    FiClock, 
    FiCheckCircle,
    FiSearch,
    FiArrowRight,
    FiFilter,
    FiPlus
} from "react-icons/fi";

const serviceCategories = [
    {
        id: "hair-bridal",
        title: "Bridal & Hair Artistry",
        shortTitle: "Hair",
        description: "Exquisite styling for your most memorable moments and daily elegance.",
        image: "/service-hair-styling.png",
        icon: <FiScissors />,
        services: [
            { name: "Bridal & Hair Style", description: "Complete bridal hair transformations and specialty event styling." },
            { name: "Treatment & Styling (Ladies)", description: "Luxury hair care treatments and precision cuts tailored for women." },
            { name: "Treatment & Styling (Gents)", description: "Professional grooming, cuts, and scalp treatments for men." }
        ]
    },
    {
        id: "skin-face",
        title: "Skin & Face Rituals",
        shortTitle: "Skin",
        description: "Advanced skincare and grooming treatments for a radiant, refreshed look.",
        image: "/service-facial.png",
        icon: <FiDroplet />,
        services: [
            { name: "Facial", description: "Customized facial treatments designed for your specific skin needs." },
            { name: "Bleach, D-Tan & Cleanup", description: "Effective tan removal and deep cleansing for instant brightness." },
            { name: "Threading", description: "Traditional precision hair removal for perfectly shaped brows." },
            { name: "Waxing", description: "Smooth, long-lasting hair removal for all skin types." }
        ]
    },
    {
        id: "body-wellness",
        title: "Body & Wellness",
        shortTitle: "Wellness",
        description: "Renew your energy with our holistic body treatments and ancient wellness traditions.",
        image: "/about-spa.png",
        icon: <FiHeart />,
        services: [
            { name: "Body Polishing", description: "Deep exfoliation and hydration for silky smooth skin head-to-toe." },
            { name: "Body Scrub", description: "Revitalizing salt and essential oil scrubs to remove dead skin cells." },
            { name: "Wellness", description: "Therapeutic treatments focused on total relaxation and inner balance." },
            { name: "Indian Ayurveda", description: "Ancient healing rituals and herbal oils for complete rejuvenation." }
        ]
    },
    {
        id: "nails",
        title: "Nail & Hand Care",
        shortTitle: "Nails",
        description: "Pamper your hands and feet with our expert nail care and artistic finishes.",
        image: "/service-mani-pedi.png",
        icon: <FiStar />,
        services: [
            { name: "Pedicure & Manicure", description: "Complete nail grooming, exfoliation, and massage for hands and feet." },
            { name: "Nail Magic", description: "Creative nail art and luxury finishes to make your nails standout." }
        ]
    },
    {
        id: "packages",
        title: "Specialty Packages",
        shortTitle: "Packages",
        description: "Comprehensive beauty journeys prepared for your upcoming celebrations.",
        image: "/service-bridal.png",
        icon: <FiClock />,
        services: [
            { name: "Pre Bridal Packages", description: "A curated series of treatments to prepare you for your big day." }
        ]
    }
];

const faqs = [
    {
        question: "Do I need to book an appointment in advance?",
        answer: "While we do accept walk-ins based on availability, we highly recommend booking at least 24-48 hours in advance to ensure you get your preferred time and stylist."
    },
    {
        question: "What products do you use in your treatments?",
        answer: "We use only premium, internationally recognized brands like L'Oréal Professionnel, Kérastase, and organic skincare lines to ensure the best results for your hair and skin."
    },
    {
        question: "Can I cancel or reschedule my appointment?",
        answer: "Yes, you can reschedule or cancel your appointment. We kindly request at least 24 hours' notice so we can offer the time slot to other clients."
    },
    {
        question: "Do you offer gift vouchers?",
        answer: "Absolutely! We offer elegant gift vouchers for any specific service or monetary value, perfect for treating your loved ones."
    }
];

export default function ServicesPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("all");
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 400);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const filteredCategories = serviceCategories.filter(cat => {
        const matchesCategory = activeCategory === "all" || cat.id === activeCategory;
        const matchesSearch = cat.services.some(s => 
            s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.description.toLowerCase().includes(searchQuery.toLowerCase())
        ) || cat.title.toLowerCase().includes(searchQuery.toLowerCase());
        
        return matchesCategory && matchesSearch;
    });

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 100;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    return (
        <main className="min-h-screen bg-white font-sans text-charcoal">
            <Navbar />

            {/* Hero Section - Refined for better readability */}
            <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/hero-bg.png"
                        alt="Angelic Services"
                        fill
                        className="object-cover scale-105"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/40 to-white" />
                </div>
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto space-y-6"
                    >
                        <h4 className="text-xs md:text-sm uppercase font-sans tracking-[0.5em] gold-text-gradient mb-4 font-bold drop-shadow-md">THE ART OF LUXURY</h4>
                        <h1 className="text-5xl md:text-8xl font-serif text-white mb-6 tracking-tight leading-tight drop-shadow-lg">
                            Our Beauty <br />
                            <span className="italic font-light">Collection</span>
                        </h1>
                        <p className="text-white/90 font-sans tracking-[0.05em] text-sm md:text-lg max-w-2xl mx-auto leading-relaxed font-light drop-shadow-sm">
                            Tailored treatments designed to restore your radiance. Use our search tool below to find your perfect ritual.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* User-Friendly Search & Navigation Bar */}
            <div className={`sticky top-20 z-[80] transition-all duration-300 ${scrolled ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'}`}>
                 <div className="container mx-auto px-4">
                    <div className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-2xl border border-rose-gold/10 p-4 flex flex-col md:flex-row items-center gap-4 max-w-6xl mx-auto">
                        <div className="relative flex-grow w-full md:w-auto hidden md:block">
                            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30" />
                            <input 
                                type="text"
                                placeholder="Search for a service (e.g. Facial, Hair)..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-soft-cream/30 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-rose-gold/50 transition-all font-sans"
                            />
                        </div>
                        <div className="flex gap-2 overflow-x-auto no-scrollbar w-full md:w-auto pb-2 md:pb-0">
                            <button 
                                onClick={() => setActiveCategory("all")}
                                className={`px-5 py-3 rounded-xl text-xs uppercase tracking-widest transition-all font-medium flex-shrink-0 ${activeCategory === "all" ? 'bg-charcoal text-white shadow-lg' : 'bg-soft-cream/50 text-charcoal hover:bg-rose-gold/10'}`}
                            >
                                All Rituals
                            </button>
                            {serviceCategories.map(cat => (
                                <button 
                                    key={cat.id}
                                    onClick={() => {
                                        setActiveCategory(cat.id);
                                        scrollToSection(cat.id);
                                    }}
                                    className={`px-5 py-2 rounded-xl text-xs uppercase tracking-widest transition-all font-medium flex-shrink-0 flex items-center gap-2 ${activeCategory === cat.id ? 'bg-charcoal text-white shadow-lg' : 'bg-soft-cream/50 text-charcoal hover:bg-rose-gold/10'}`}
                                >
                                    <span className="opacity-70">{cat.icon}</span>
                                    {cat.shortTitle}
                                </button>
                            ))}
                        </div>
                    </div>
                 </div>
            </div>

            {/* Static Search & Category Bar (Always visible before scroll) */}
            <section className="py-12 bg-white relative z-10 -mt-10">
                <div className="container mx-auto px-6">
                    <div className="bg-white shadow-xl rounded-3xl border border-rose-gold/5 p-6 md:p-10 max-w-6xl mx-auto">
                        <div className="flex flex-col lg:flex-row gap-10 items-center">
                            <div className="w-full lg:w-1/3">
                                <h3 className="text-2xl font-serif text-charcoal mb-2">Find Your Service</h3>
                                <p className="text-charcoal/40 text-sm font-sans">Quickly navigate through our luxury collection.</p>
                            </div>
                            <div className="w-full lg:w-2/3 flex flex-col md:flex-row gap-6 items-center">
                                <div className="relative w-full hidden md:block">
                                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30 text-xl" />
                                    <input 
                                        type="text"
                                        placeholder="What are you looking for today?"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-14 pr-6 py-5 bg-soft-cream/30 rounded-2xl text-base focus:outline-none focus:ring-2 focus:ring-rose-gold/20 transition-all font-sans border border-transparent hover:border-rose-gold/10"
                                    />
                                </div>
                                <div className="flex gap-4 w-full md:w-auto">
                                   <div className="hidden md:flex gap-3">
                                        {serviceCategories.slice(0, 3).map(cat => (
                                            <button 
                                                key={cat.id}
                                                onClick={() => scrollToSection(cat.id)}
                                                className="w-14 h-14 rounded-2xl bg-soft-cream flex items-center justify-center text-rose-gold text-xl hover:bg-rose-gold hover:text-white transition-all shadow-sm"
                                                title={cat.title}
                                            >
                                                {cat.icon}
                                            </button>
                                        ))}
                                   </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Filter Result Count */}
            {searchQuery && (
                <div className="container mx-auto px-6 pt-12">
                     <div className="flex items-center gap-4 text-charcoal/60 uppercase tracking-widest text-xs font-semibold">
                        <FiFilter />
                        <span>Showing search results for: "{searchQuery}"</span>
                        <button onClick={() => setSearchQuery("")} className="text-rose-gold underline font-bold ml-2">Clear</button>
                     </div>
                </div>
            )}

            {/* Detailed Categories with User-Friendly Layout */}
            <div className="pb-24">
                <AnimatePresence mode="popLayout">
                    {filteredCategories.length > 0 ? (
                        filteredCategories.map((category, idx) => (
                            <motion.section 
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                key={category.id} 
                                id={category.id} 
                                className={`py-20 md:py-32 scroll-mt-32 overflow-hidden ${idx % 2 === 1 ? 'bg-soft-cream/10' : 'bg-white'}`}
                            >
                                <div className="container mx-auto px-6">
                                    <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
                                        {/* Category Info - Sticky on desktop */}
                                        <div className="w-full lg:w-2/5 lg:sticky lg:top-40 space-y-10">
                                            <div className="space-y-6">
                                                <div className="w-16 h-16 rounded-2xl bg-rose-gold/10 flex items-center justify-center text-rose-gold text-3xl">
                                                    {category.icon}
                                                </div>
                                                <h4 className="text-[10px] uppercase font-sans tracking-[0.4em] gold-text-gradient font-bold">Category 0{idx + 1}</h4>
                                                <h2 className="text-4xl md:text-5xl font-serif text-charcoal leading-tight tracking-tight">{category.title}</h2>
                                                <p className="text-charcoal/60 font-sans text-base leading-relaxed tracking-wide font-light max-w-md">
                                                    {category.description}
                                                </p>
                                            </div>

                                            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-2xl border border-rose-gold/5 group">
                                                <Image
                                                    src={category.image}
                                                    alt={category.title}
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent" />
                                            </div>
                                        </div>

                                        {/* Service Items - Grid for better usability */}
                                        <div className="w-full lg:w-3/5">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                                                {category.services
                                                  .filter(s => 
                                                    s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                                    s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                                    category.title.toLowerCase().includes(searchQuery.toLowerCase())
                                                  )
                                                  .map((service, sIdx) => (
                                                    <motion.div 
                                                        whileHover={{ y: -5 }}
                                                        key={sIdx} 
                                                        className="group bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl border border-charcoal/5 transition-all duration-300 flex flex-col justify-between"
                                                    >
                                                        <div className="space-y-4">
                                                            <div className="flex justify-between items-start">
                                                                <h3 className="text-xl font-serif text-charcoal group-hover:text-rose-gold transition-colors leading-snug">{service.name}</h3>
                                                            </div>
                                                            <p className="text-charcoal/50 font-sans text-sm tracking-wide leading-relaxed font-light">
                                                                {service.description}
                                                            </p>
                                                        </div>
                                                        <div className="pt-8 flex items-center justify-between">
                                                            <Link 
                                                                href={`/book-appointment?service=${encodeURIComponent(service.name)}`} 
                                                                className="text-[10px] uppercase font-sans tracking-widest font-bold text-rose-gold flex items-center gap-2 group/btn"
                                                            >
                                                                Reserve Now
                                                                <FiArrowRight className="transition-transform group-hover/btn:translate-x-1" />
                                                            </Link>
                                                            <div className="w-8 h-8 rounded-full bg-soft-cream flex items-center justify-center text-rose-gold opacity-0 group-hover:opacity-100 transition-opacity">
                                                                <FiCheckCircle className="text-xs" />
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>

                                            <div className="mt-16 bg-charcoal/5 rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-8 border border-charcoal/5">
                                                <div className="space-y-2 text-center md:text-left">
                                                    <h5 className="font-serif text-xl">Can't decide on a {category.shortTitle} ritual?</h5>
                                                    <p className="text-sm text-charcoal/50 font-sans">Our experts are happy to recommend the best treatment for you.</p>
                                                </div>
                                                <Link href="/contact">
                                                    <button className="px-8 py-4 bg-charcoal text-white text-[10px] tracking-[0.3em] uppercase rounded-xl hover:bg-rose-gold transition-all duration-300">
                                                        Expert Consultation
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.section>
                        ))
                    ) : (
                        <div className="container mx-auto px-6 py-40 text-center space-y-8">
                            <div className="w-24 h-24 bg-soft-cream rounded-full flex items-center justify-center text-rose-gold text-4xl mx-auto opacity-50">
                                <FiSearch />
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-3xl font-serif text-charcoal">No rituals found</h3>
                                <p className="text-charcoal/50 font-sans max-w-md mx-auto">We couldn't find any services matching your search. Please try a different keyword or browse our main categories.</p>
                            </div>
                            <button 
                                onClick={() => {setSearchQuery(""); setActiveCategory("all");}}
                                className="px-10 py-4 bg-rose-gold text-white text-xs tracking-widest uppercase rounded-full shadow-xl hover:bg-charcoal transition-all"
                            >
                                Browse All Services
                            </button>
                        </div>
                    )}
                </AnimatePresence>
            </div>

            {/* User Experience Boosters - Benefits Section */}
            <section className="py-24 bg-charcoal text-white relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
                        {[
                            { 
                                icon: <FiClock className="w-10 h-10" />, 
                                title: "Punctual Service", 
                                text: "We respect your time. Our therapists ensure every session starts and ends exactly as scheduled." 
                            },
                            { 
                                icon: <FiCheckCircle className="w-10 h-10" />, 
                                title: "Verified Hygiene", 
                                text: "Unyielding standards of cleanliness. Every instrument and station is sanitized for your safety." 
                            },
                            { 
                                icon: <FiHeart className="w-10 h-10" />, 
                                title: "Bespoke Care", 
                                text: "No generic routines. Every treatment is customized to your unique hair and skin profile." 
                            }
                        ].map((benefit, i) => (
                            <div key={i} className="space-y-6 flex flex-col items-center group">
                                <div className="text-rose-gold p-4 bg-white/5 rounded-3xl group-hover:bg-rose-gold group-hover:text-white transition-all duration-500">
                                    {benefit.icon}
                                </div>
                                <h3 className="text-2xl font-serif">{benefit.title}</h3>
                                <p className="text-white/40 font-sans text-sm leading-relaxed max-w-sm">{benefit.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Simplified FAQ for Usability */}
            <section className="py-24 bg-soft-cream/10">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-serif text-charcoal">Common Questions</h2>
                    </div>
                    <div className="space-y-6">
                        {faqs.map((faq, idx) => (
                            <details key={idx} className="group bg-white rounded-3xl border border-charcoal/5 shadow-sm open:shadow-xl transition-all duration-500">
                                <summary className="flex items-center justify-between p-8 cursor-pointer list-none list-inside">
                                    <h3 className="text-lg md:text-xl font-serif text-charcoal pr-8">{faq.question}</h3>
                                    <div className="w-10 h-10 rounded-full bg-soft-cream flex items-center justify-center text-rose-gold group-open:rotate-45 transition-transform duration-500">
                                        <FiPlus />
                                    </div>
                                </summary>
                                <div className="px-8 pb-8">
                                    <p className="text-charcoal/50 font-sans text-base leading-relaxed border-t border-charcoal/5 pt-6">{faq.answer}</p>
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* Reassurance CTA */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-6">
                    <div className="bg-rose-gold rounded-[2.5rem] p-10 md:p-16 text-center space-y-6 relative overflow-hidden shadow-2xl">
                        <div className="relative z-10 space-y-6">
                            <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight">Your Journey to <br /><span className="italic font-light">Perfection Starts Here</span></h2>
                            <p className="text-white/80 font-sans text-xs md:text-sm tracking-widest uppercase font-light max-w-xl mx-auto leading-relaxed">Skip the queue. Secure your preferred slot in less than 2 minutes.</p>
                            <div className="flex justify-center pt-2">
                                <Link href="/book-appointment">
                                    <button className="px-10 py-5 bg-white text-charcoal text-[10px] tracking-[0.3em] uppercase rounded-full hover:bg-charcoal hover:text-white transition-all duration-500 shadow-xl font-bold">
                                        Secure Your Appointment
                                    </button>
                                </Link>
                            </div>
                        </div>
                        {/* Abstract background shapes */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl text-white" />
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl " />
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
