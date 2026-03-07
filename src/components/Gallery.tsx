"use client";

import Image from "next/image";

const galleryImages = [
    { src: "/hero-bg.png", alt: "Salon Interior" },
    { src: "/about-spa.png", alt: "Spa Details" },
    { src: "/service-hair.png", alt: "Hair Styling" },
    { src: "/hero-bg.png", alt: "Salon View" },
    { src: "/about-spa.png", alt: "Spa Ambiance" },
    { src: "/service-hair.png", alt: "Hair Detail" },
];

const Gallery = () => {
    return (
        <section id="gallery" className="py-24 md:py-48 bg-white overflow-hidden relative">
            <div className="container mx-auto px-6">
                <div className="text-center mb-24 max-w-2xl mx-auto">
                    <h4 className="text-xs uppercase font-sans tracking-[0.4em] text-rose-gold mb-6 font-medium">
                        BEAUTY IN FOCUS
                    </h4>
                    <h2 className="text-4xl md:text-6xl font-serif text-charcoal mb-8">
                        Salon Experience
                    </h2>
                    <p className="text-charcoal/60 font-sans tracking-widest text-sm uppercase">
                        A visual journey through our luxurious sanctuary of beauty.
                    </p>
                </div>

                <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                    {galleryImages.map((image, idx) => (
                        <div
                            key={idx}
                            className="relative overflow-hidden rounded-3xl group cursor-pointer shadow-2xl"
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                width={800}
                                height={idx % 2 === 0 ? 1000 : 800}
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 flex items-center justify-center">
                                <div className="p-6 bg-white/20 rounded-full border border-white/30">
                                    <span className="text-white text-xs tracking-widest uppercase font-sans">View Large</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-24 text-center">
                    <button
                        className="px-10 py-4 bg-charcoal text-white text-xs tracking-widest uppercase rounded-full hover:bg-rose-gold min-w-[250px]"
                    >
                        View Full Gallery
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Gallery;
