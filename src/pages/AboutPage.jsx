import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import { Target, Award, Users, Heart, Shield, Zap } from 'lucide-react';
const AboutPage = () => {
  const values = [{
    icon: <Heart className="h-8 w-8 text-red-600" />,
    title: "Passion",
    desc: "L'amour du sport est le moteur de tout apprentissage."
  }, {
    icon: <Shield className="h-8 w-8 text-red-600" />,
    title: "Intégrité",
    desc: "Honnêteté et fair-play sur et en dehors du terrain."
  }, {
    icon: <Zap className="h-8 w-8 text-red-600" />,
    title: "Excellence",
    desc: "Viser toujours plus haut, repousser ses limites."
  }, {
    icon: <Users className="h-8 w-8 text-red-600" />,
    title: "Communauté",
    desc: "Un esprit de famille solidaire et inclusif."
  }];
  return <>
      <Helmet>
        <title>À Propos - ESPOIRS ACADEMY</title>
        <meta name="description" content="Découvrez l'histoire et la vision d'ESPOIRS ACADEMY à Béja. Une école de vie dédiée à la formation des jeunes athlètes." />
      </Helmet>
      <div className="bg-white min-h-screen flex flex-col">
        <Header />
        
        {/* Hero Banner */}
        <div className="bg-black text-white py-20 text-center relative">
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black"></div>
            <img src="https://images.unsplash.com/photo-1526232761682-d26e03ac148e" alt="Team huddle" className="absolute inset-0 w-full h-full object-cover opacity-20" />
            <div className="relative z-10 max-w-4xl mx-auto px-4">
                <h1 className="text-4xl md:text-6xl font-extrabold mb-6">NOTRE HISTOIRE</h1>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">Plus qu'une académie, une école de vie pour la jeunesse de Béja.</p>
            </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            {/* Vision Section */}
            <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6 border-l-4 border-red-600 pl-4">Notre Vision</h2>
                    <p className="text-gray-600 text-lg mb-4 leading-relaxed">
                        Fondée en 2020, ESPOIRS ACADEMY est née d'un constat simple : la région de Béja regorge de talents bruts qui ne demandent qu'à être polis. Notre objectif était de créer une structure professionnelle capable de rivaliser avec les grands clubs de la capitale.
                    </p>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        Nous croyons fermement que le sport est un vecteur d'éducation puissant. Au-delà de la performance technique, nous formons des citoyens responsables, respectueux et ambitieux.
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <img src="https://images.unsplash.com/photo-1517466787929-bc90951d0974" alt="Kids playing" className="rounded-lg shadow-lg w-full h-48 object-cover" />
                    <img src="https://images.unsplash.com/photo-1599058945522-28d584b6f0ff" alt="Coach teaching" className="rounded-lg shadow-lg w-full h-48 object-cover mt-8" />
                </div>
            </div>

            {/* Values Section */}
            <div className="mb-20">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Nos Valeurs Fondamentales</h2>
                <div className="grid md:grid-cols-4 gap-8">
                    {values.map((val, i) => <div key={i} className="bg-gray-50 p-6 rounded-xl text-center hover:shadow-lg transition-shadow">
                            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                                {val.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-gray-900">{val.title}</h3>
                            <p className="text-gray-600">{val.desc}</p>
                        </div>)}
                </div>
            </div>

            {/* Team Section (Placeholder) */}
            <div className="bg-red-600 rounded-2xl p-12 text-white text-center">
                <h2 className="text-3xl font-bold mb-6">Une Équipe d'Experts</h2>
                <p className="text-xl text-red-100 mb-8 max-w-3xl mx-auto">
                    Notre staff technique est composé d'anciens joueurs professionnels et d'éducateurs diplômés d'État, unis par la même vocation : transmettre.
                </p>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-black/20 p-6 rounded-lg">
                        <h4 className="font-bold text-lg">Kamel Guettiti</h4>
                        <p className="text-red-200 text-sm">Directeur Technique (Football)</p>
                    </div>
                    <div className="bg-black/20 p-6 rounded-lg">
                        <h4 className="font-bold text-lg">Leila Trabelsi</h4>
                        <p className="text-red-200 text-sm">Coach Principale (Tennis)</p>
                    </div>
                    <div className="bg-black/20 p-6 rounded-lg">
                        <h4 className="font-bold text-lg">SOUHAIEL MEKNI</h4>
                        <p className="text-red-200 text-sm">Responsable Pôle (Basketball)</p>
                    </div>
                </div>
            </div>
        </div>

        <Footer />
      </div>
    </>;
};
export default AboutPage;