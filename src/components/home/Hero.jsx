import React from 'react';
import { motion } from 'framer-motion';
import AuthAwareCTA from '@/components/AuthAwareCTA';

const Hero = () => {
  return (
    <section id="accueil" className="relative bg-black text-white py-20 lg:py-32 overflow-hidden flex items-center">
      <div className="absolute inset-0 opacity-30">
        <img alt="Young athletes training at sports academy" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1554030040-af6e5a6e8892" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col items-center text-center">
          {/* Logo removed from here */}
          {/*
          <motion.div
             initial={{ opacity: 0, scale: 0.8, y: -20 }}
             animate={{ opacity: 1, scale: 1, y: 0 }}
             transition={{ duration: 0.8, ease: "easeOut" }}
             className="mb-8"
          >
             <img 
               src="https://horizons-cdn.hostinger.com/8a39f79e-fdf0-42d9-8aeb-03138b49031c/e5c698a7ed34ce7b5e115d22e6560772.png" 
               alt="ESPOIRS ACADEMY Logo Badge" 
               className="w-32 h-32 md:w-48 md:h-48 object-contain drop-shadow-2xl"
             />
          </motion.div>
          */}

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            ESPOIRS <span className="text-red-600">ACADEMY</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
            className="text-xl md:text-2xl mb-8 text-gray-300"
          >
            Formez les champions de demain à Béja, Tunisie
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
            className="text-lg mb-12 text-gray-400 max-w-3xl mx-auto"
          >
            Football · Basketball · Tennis | Jeunes 9-16 ans
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <AuthAwareCTA to="/children" className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
              Rejoignez-nous
            </AuthAwareCTA>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;