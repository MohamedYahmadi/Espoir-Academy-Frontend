import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getSports } from '@/api/AcademyApi';
import { Button } from '@/components/ui/button';
import AuthAwareCTA from '@/components/AuthAwareCTA';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import { Check, Calendar, MapPin, Users, ArrowLeft, Trophy, Clock } from 'lucide-react';

const DAY_LABELS = {
  Monday: 'Lundi',
  Tuesday: 'Mardi',
  Wednesday: 'Mercredi',
  Thursday: 'Jeudi',
  Friday: 'Vendredi',
  Saturday: 'Samedi',
  Sunday: 'Dimanche',
};

const SportDetailPage = () => {
  const { id } = useParams();
  const [sport, setSport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allSports, setAllSports] = useState([]);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const data = await getSports();
      const sportsList = data.data || [];
      setAllSports(sportsList);
      const found = sportsList.find(s => s._id === id);
      setSport(found || null);
    } catch (error) {
      console.error('Failed to load sport:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!sport) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Sport non trouvé</h1>
            <Link to="/">
              <Button className="bg-red-600 hover:bg-red-700 text-white">Retour à l'accueil</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const currentIndex = allSports.findIndex(s => s._id === id);
  const nextSport = allSports[currentIndex + 1];

  return (
    <>
      <Helmet>
        <title>{sport.name} - Espoirs Academy</title>
        <meta name="description" content={sport.description} />
      </Helmet>
      <div className="bg-white min-h-screen flex flex-col">
        <Header />

        {/* Hero Section */}
        <div className="relative h-[60vh] bg-black overflow-hidden">
          <div className="absolute inset-0 opacity-40">
            <img 
              src="https://images.unsplash.com/photo-1574629810360-7efbbe4384d4?q=80&w=2000&auto=format&fit=crop" 
              alt={sport.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          <div className="relative h-full flex items-center justify-center text-center px-4 max-w-5xl mx-auto">
            <div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-block mb-4 px-4 py-1 bg-red-600 text-white text-sm font-bold uppercase tracking-wider rounded-full"
              >
                {sport.name}
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight"
              >
                {sport.name}
              </motion.h1>
              {sport.nameLatin && (
                <p className="text-xl text-gray-300 mb-8">{sport.nameLatin}</p>
              )}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <AuthAwareCTA to="/contact" className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg rounded-full w-full sm:w-auto">
                  Réserver un essai
                </AuthAwareCTA>
                <Link to="/pricing">
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black px-8 py-6 text-lg rounded-full w-full sm:w-auto">
                    Voir les tarifs
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">À propos du programme</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {sport.description || "Un programme d'entraînement complet conçu pour développer les compétences et la forme physique des jeunes."}
              </p>
              
              <div className="space-y-4">
                {sport.minAge && sport.maxAge && (
                  <div className="flex items-start">
                    <Users className="h-6 w-6 text-red-600 mr-4 mt-1" />
                    <div>
                      <h4 className="font-bold text-lg">Tranche d'âge</h4>
                      <p className="text-gray-600">De {sport.minAge} à {sport.maxAge} ans</p>
                    </div>
                  </div>
                )}
                {sport.maxCapacity && (
                  <div className="flex items-start">
                    <Users className="h-6 w-6 text-red-600 mr-4 mt-1" />
                    <div>
                      <h4 className="font-bold text-lg">Capacité maximale</h4>
                      <p className="text-gray-600">{sport.maxCapacity} élèves</p>
                    </div>
                  </div>
                )}
                {sport.scheduleInfo && (
                  <div className="flex items-start">
                    <Clock className="h-6 w-6 text-red-600 mr-4 mt-1" />
                    <div>
                      <h4 className="font-bold text-lg">Horaires</h4>
                      <p className="text-gray-600">{sport.scheduleInfo}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
              <div className="text-center mb-6">
                <p className="text-gray-600 mb-2">Frais mensuels</p>
                <p className="text-5xl font-bold text-red-600">{sport.price} <span className="text-2xl">DT</span></p>
              </div>
              <AuthAwareCTA to="/children" className="block w-full bg-red-600 hover:bg-red-700 text-white py-6 text-lg rounded-full">
                S'inscrire
              </AuthAwareCTA>
            </div>
          </div>
        </section>

        {/* Navigation to other sports */}
        {nextSport && (
          <section className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Link to={`/sport/${nextSport._id}`} className="block">
                <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100 hover:shadow-lg transition-shadow">
                  <p className="text-sm text-gray-500 mb-2">Sport suivant</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{nextSport.name}</h3>
                      {nextSport.nameLatin && (
                        <p className="text-gray-600">{nextSport.nameLatin}</p>
                      )}
                    </div>
                    <ArrowLeft className="h-6 w-6 text-red-600" />
                  </div>
                </div>
              </Link>
            </div>
          </section>
        )}

        <Footer />
      </div>
    </>
  );
};

export default SportDetailPage;