import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-3 mb-6">
              <img 
                 src="https://horizons-cdn.hostinger.com/8a39f79e-fdf0-42d9-8aeb-03138b49031c/e5c698a7ed34ce7b5e115d22e6560772.png" 
                 alt="ESPOIRS ACADEMY" 
                 className="w-12 h-12 object-contain"
              />
              <div>
                <span className="text-2xl font-bold text-red-600 block leading-none">ESPOIRS</span>
                <span className="text-xl font-bold text-white block leading-none">ACADEMY</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Former les champions de demain à Béja, Tunisie. Excellence, discipline et passion.
            </p>
          </div>

          <div>
            <span className="text-lg font-semibold mb-4 block">Navigation</span>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-red-600 transition-colors">Accueil</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-red-600 transition-colors">À Propos</Link></li>
              <li><Link to="/schedule" className="text-gray-400 hover:text-red-600 transition-colors">Planning</Link></li>
              <li><Link to="/pricing" className="text-gray-400 hover:text-red-600 transition-colors">Tarifs</Link></li>
              <li><Link to="/store" className="text-gray-400 hover:text-red-600 transition-colors">Boutique</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-red-600 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <span className="text-lg font-semibold mb-4 block">Nos Sports</span>
            <ul className="space-y-2">
              <li><Link to="/football" className="text-gray-400 hover:text-red-600 transition-colors">Football</Link></li>
              <li><Link to="/basketball" className="text-gray-400 hover:text-red-600 transition-colors">Basketball</Link></li>
              <li><Link to="/tennis" className="text-gray-400 hover:text-red-600 transition-colors">Tennis</Link></li>
            </ul>
          </div>

          <div>
            <span className="text-lg font-semibold mb-4 block">Suivez-nous</span>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="text-gray-400 hover:text-red-600 transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-600 transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-600 transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center text-gray-400">
                <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                <span>Béja, Tunisie</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
                <span>+216 78 450 123</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Mail className="h-4 w-4 mr-2 flex-shrink-0" />
                <span>contact@espoirsacademy.tn</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            &copy; 2025 ESPOIRS ACADEMY. Tous droits réservés.
          </p>
          <p className="text-gray-600 text-xs mt-2">
            Site créé par Bilel Amdouni
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;