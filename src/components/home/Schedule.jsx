import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock } from 'lucide-react';

const Schedule = () => {
  const schedules = [
    {
      day: 'Samedi',
      sessions: [
        { sport: 'Football', time: '09:00 - 11:00', level: 'Débutants (9-12 ans)' },
        { sport: 'Basketball', time: '11:30 - 13:30', level: 'Intermédiaire (12-14 ans)' },
        { sport: 'Tennis', time: '14:00 - 16:00', level: 'Avancé (14-16 ans)' }
      ]
    },
    {
      day: 'Dimanche',
      sessions: [
        { sport: 'Tennis', time: '09:00 - 11:00', level: 'Débutants (9-12 ans)' },
        { sport: 'Football', time: '11:30 - 13:30', level: 'Avancé (14-16 ans)' },
        { sport: 'Basketball', time: '14:00 - 16:00', level: 'Tous niveaux (9-16 ans)' }
      ]
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
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Horaires d'Entraînement</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Sessions d'entraînement organisées chaque week-end pour tous les niveaux
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {schedules.map((schedule, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <div className="flex items-center mb-6">
                <Calendar className="h-8 w-8 text-red-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900">{schedule.day}</h3>
              </div>
              
              <div className="space-y-4">
                {schedule.sessions.map((session, idx) => (
                  <div key={idx} className="border-l-4 border-red-600 pl-4 py-3 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-bold text-gray-900 text-lg">{session.sport}</h4>
                      <div className="flex items-center text-gray-600">
                        <Clock className="h-4 w-4 mr-1" />
                        <span className="text-sm font-medium">{session.time}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">{session.level}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Schedule;