import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import { motion } from 'framer-motion';
import { Check, Trophy, Calendar, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AuthAwareCTA from '@/components/AuthAwareCTA';
import { Link } from 'react-router-dom';

const FootballPage = () => {
  const curriculum = [
    { title: "U9-U11 (Initiation)", items: ["Conduite de balle", "Jeu réduit", "Plaisir du jeu", "Psychomotricité"] },
    { title: "U12-U14 (Préformation)", items: ["Technique individuelle", "Principes tactiques de base", "Jeu collectif", "Endurance aérobie"] },
    { title: "U15-U16 (Formation)", items: ["Tactique avancée", "Préparation physique spécifique", "Mental de compétition", "Spécialisation par poste"] }
  ];

  return (
    <>
      <Helmet>
        <title>Programme Football - ESPOIRS ACADEMY</title>
        <meta name="description" content="Formation footballistique d'élite à Béja. De l'initiation à la compétition pour les jeunes de 9 à 16 ans." />
      </Helmet>
      <div className="bg-white min-h-screen flex flex-col">
        <Header />
        
        {/* Hero Section */}
        <div className="relative h-[70vh] bg-black overflow-hidden">
            <div className="absolute inset-0 opacity-60">
                <img 
                    src="https://images.unsplash.com/photo-1574629810360-7efbbe4384d4?q=80&w=2000&auto=format&fit=crop" 
                    alt="Football field stadium" 
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            <div className="relative h-full flex items-center justify-center text-center px-4 max-w-5xl mx-auto mt-10">
                <div>
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-block mb-4 px-4 py-1 bg-red-600 text-white text-sm font-bold uppercase tracking-wider rounded-full"
                    >
                        Le Sport Roi
                    </motion.div>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight"
                    >
                        L'ÉCOLE DES <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">FUTURS CHAMPIONS</span>
                    </motion.h1>
                    <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto font-light">
                        Une méthodologie professionnelle inspirée des plus grands centres de formation européens, adaptée au talent local.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <AuthAwareCTA to="/contact" className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg rounded-full w-full sm:w-auto">
                            Réserver une séance d'essai
                        </AuthAwareCTA>
                    </div>
                </div>
            </div>
        </div>

        {/* Curriculum Section */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Un Cursus Complet</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">Notre programme évolutif accompagne votre enfant à chaque étape de sa croissance.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {curriculum.map((level, i) => (
                    <div key={i} className="bg-gray-50 rounded-xl p-8 hover:shadow-xl transition-all border-b-4 border-red-600 group">
                        <div className="bg-white w-14 h-14 rounded-full flex items-center justify-center mb-6 group-hover:bg-red-600 transition-colors">
                            <Trophy className="h-6 w-6 text-red-600 group-hover:text-white transition-colors" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-6">{level.title}</h3>
                        <ul className="space-y-3">
                            {level.items.map((item, idx) => (
                                <li key={idx} className="flex items-start text-gray-700">
                                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>

        {/* Info Grid */}
        <section className="bg-black text-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <img 
                        src="https://images.unsplash.com/photo-1529900748604-07564a03e7a6" 
                        alt="Coach talking to players" 
                        className="rounded-2xl shadow-2xl border-4 border-gray-800"
                    />
                </div>
                <div>
                    <h2 className="text-3xl font-bold mb-6">L'Expérience Espoirs Football</h2>
                    <p className="text-gray-400 mb-8 text-lg">
                        Nous ne formons pas seulement des joueurs, nous créons des athlètes intelligents. Notre approche met l'accent sur la compréhension du jeu, la prise de décision rapide et la maîtrise technique sous pression.
                    </p>
                    
                    <div className="space-y-6">
                        <div className="flex items-start">
                            <Calendar className="h-8 w-8 text-red-600 mr-4 mt-1" />
                            <div>
                                <h4 className="font-bold text-xl">Entraînements Hebdomadaires</h4>
                                <p className="text-gray-500">Séances intensives tous les Samedis et Dimanches matin.</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <UserPlus className="h-8 w-8 text-red-600 mr-4 mt-1" />
                            <div>
                                <h4 className="font-bold text-xl">Détection de Talents</h4>
                                <p className="text-gray-500">Passerelles vers les clubs professionnels pour les éléments les plus prometteurs.</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10">
                        <Link to="/schedule">
                            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black w-full sm:w-auto">
                                Voir les horaires détaillés
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default FootballPage;