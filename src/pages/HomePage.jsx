import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/home/Header';
import Hero from '@/components/home/Hero';
import Sports from '@/components/home/Sports';
import Footer from '@/components/home/Footer';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Star, Users, Trophy, Activity, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';

const HomePage = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    
    toast({
      title: "Inscription réussie ! 📬",
      description: "Merci de vous être abonné à notre newsletter.",
    });
    setEmail('');
  };

  return (
    <>
      <Helmet>
        <title>ESPOIRS ACADEMY - L'Excellence Sportive à Béja</title>
        <meta name="description" content="Rejoignez ESPOIRS ACADEMY, le centre de formation d'élite pour le football, basketball et tennis à Béja. Pour les jeunes de 9 à 16 ans." />
      </Helmet>
      <div className="bg-white flex flex-col min-h-screen">
        <Header />
        <Hero />
        
        {/* Stats Section */}
        <section className="py-12 bg-black text-white">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "500+", label: "Athlètes Formés" },
              { number: "15+", label: "Coaches Certifiés" },
              { number: "3", label: "Disciplines" },
              { number: "100%", label: "Passion" },
            ].map((stat, idx) => (
               <motion.div 
                 key={idx}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.6, delay: idx * 0.1 }}
               >
                  <div className="text-4xl font-bold text-red-600 mb-2">{stat.number}</div>
                  <div className="text-gray-400 text-sm uppercase tracking-widest">{stat.label}</div>
               </motion.div>
            ))}
          </div>
        </section>

        <Sports />

        {/* Why Choose Us */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
                className="text-center mb-16"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Pourquoi Choisir Espoirs Academy ?</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Plus qu'un club, nous sommes une famille dédiée à la réussite de votre enfant, sur et en dehors du terrain.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-10">
              <motion.div 
                className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-red-600"
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Users className="h-12 w-12 text-red-600 mb-6" />
                <h3 className="text-xl font-bold mb-3">Encadrement Premium</h3>
                <p className="text-gray-600">
                  Nos entraîneurs ne sont pas seulement des experts techniques, mais des mentors dévoués au développement personnel de chaque jeune.
                </p>
              </motion.div>
              <motion.div 
                className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-red-600"
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Trophy className="h-12 w-12 text-red-600 mb-6" />
                <h3 className="text-xl font-bold mb-3">Compétitions & Tournois</h3>
                <p className="text-gray-600">
                  Participation régulière aux tournois régionaux et nationaux pour forger l'esprit de compétition et l'expérience du match.
                </p>
              </motion.div>
              <motion.div 
                className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-red-600"
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Activity className="h-12 w-12 text-red-600 mb-6" />
                <h3 className="text-xl font-bold mb-3">Suivi de Performance</h3>
                <p className="text-gray-600">
                  Utilisation de technologies modernes pour suivre les progrès physiques et techniques, avec des rapports réguliers aux parents.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">La Parole aux Parents</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div 
                className="bg-gray-50 p-8 rounded-xl relative"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex text-yellow-400 mb-4">
                  <Star className="fill-current h-5 w-5" /><Star className="fill-current h-5 w-5" /><Star className="fill-current h-5 w-5" /><Star className="fill-current h-5 w-5" /><Star className="fill-current h-5 w-5" />
                </div>
                <p className="text-gray-700 italic mb-6">"Depuis que mon fils a rejoint la section football, j'ai vu une transformation incroyable. Non seulement sa technique s'est améliorée, mais il est plus discipliné et confiant à l'école."</p>
                <div className="font-bold text-gray-900">- Mohamed T., Papa de Youssef (12 ans)</div>
              </motion.div>
              <motion.div 
                className="bg-gray-50 p-8 rounded-xl relative"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex text-yellow-400 mb-4">
                  <Star className="fill-current h-5 w-5" /><Star className="fill-current h-5 w-5" /><Star className="fill-current h-5 w-5" /><Star className="fill-current h-5 w-5" /><Star className="fill-current h-5 w-5" />
                </div>
                <p className="text-gray-700 italic mb-6">"L'approche pédagogique pour le tennis est excellente. Les coaches sont patients et motivants. Ma fille attend chaque weekend avec impatience !"</p>
                <div className="font-bold text-gray-900">- Sarah B., Maman de Nour (10 ans)</div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 bg-gray-100">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-200"
                >
                    <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Mail className="h-8 w-8 text-red-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Restez Informé</h2>
                    <p className="text-gray-600 mb-8 max-w-lg mx-auto">
                        Abonnez-vous à notre newsletter pour recevoir les dernières actualités du club, les dates des tournois et nos offres exclusives sur la boutique.
                    </p>
                    <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input 
                            type="email" 
                            placeholder="Votre adresse email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="flex-grow px-6 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                            required
                        />
                        <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white rounded-full px-8 py-3">
                            S'abonner
                        </Button>
                    </form>
                </motion.div>
            </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-24 bg-red-600 text-white relative overflow-hidden">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
           <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
             <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">Le Futur Commence Ici</h2>
             <p className="text-xl md:text-2xl text-red-100 mb-10 font-light">
               Ne laissez pas le talent de votre enfant inexploité. Rejoignez l'élite sportive de Béja dès aujourd'hui.
             </p>
             <div className="flex flex-col sm:flex-row justify-center gap-4">
               <Link to="/contact">
                 <Button className="bg-black hover:bg-gray-900 text-white px-10 py-7 text-lg font-bold rounded-full w-full sm:w-auto shadow-xl hover:scale-105 transition-transform">
                   Inscrire mon enfant
                 </Button>
               </Link>
               <Link to="/schedule">
                 <Button variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-red-600 px-10 py-7 text-lg font-bold rounded-full w-full sm:w-auto transition-colors">
                   Voir le planning
                 </Button>
               </Link>
             </div>
           </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default HomePage;