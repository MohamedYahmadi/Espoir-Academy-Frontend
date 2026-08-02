import React from 'react';
import { motion } from 'framer-motion';
import { Target, Award, Users } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: <Target className="h-12 w-12 text-red-600" />,
      title: 'Formation Complète',
      description: 'Programmes d\'entraînement personnalisés adaptés à chaque jeune athlète'
    },
    {
      icon: <Award className="h-12 w-12 text-red-600" />,
      title: 'Excellence Sportive',
      description: 'Encadrement professionnel par des coaches diplômés et expérimentés'
    },
    {
      icon: <Users className="h-12 w-12 text-red-600" />,
      title: 'Esprit d\'Équipe',
      description: 'Développement des valeurs sportives et du travail en équipe'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">À Propos de Nous</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            ESPOIRS ACADEMY est une académie sportive de référence située à Béja, dans le nord-ouest de la Tunisie. 
            Nous nous spécialisons dans la formation de jeunes talents âgés de 9 à 16 ans dans trois disciplines majeures.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{feature.title}</h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          <div>
            <img alt="ESPOIRS ACADEMY training facilities" className="rounded-lg shadow-xl w-full h-96 object-cover" src="https://images.unsplash.com/photo-1583599937230-fd86f496e52b" />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Notre Mission</h3>
            <p className="text-gray-600 mb-4">
              Nous croyons en l'importance de cultiver les talents dès le plus jeune âge. Notre mission est de fournir 
              un environnement d'apprentissage stimulant où chaque jeune peut développer ses compétences sportives, 
              sa discipline et son esprit d'équipe.
            </p>
            <p className="text-gray-600">
              Avec des installations modernes et un encadrement professionnel, nous préparons nos jeunes athlètes 
              à exceller dans leur sport tout en développant des valeurs essentielles pour la vie.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;