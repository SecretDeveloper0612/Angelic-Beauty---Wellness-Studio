"use client";

import { FiUserCheck, FiAward, FiSmile, FiShield, FiHeart, FiSettings } from "react-icons/fi";

const features = [
    {
        title: "Professional Beauty Experts",
        icon: <FiUserCheck className="w-6 h-6" />,
        description: "Our team consists of highly trained and experienced beauty specialists.",
    },
    {
        title: "Premium Salon Products",
        icon: <FiAward className="w-6 h-6" />,
        description: "We use only the world's most luxurious and safe beauty brands.",
    },
    {
        title: "Luxury Ambiance",
        icon: <FiSmile className="w-6 h-6" />,
        description: "Experience absolute tranquility in our high-end studio environment.",
    },
    {
        title: "Hygienic Environment",
        icon: <FiShield className="w-6 h-6" />,
        description: "Your health and safety are our top priority with clinical hygiene standards.",
    },
    {
        title: "Personalized Care",
        icon: <FiHeart className="w-6 h-6" />,
        description: "Each treatment is uniquely tailored to your individual beauty goals.",
    },
    {
        title: "Modern Equipment",
        icon: <FiSettings className="w-6 h-6" />,
        description: "We utilize cutting-edge beauty technologies for superior results.",
    },
];

const WhyChooseUs = () => {
    return (
        <section className="py-24 md:py-48 bg-soft-cream/30 overflow-hidden relative">
            <div className="container mx-auto px-6">
                <div className="text-center mb-24 max-w-3xl mx-auto">
                    <h4 className="text-xs uppercase font-sans tracking-[0.4em] text-rose-gold mb-6 font-medium">
                        THE ANGELIC DIFFERENCE
                    </h4>
                    <h2 className="text-4xl md:text-6xl font-serif text-charcoal mb-8">
                        Why Clients Love Angelic
                    </h2>
                    <p className="text-charcoal/60 font-sans tracking-widest text-sm uppercase max-w-xl mx-auto">
                        A decade of dedication to the art of grooming and skincare excellence.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
                    {features.map((feature) => (
                        <div
                            key={feature.title}
                            className="p-10 bg-white rounded-3xl shadow-xl glass-card flex flex-col items-center text-center border border-transparent hover:border-rose-gold/20"
                        >
                            <div className="w-16 h-16 bg-rose-gold/10 rounded-full flex items-center justify-center text-rose-gold mb-8">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl md:text-2xl font-serif text-charcoal mb-4 tracking-tight">{feature.title}</h3>
                            <p className="text-charcoal/60 font-sans text-sm md:text-base leading-relaxed font-light tracking-wide">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
