import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/home/Header';
import Contact from '@/components/home/Contact';
import Footer from '@/components/home/Footer';

const ContactPage = () => {
  return (
    <>
      <Helmet>
        <title>Contact & Localisation - ESPOIRS ACADEMY</title>
        <meta name="description" content="Prenez contact avec nous pour inscrire votre enfant ou poser vos questions. Situé au cœur de Béja." />
      </Helmet>
      <div className="bg-white min-h-screen flex flex-col">
        <Header />
        <div className="bg-black py-16 text-center">
             <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Parlons de vos ambitions</h1>
             <p className="text-gray-400 max-w-2xl mx-auto px-4">
                Notre équipe administrative est disponible pour répondre à toutes vos questions concernant les inscriptions, les horaires ou les programmes.
             </p>
        </div>
        <Contact />
        <Footer />
      </div>
    </>
  );
};

export default ContactPage;