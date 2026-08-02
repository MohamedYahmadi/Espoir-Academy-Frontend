import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import { Check, Trophy, Activity, Dumbbell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { getSports } from '@/api/AcademyApi';

const SPORT_ICONS = {
  'football': Trophy,
  'basketball': Activity,
  'tennis': Dumbbell,
};

const SPORT_COLORS = {
  'football': { icon: 'text-green-600', bg: 'bg-green-100', border: 'hover:border-green-500', btn: 'border-green-600 text-green-600 hover:bg-green-50', check: 'text-green-500' },
  'basketball': { icon: 'text-orange-600', bg: 'bg-orange-100', border: 'hover:border-orange-500', btn: 'bg-orange-600 hover:bg-orange-700 text-white', check: 'text-orange-500' },
  'tennis': { icon: 'text-yellow-500', bg: 'bg-yellow-500/20', border: 'hover:border-yellow-500', btn: 'bg-yellow-500 text-black hover:bg-yellow-400', check: 'text-yellow-500' },
};

const PricingPage = () => {
  const [sports, setSports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSports();
  }, []);

  const fetchSports = async () => {
    try {
      const data = await getSports();
      setSports(data.data || []);
    } catch (error) {
      console.error('Failed to load sports:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSportKey = (sport) => {
    const name = (sport.nameLatin || sport.name || '').toLowerCase();
    if (name.includes('foot')) return 'football';
    if (name.includes('basket')) return 'basketball';
    if (name.includes('tennis')) return 'tennis';
    return 'football';
  };

  return (
    <>
      <Helmet>
        <title>Tarifs & Inscriptions - ESPOIRS ACADEMY</title>
        <meta name="description" content="Découvrez nos formules pour le Football, Basketball et Tennis. Des tarifs adaptés à tous les niveaux." />
      </Helmet>
      <div className="bg-white min-h-screen flex flex-col">
        <Header />
        
        <div className="text-center py-20 bg-gray-50 px-4">
            <div className="flex justify-center mb-6">
               <img 
                  src="https://horizons-cdn.hostinger.com/8a39f79e-fdf0-42d9-8aeb-03138b49031c/e5c698a7ed34ce7b5e115d22e6560772.png" 
                  alt="ESPOIRS ACADEMY Badge" 
                  className="w-24 h-24 object-contain drop-shadow-md"
               />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Nos Académies Sportives</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Choisissez votre sport et rejoignez l'élite. Des programmes conçus pour la progression et le plaisir.
            </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-10">
            {loading ? (
              <div className="text-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Chargement des tarifs...</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-8">
                {sports.map((sport, index) => {
                  const key = getSportKey(sport);
                  const colors = SPORT_COLORS[key] || SPORT_COLORS.football;
                  const Icon = SPORT_ICONS[key] || Trophy;
                  const isPopular = index === 1;
                  
                  return (
                    <div key={sport._id} className={`bg-white rounded-2xl shadow-lg p-8 border border-gray-100 ${colors.border} transition-all flex flex-col relative ${isPopular ? 'border-2 transform md:-translate-y-4' : ''}`}>
                      {isPopular && (
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                          Populaire
                        </div>
                      )}
                      <div className={`w-12 h-12 ${colors.bg} rounded-full flex items-center justify-center mb-4 ${colors.icon}`}>
                        <Icon size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{sport.name}</h3>
                      {sport.nameLatin && (
                        <p className="text-gray-500 mb-6 text-sm">{sport.nameLatin}</p>
                      )}
                      <div className="text-5xl font-bold text-gray-900 mb-6">
                        {sport.price} <span className="text-lg text-gray-500 font-normal">DT / mois</span>
                      </div>
                      <Link to="/contact" className="mt-auto">
                        <Button variant="outline" className={`w-full mb-8 ${colors.btn}`}>S'inscrire</Button>
                      </Link>
                      <ul className="space-y-4 text-sm">
                        {sport.description && (
                          <li className="flex items-start"><Check className={`h-5 w-5 ${colors.check} mr-3 flex-shrink-0 mt-0.5`} /> {sport.description}</li>
                        )}
                        {sport.scheduleInfo && (
                          <li className="flex items-center"><Check className={`h-5 w-5 ${colors.check} mr-3 flex-shrink-0`} /> {sport.scheduleInfo}</li>
                        )}
                        <li className="flex items-center"><Check className={`h-5 w-5 ${colors.check} mr-3 flex-shrink-0`} /> Âge: {sport.minAge} - {sport.maxAge} ans</li>
                        <li className="flex items-center"><Check className={`h-5 w-5 ${colors.check} mr-3 flex-shrink-0`} /> Capacité: {sport.maxCapacity} enfants</li>
                      </ul>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="mt-20 max-w-3xl mx-auto text-center">
                <h3 className="text-2xl font-bold mb-6">Informations Pratiques</h3>
                <div className="space-y-6 text-left bg-gray-50 p-8 rounded-xl border border-gray-200">
                    <div>
                        <h4 className="font-bold text-lg mb-2">Frais d'inscription annuels</h4>
                        <p className="text-gray-600">Des frais de dossier et d'assurance de <span className="font-bold text-black">30 DT</span> sont payables une seule fois par an lors de l'inscription initiale.</p>
                    </div>
                    <div className="border-t border-gray-200 pt-4">
                        <h4 className="font-bold text-lg mb-2">Réductions Famille</h4>
                        <p className="text-gray-600">Inscrivez plusieurs enfants et bénéficiez de réductions : <span className="font-bold text-green-600">-10%</span> pour le 2ème enfant et <span className="font-bold text-green-600">-20%</span> à partir du 3ème.</p>
                    </div>
                    <div className="border-t border-gray-200 pt-4">
                        <h4 className="font-bold text-lg mb-2">Mode de paiement</h4>
                        <p className="text-gray-600">Le paiement s'effectue au début de chaque mois. Possibilité de paiement trimestriel avec <span className="font-bold text-black">5% de remise</span>.</p>
                    </div>
                </div>
            </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default PricingPage;