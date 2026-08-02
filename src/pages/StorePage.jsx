import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import ProductsList from '@/components/ProductsList';

const StorePage = () => {
  return (
    <>
      <Helmet>
        <title>Boutique Officielle - ESPOIRS ACADEMY</title>
        <meta name="description" content="Équipez-vous comme un pro. Maillots, équipements d'entraînement et accessoires officiels ESPOIRS ACADEMY." />
      </Helmet>
      
      <div className="bg-white min-h-screen flex flex-col">
        <Header />
        
        {/* Hero / Banner */}
        <div className="bg-black text-white py-16 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <img 
              src="https://images.unsplash.com/photo-1515523110800-9415d13b84a8?q=80&w=2000&auto=format&fit=crop" 
              alt="Store Background" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <img 
                  src="https://horizons-cdn.hostinger.com/8a39f79e-fdf0-42d9-8aeb-03138b49031c/e5c698a7ed34ce7b5e115d22e6560772.png" 
                  alt="ESPOIRS ACADEMY Badge" 
                  className="w-24 h-24 md:w-32 md:h-32 object-contain drop-shadow-lg"
              />
              <div className="text-center md:text-left">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">BOUTIQUE <span className="text-red-600">OFFICIELLE</span></h1>
                <p className="text-lg text-gray-300 max-w-2xl">
                  Portez fièrement vos couleurs. Des équipements de qualité professionnelle pour l'entraînement et la compétition.
                </p>
              </div>
            </div>
          </div>
        </div>

        <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
          <ProductsList />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default StorePage;