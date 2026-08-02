import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Home, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import { Helmet } from 'react-helmet';

const SuccessPage = () => {
  return (
    <>
      <Helmet>
        <title>Paiement Réussi - ESPOIRS ACADEMY</title>
      </Helmet>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center px-4 py-12">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Merci pour votre commande !</h1>
            <p className="text-gray-600 mb-8">
              Votre paiement a été traité avec succès. Vous recevrez bientôt un email de confirmation avec les détails de votre commande.
            </p>

            <div className="space-y-3">
              <Link to="/store" className="block w-full">
                <Button className="w-full bg-black hover:bg-gray-800 text-white py-6">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Continuer mes achats
                </Button>
              </Link>
              
              <Link to="/" className="block w-full">
                <Button variant="outline" className="w-full py-6 border-gray-300">
                  <Home className="mr-2 h-5 w-5" />
                  Retour à l'accueil
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default SuccessPage;