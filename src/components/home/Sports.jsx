import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Sports = () => {
  const sports = [
    {
      name: 'Football',
      description: 'Formation d\'élite pour les futures stars du ballon rond',
      image_alt: 'Cinematic shot of a futuristic football stadium with a glowing ball',
      image_prompt: 'A dramatic, high-quality cinematic shot of a football (soccer) lying on the grass of a professional stadium at night, illuminated by stadium lights, lens flare, hyper-realistic, 8k resolution',
      link: '/football'
    },
    {
      name: 'Basketball',
      description: 'Maîtrisez le terrain avec nos experts NBA-ready',
      image_alt: 'Intense basketball action shot in a modern arena',
      image_prompt: 'A dynamic, high-energy action shot of a basketball player mid-air about to dunk, dramatic lighting, neon accents, modern arena background, highly detailed, 8k',
      link: '/basketball'
    },
    {
      name: 'Tennis',
      description: 'Service, volée et match : l\'excellence du court',
      image_alt: 'Professional tennis racket and ball on clay court',
      image_prompt: 'Close-up artistic shot of a tennis racket hitting a ball, dust flying from the clay court, sunlight streaming through, motion blur, cinematic lighting, 8k',
      link: '/tennis'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Nos Disciplines</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Découvrez nos programmes spécialisés conçus pour développer le potentiel de chaque athlète.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sports.map((sport, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.3, ease: "easeOut" }}
              className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer h-[450px] border border-gray-100"
            >
              <img 
                alt={sport.image_alt} 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
               src="https://images.unsplash.com/photo-1511191091785-be603c1a338e" />
               
               <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
               
               <div className="absolute inset-0 flex flex-col justify-end p-8 text-white z-10">
                 <motion.h3 
                    className="text-4xl font-bold mb-3"
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 + (index * 0.2) }}
                 >
                    {sport.name}
                 </motion.h3>
                 <p className="text-gray-200 text-lg mb-8 translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                   {sport.description}
                 </p>
                 <Link to={sport.link}>
                   <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.3 }}>
                     <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black w-full bg-transparent backdrop-blur-sm">
                       Découvrir le Programme <ArrowRight className="ml-2 h-4 w-4" />
                     </Button>
                   </motion.div>
                 </Link>
               </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sports;