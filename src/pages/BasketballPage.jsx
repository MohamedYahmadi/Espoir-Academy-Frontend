import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import { motion } from 'framer-motion';
import { Check, Crosshair, Zap, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const BasketballPage = () => {
  return (
    <>
      <Helmet>
        <title>Programme Basketball - ESPOIRS ACADEMY</title>
        <meta name="description" content="Maîtrisez les fondamentaux du basketball avec nos experts. Dribble, shoot, défense et jeu d'équipe." />
      </Helmet>
      <div className="bg-white min-h-screen flex flex-col">
        <Header />
        
        {/* Hero */}
        <div className="relative h-[60vh] bg-black overflow-hidden">
            <div className="absolute inset-0 opacity-50">
                <img 
                    src="https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2000" 
                    alt="Basketball hoop indoor" 
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="relative h-full flex items-center justify-center text-center px-4">
                <div className="max-w-3xl">
                    <motion.h1 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-6xl md:text-8xl font-black text-white mb-4 tracking-tighter italic"
                    >
                        HOOPS
                    </motion.h1>
                    <p className="text-2xl text-red-500 font-bold uppercase tracking-widest mb-8">Le Rythme du Jeu</p>
                    <Link to="/contact">
                        <Button className="bg-white text-black hover:bg-gray-200 font-bold px-8 py-6 text-lg rounded-none skew-x-[-10deg]">
                            REJOINDRE L'ÉQUIPE
                        </Button>
                    </Link>
                </div>
            </div>
        </div>

        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-6">Dominez le Parquet</h2>
                    <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                        Le basketball moderne demande vitesse, précision et intelligence. Notre programme est conçu pour développer des joueurs complets capables d'évoluer à tous les postes. Nous mettons l'accent sur les fondamentaux individuels avant de les intégrer dans le collectif.
                    </p>
                    
                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="bg-orange-100 p-3 rounded-lg h-fit">
                                <Crosshair className="h-6 w-6 text-orange-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-xl">Shooting Lab</h3>
                                <p className="text-gray-600">Ateliers spécifiques pour parfaire la mécanique de tir et la régularité.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="bg-orange-100 p-3 rounded-lg h-fit">
                                <Zap className="h-6 w-6 text-orange-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-xl">Explosivité</h3>
                                <p className="text-gray-600">Préparation physique intégrée pour améliorer la détente et le premier pas.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="bg-orange-100 p-3 rounded-lg h-fit">
                                <Users className="h-6 w-6 text-orange-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-xl">QI Basket</h3>
                                <p className="text-gray-600">Séances vidéo et tactiques pour comprendre les systèmes de jeu.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute inset-0 bg-red-600 rounded-2xl transform rotate-3 translate-x-2 translate-y-2"></div>
                    <img 
                        src="https://images.unsplash.com/photo-1504450758481-7338eba7524a" 
                        alt="Basketball dribbling" 
                        className="relative rounded-2xl shadow-2xl w-full z-10 border-4 border-white"
                    />
                </div>
            </div>
        </section>

        {/* Focus Points */}
        <section className="bg-gray-900 text-white py-20">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-16">Objectifs par Catégorie</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-gray-800 p-8 rounded-xl hover:bg-gray-700 transition-colors border-t-4 border-orange-500">
                        <div className="text-orange-500 font-bold text-xl mb-4">U10-U12</div>
                        <ul className="space-y-3 text-gray-300">
                            <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-green-400" /> Apprentissage du dribble</li>
                            <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-green-400" /> Passe et réception</li>
                            <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-green-400" /> Double-pas (Layup)</li>
                        </ul>
                    </div>
                    <div className="bg-gray-800 p-8 rounded-xl hover:bg-gray-700 transition-colors border-t-4 border-orange-500">
                        <div className="text-orange-500 font-bold text-xl mb-4">U13-U14</div>
                        <ul className="space-y-3 text-gray-300">
                            <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-green-400" /> Tir en suspension</li>
                            <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-green-400" /> Défense homme à homme</li>
                            <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-green-400" /> Jeu de transition</li>
                        </ul>
                    </div>
                    <div className="bg-gray-800 p-8 rounded-xl hover:bg-gray-700 transition-colors border-t-4 border-orange-500">
                        <div className="text-orange-500 font-bold text-xl mb-4">U15-U16</div>
                        <ul className="space-y-3 text-gray-300">
                            <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-green-400" /> Systèmes offensifs</li>
                            <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-green-400" /> Lecture de la défense</li>
                            <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-green-400" /> Pick and Roll</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default BasketballPage;