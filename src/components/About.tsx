"use client";

import Image from "next/image";

const About = () => {
    return (
        <section id="about" className="py-24 md:py-48 overflow-hidden bg-soft-cream/30">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-32">
                    {/* Left Side: Image */}
                    <div className="w-full lg:w-1/2 relative group">
                        <div className="absolute -top-10 -left-10 w-full h-full border border-rose-gold/20 -z-10" />
                        <div className="relative aspect-[4/5] md:aspect-[5/6] overflow-hidden rounded-2xl shadow-2xl">
                            <Image
                                src="/about-wellness.png"
                                alt="About Angelic Beauty & Wellness"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>

                        {/* Experience Badge */}
                        <div
                            className="absolute -bottom-8 -right-8 md:-bottom-12 md:-right-12 bg-white p-6 md:p-10 rounded-2xl shadow-xl glass-card flex flex-col items-center justify-center border border-rose-gold/20"
                        >
                            <span className="text-4xl md:text-6xl font-serif text-rose-gold leading-none mb-2">7+</span>
                            <span className="text-[10px] md:text-sm tracking-[0.2em] font-sans uppercase text-charcoal/60 text-center uppercase">Years of excellence</span>
                        </div>
                    </div>

                    {/* Right Side: Text */}
                    <div className="w-full lg:w-1/2">
                        <div>
                            <h4 className="text-xs uppercase font-sans tracking-[0.4em] text-rose-gold mb-6 font-medium">Beauty Reimagined</h4>
                            <h2 className="text-4xl md:text-6xl font-serif text-charcoal mb-8 leading-tight">
                                About Angelic Beauty & <br />
                                <span className="italic">Wellness Studio</span>
                            </h2>

                            <div className="space-y-8 text-charcoal/70 font-sans text-sm md:text-base leading-relaxed tracking-wider font-light">
                                <p>
                                    Established in 2017, Angelic Beauty & Wellness Studio is a premier destination for beauty, grooming, and relaxation.
                                    We believe that beauty is an art, and our studio is a haven for those who seek to enhance their natural essence
                                    through professional care and premium treatments.
                                </p>
                                <p>
                                    Our expert stylists and therapists combine traditional techniques with modern innovation to provide
                                    a personalized experience tailored to your unique needs. We are committed to using only the
                                    finest products and providing an atmosphere of pure tranquility.
                                </p>

                                <div className="pt-8">
                                    <button
                                        className="flex items-center gap-4 text-charcoal font-serif text-xl"
                                    >
                                        Learn More About Us
                                        <span className="w-12 h-[1px] bg-rose-gold block" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
