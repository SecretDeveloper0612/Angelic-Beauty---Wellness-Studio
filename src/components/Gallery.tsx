"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";

const galleryImages = [
    { src: "/hero-main.png", alt: "Salon Interior" },
    { src: "/about-wellness.png", alt: "Wellness Studio" },
    { src: "/service-hair-styling.png", alt: "Hair Styling" },
    { src: "/service-facial.png", alt: "Facial Care" },
    { src: "/service-mani-pedi.png", alt: "Nail Care" },
    { src: "/gallery-1.png", alt: "Studio Interior Detail" },
];

const Gallery = () => {
    const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);

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
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="relative overflow-hidden rounded-3xl group cursor-pointer shadow-2xl"
                            onClick={() => setSelectedImage(image)}
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                width={800}
                                height={idx % 2 === 0 ? 1000 : 800}
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <div className="p-6 bg-white/20 rounded-full border border-white/30 backdrop-blur-sm transform scale-90 group-hover:scale-100 transition-transform duration-300">
                                    <span className="text-white text-xs tracking-widest uppercase font-sans">View Large</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-24 text-center">
                    <button
                        className="px-10 py-4 bg-charcoal text-white text-xs tracking-widest uppercase rounded-full hover:bg-rose-gold transition-colors duration-300 min-w-[250px] shadow-xl"
                    >
                        View Full Gallery
                    </button>
                </div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] bg-charcoal/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.button
                            initial={{ opacity: 0, rotate: -90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            className="absolute top-8 right-8 text-white p-2 z-10 hover:text-rose-gold transition-colors"
                            onClick={() => setSelectedImage(null)}
                        >
                            <FiX size={32} />
                        </motion.button>
                        
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="relative w-full max-w-5xl h-[80vh]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={selectedImage.src}
                                alt={selectedImage.alt}
                                fill
                                className="object-contain"
                                priority
                            />
                            <div className="absolute bottom-[-40px] left-0 right-0 text-center">
                                <p className="text-white/70 font-sans tracking-widest uppercase text-xs">
                                    {selectedImage.alt}
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Gallery;
