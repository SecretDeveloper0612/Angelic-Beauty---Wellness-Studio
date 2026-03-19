"use client";

import Image from "next/image";
import Link from "next/link";

const CTA = () => {
    return (
        <section id="contact" className="py-24 md:py-48 bg-white overflow-hidden relative">
            <div className="container mx-auto px-6">
                <div
                    className="relative h-[600px] rounded-[3rem] overflow-hidden shadow-2xl flex items-center justify-center text-center p-12 group"
                >
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/gallery-1.png"
                            alt="Luxury Beauty Ambiance"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-charcoal/70" />
                    </div>

                    <div className="relative z-10 max-w-3xl mx-auto space-y-12">
                        <h4 className="text-xs uppercase font-sans tracking-[0.4em] gold-text-gradient mb-6 font-bold">
                            EXPERIENCE THE BEST
                        </h4>
                        <h2 className="text-4xl md:text-7xl font-serif text-white mb-8 tracking-tight leading-tight">
                            Ready for a <br />
                            <span className="italic font-light">Luxury Beauty Experience?</span>
                        </h2>
                        <p className="text-white/70 font-sans tracking-widest text-sm md:text-lg uppercase max-w-xl mx-auto mb-16 leading-relaxed">
                            Consult with our experts today and embark on a beauty journey you deserve.
                        </p>
                        <div className="flex justify-center">
                            <Link href="/book-appointment">
                                <button
                                    className="px-12 py-5 gold-btn-gradient text-white text-xs md:text-sm tracking-[0.3em] font-sans uppercase rounded-full shadow-2xl transition-all"
                                >
                                    Book Your Appointment Now
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTA;
