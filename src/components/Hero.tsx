"use client";

import Image from "next/image";

const Hero = () => {
    return (
        <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
            {/* Background Image */}
            <div className="absolute top-0 left-0 w-full h-full z-0">
                <Image
                    src="https://wallpapercave.com/wp/wp7885113.jpg"
                    alt="Luxury Salon Interior"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50" />
            </div>

            {/* Content */}
            <div className="container mx-auto px-6 relative z-10 text-center">
                <div className="max-w-4xl mx-auto">
                    <h4 className="text-xs uppercase font-sans tracking-[0.3em] text-rose-gold mb-6 font-medium">
                        ESTABLISHED IN 2017
                    </h4>

                    <h1 className="text-5xl md:text-8xl font-serif text-white mb-8 leading-tight tracking-tight px-4 shadow-sm">
                        Reveal Your <br />
                        <span className="italic">Natural Beauty</span>
                    </h1>

                    <p className="text-sm md:text-lg text-white/90 font-sans max-w-2xl mx-auto mb-12 font-light leading-relaxed tracking-wide shadow-sm">
                        Experience luxury beauty, grooming, and wellness at Angelic Beauty & Wellness Studio.
                        A sanctuary for relaxation and rejuvenation.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <button
                            className="px-10 py-4 bg-rose-gold text-white text-xs tracking-widest uppercase rounded-full hover:bg-white hover:text-charcoal transition-colors min-w-[220px] shadow-xl"
                        >
                            Book Appointment
                        </button>
                        <button
                            className="px-10 py-4 bg-transparent border border-white/50 text-white text-xs tracking-widest uppercase rounded-full hover:bg-white hover:text-charcoal transition-colors min-w-[220px]"
                        >
                            Explore Services
                        </button>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
                <span className="text-[10px] uppercase tracking-[0.2em] mb-4 text-white/60">Scroll</span>
                <div className="w-[1px] h-16 bg-gradient-to-b from-white/60 to-transparent relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-rose-gold" />
                </div>
            </div>
        </section>
    );
};

export default Hero;
