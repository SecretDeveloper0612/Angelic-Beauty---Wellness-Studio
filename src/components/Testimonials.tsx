"use client";

import { FiStar } from "react-icons/fi";
import Image from "next/image";

const testimonials = [
    {
        name: "Samantha Roberts",
        rating: 5,
        text: "The best salon experience I've ever had. The attention to detail and luxury ambiance at Angelic is second to none. My hair has never looked better.",
        photo: "/service-hair.png",
    },
    {
        name: "Olivia Grace",
        rating: 5,
        text: "Angelic is my sanctuary. Their spa therapies are truly life-changing. Highly recommend for anyone looking for authentic relaxation.",
        photo: "/about-spa.png",
    },
    {
        name: "Amelia James",
        rating: 5,
        text: "From the moment you walk in, you feel like royalty. Professional, hygienic, and truly talented experts. A premium destination for beauty.",
        photo: "/hero-bg.png",
    },
];

const Testimonials = () => {
    return (
        <section className="py-24 md:py-48 bg-soft-cream/30 overflow-hidden relative">
            <div className="container mx-auto px-6">
                <div className="text-center mb-24 max-w-2xl mx-auto">
                    <h4 className="text-xs uppercase font-sans tracking-[0.4em] text-rose-gold mb-6 font-medium">
                        TESTIMONIALS
                    </h4>
                    <h2 className="text-4xl md:text-6xl font-serif text-charcoal mb-8">
                        What Our Clients Say
                    </h2>
                    <p className="text-charcoal/60 font-sans tracking-widest text-sm uppercase">
                        Shared experiences from our beloved guests at Angelic.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-10">
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial.name}
                            className="p-10 bg-white rounded-3xl shadow-xl glass-card flex flex-col items-center text-center border border-transparent hover:border-rose-gold/20"
                        >
                            <div className="relative w-20 h-20 mb-8 rounded-full overflow-hidden border-2 border-rose-gold/20">
                                <Image
                                    src={testimonial.photo}
                                    alt={testimonial.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex text-luxury-gold mb-6 gap-1">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <FiStar key={i} className="fill-current w-4 h-4" />
                                ))}
                            </div>
                            <p className="text-charcoal/60 font-sans text-sm md:text-base italic leading-relaxed font-light mb-8 tracking-wide">
                                "{testimonial.text}"
                            </p>
                            <h4 className="text-lg font-serif text-charcoal uppercase tracking-[0.2em]">{testimonial.name}</h4>
                            <span className="text-[10px] tracking-[0.2em] font-sans text-rose-gold uppercase mt-2">Verified Client</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
