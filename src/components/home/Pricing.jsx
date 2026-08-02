import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Pricing = () => {
  const plans = [
    {
      name: 'Découverte',
      price: '150',
      period: 'mois',
      description: 'Idéal pour commencer',
      features: [
        '4 sessions par mois',
        '1 sport au choix',
        'Équipement de base fourni',
        'Accès aux installations'
      ],
      popular: false
    },
    {
      name: 'Excellence',
      price: '250',
      period: 'mois',
      description: 'Le plus populaire',
      features: [
        '8 sessions par mois',
        '2 sports au choix',
        'Équipement complet fourni',
        'Accès prioritaire aux installations',
        'Suivi personnalisé',
        'Séances de coaching individuel'
      ],
      popular: true
    },
    {
      name: 'Champion',
      price: '400',
      period: 'mois',
      description: 'Formation complète',
      features: [
        'Sessions illimitées',
        'Tous les sports',
        'Équipement premium fourni',
        'Accès VIP aux installations',
        'Coach personnel dédié',
        'Programme nutritionnel',
        'Participation aux compétitions'
      ],
      popular: false
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Nos Tarifs</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Choisissez la formule qui correspond le mieux aux objectifs de votre enfant
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`rounded-lg shadow-lg overflow-hidden ${
                plan.popular ? 'ring-4 ring-red-600 transform scale-105' : 'bg-white'
              }`}
            >
              {plan.popular && (
                <div className="bg-red-600 text-white text-center py-2 font-semibold">
                  Le Plus Populaire
                </div>
              )}
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600 ml-2">DT / {plan.period}</span>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="h-5 w-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link to="/contact">
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? 'bg-red-600 hover:bg-red-700 text-white'
                        : 'bg-gray-900 hover:bg-gray-800 text-white'
                    }`}
                  >
                    Choisir ce plan
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;