"use client";

import Image from "next/image";
import Link from "next/link";
import { FiScissors, FiWind, FiDroplet, FiHeart, FiStar, FiClock } from "react-icons/fi";

const services = [
    {
        title: "Hair Styling",
        icon: <FiScissors className="w-8 h-8" />,
        description: "Expert cuts and styling tailored to your face shape and personal style.",
        image: "/service-hair-styling.png",
    },
    {
        title: "Hair Treatments",
        icon: <FiWind className="w-8 h-8" />,
        description: "Restore your hair's health and vitality with our luxury nourishing treatments.",
        image: "/service-hair-treatment.png",
    },
    {
        title: "Facial & Skincare",
        icon: <FiDroplet className="w-8 h-8" />,
        description: "Advanced skincare therapies that leaves your skin glowing and rejuvenated.",
        image: "/service-facial.png",
    },
    {
        title: "Holistic Therapy",
        icon: <FiHeart className="w-8 h-8" />,
        description: "Indulge in our range of therapeutic wellness treatments for complete relaxation.",
        image: "/service-holistic.png",
    },
    {
        title: "Manicure & Pedicure",
        icon: <FiStar className="w-8 h-8" />,
        description: "Pamper your hands and feet with our premium nail care and relaxation services.",
        image: "/service-mani-pedi.png",
    },
    {
        title: "Bridal Makeup",
        icon: <FiClock className="w-8 h-8" />,
        description: "Stunning bridal and special event makeup styles for your most precious moments.",
        image: "/service-bridal.png",
    },
];

const Services = () => {
    return (
        <section id="services" className="py-24 md:py-48 bg-white relative overflow-hidden">
            {/* Background Decorative Element */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-soft-cream/20 -z-10" />

            <div className="container mx-auto px-6">
                <div className="text-center mb-24 max-w-2xl mx-auto">
                    <h4 className="text-xs uppercase font-sans tracking-[0.4em] text-rose-gold mb-6 font-medium">
                        OUR EXPERTISE
                    </h4>
                    <h2 className="text-4xl md:text-6xl font-serif text-charcoal mb-8">
                        Our Premium Services
                    </h2>
                    <p className="text-charcoal/60 font-sans tracking-widest text-sm uppercase">
                        Tailored beauty and wellness experiences designed with luxury in mind.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8">
                    {services.map((service) => (
                        <div
                            key={service.title}
                            className="group relative h-[550px] overflow-hidden rounded-3xl shadow-xl"
                        >
                            <Image
                                src={service.image}
                                alt={service.title}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute bottom-0 left-0 w-full p-8 bg-white/90 backdrop-blur-sm border-t border-rose-gold/10">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-4">
                                        <div className="text-rose-gold">
                                            {service.icon}
                                        </div>
                                        <h3 className="text-2xl font-serif tracking-tight text-charcoal">{service.title}</h3>
                                    </div>
                                    <p className="text-xs md:text-sm font-sans tracking-[0.05em] text-charcoal/70 leading-relaxed">
                                        {service.description}
                                    </p>

                                    <div className="pt-2">
                                        <Link href="/services">
                                            <button className="text-[10px] uppercase font-sans tracking-[0.3em] font-medium text-rose-gold border-b border-rose-gold/30 pb-1 hover:text-charcoal hover:border-charcoal transition-colors">
                                                Explore Service
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
