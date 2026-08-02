import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import { motion } from 'framer-motion';
import { Check, Circle, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const TennisPage = () => {
  return (
    <>
      <Helmet>
        <title>Programme Tennis - ESPOIRS ACADEMY</title>
        <meta name="description" content="L'école de tennis de référence à Béja. Cours collectifs et individuels sur terre battue et dur." />
      </Helmet>
      <div className="bg-white min-h-screen flex flex-col">
        <Header />
        
        {/* Hero */}
        <div className="relative h-[60vh] bg-green-900 overflow-hidden">
            <div className="absolute inset-0 opacity-60">
                <img 
                    src="https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=2000" 
                    alt="Tennis clay court" 
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="relative h-full flex items-center justify-center px-4">
                <div className="text-center bg-white/10 backdrop-blur-md p-10 rounded-2xl border border-white/20">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold text-white mb-2 font-serif"
                    >
                        ACADÉMIE TENNIS
                    </motion.h1>
                    <p className="text-xl text-yellow-400 font-medium mb-8">Élégance • Précision • Performance</p>
                    <Link to="/contact">
                        <Button className="bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold px-8 py-6 rounded-full">
                            Réserver un court
                        </Button>
                    </Link>
                </div>
            </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
                <div className="order-2 md:order-1">
                    <img 
                        src="https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0" 
                        alt="Tennis player serving" 
                        className="rounded-2xl shadow-2xl"
                    />
                </div>
                <div className="order-1 md:order-2">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Une Pédagogie Moderne</h2>
                    <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                        Le tennis est un sport individuel qui se vit en équipe chez Espoirs Academy. Nous utilisons la méthode du "Tennis Evolutif", adaptant la taille du terrain, les balles et les raquettes au niveau de l'enfant pour garantir le succès dès les premiers échanges.
                    </p>
                    <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-600">
                        <h3 className="font-bold text-lg mb-2 flex items-center"><Activity className="w-5 h-5 mr-2 text-green-600"/> Le Mental de Champion</h3>
                        <p className="text-gray-700">
                            Nous accordons une importance capitale à la gestion des émotions, la concentration et la résilience, qualités essentielles du joueur de tennis.
                        </p>
                    </div>
                </div>
            </div>

            {/* Levels */}
            <div className="grid md:grid-cols-3 gap-8 text-center">
                <div className="p-6 border border-gray-200 rounded-xl hover:border-yellow-400 transition-colors">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Circle className="text-red-500 fill-current w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Mini-Tennis (5-8 ans)</h3>
                    <p className="text-gray-500 text-sm">Découverte ludique, motricité et premiers échanges sur terrain réduit.</p>
                </div>
                <div className="p-6 border border-gray-200 rounded-xl hover:border-yellow-400 transition-colors">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Circle className="text-orange-500 fill-current w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Initiation (9-12 ans)</h3>
                    <p className="text-gray-500 text-sm">Acquisition des bases techniques : coup droit, revers, service à plat.</p>
                </div>
                <div className="p-6 border border-gray-200 rounded-xl hover:border-yellow-400 transition-colors">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Circle className="text-green-600 fill-current w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Perfectionnement (13+ ans)</h3>
                    <p className="text-gray-500 text-sm">Renforcement tactique, effets (lift, slice) et préparation physique.</p>
                </div>
            </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default TennisPage;