import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import { getAllSchedules } from '@/api/AcademyApi';
import { Calendar as CalendarIcon, Clock, MapPin, Users } from 'lucide-react';

const DAY_LABELS = {
  Monday: 'Lundi',
  Tuesday: 'Mardi',
  Wednesday: 'Mercredi',
  Thursday: 'Jeudi',
  Friday: 'Vendredi',
  Saturday: 'Samedi',
  Sunday: 'Dimanche',
};

const DAY_ORDER = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const SchedulePage = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const data = await getAllSchedules();
      setSchedules(data.data || []);
    } catch (error) {
      console.error('Failed to load schedules:', error);
    } finally {
      setLoading(false);
    }
  };

  // Group schedules by day
  const groupedByDay = DAY_ORDER.map(day => ({
    day,
    label: DAY_LABELS[day],
    slots: schedules.filter(s => s.dayOfWeek === day),
  })).filter(group => group.slots.length > 0);

  return (
    <>
      <Helmet>
        <title>Planning Hebdomadaire - ESPOIRS ACADEMY</title>
        <meta name="description" content="Consultez les horaires détaillés des entraînements pour le weekend à Espoirs Academy Béja." />
      </Helmet>
      <div className="bg-white min-h-screen flex flex-col">
        <Header />
        
        <div className="bg-red-600 text-white py-16 text-center">
            <h1 className="text-4xl font-bold mb-4">Planning des Entraînements</h1>
            <p className="text-red-100 max-w-2xl mx-auto px-4">
                Nos sessions se déroulent principalement le weekend pour s'adapter au rythme scolaire. 
                Des sessions individuelles sont possibles en semaine sur demande.
            </p>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            {loading ? (
              <div className="text-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Chargement du planning...</p>
              </div>
            ) : groupedByDay.length === 0 ? (
              <div className="text-center py-20">
                <CalendarIcon className="h-20 w-20 text-gray-300 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Aucun entraînement planifié</h3>
                <p className="text-gray-600">Le planning sera bientôt disponible.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-10">
                  {groupedByDay.map((group, index) => (
                      <div key={index} className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                          <div className="bg-gray-900 text-white p-6 flex items-center">
                              <CalendarIcon className="h-6 w-6 mr-3 text-red-500" />
                              <h2 className="text-2xl font-bold">{group.label}</h2>
                          </div>
                          <div className="divide-y divide-gray-100">
                              {group.slots.map((slot, i) => (
                                  <div key={i} className="p-6 hover:bg-gray-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between">
                                      <div>
                                          <h3 className="font-bold text-gray-900 text-lg mb-1">
                                            {slot.sportId?.name} {slot.groupName ? `- ${slot.groupName}` : ''}
                                          </h3>
                                          <div className="flex items-center text-gray-500 text-sm space-x-4">
                                            {slot.location && (
                                              <span className="flex items-center">
                                                <MapPin className="h-4 w-4 mr-1" /> {slot.location}
                                              </span>
                                            )}
                                            {slot.coachName && (
                                              <span className="flex items-center">
                                                <Users className="h-4 w-4 mr-1" /> {slot.coachName}
                                              </span>
                                            )}
                                          </div>
                                      </div>
                                      <div className="mt-3 sm:mt-0 flex items-center text-red-600 font-semibold bg-red-50 px-4 py-2 rounded-full w-fit">
                                          <Clock className="h-4 w-4 mr-2" />
                                          {slot.startTime} - {slot.endTime}
                                      </div>
                                  </div>
                              ))}
                          </div>
                      </div>
                  ))}
              </div>
            )}

            <div className="mt-16 bg-blue-50 p-8 rounded-xl border border-blue-100 text-center">
                <h3 className="text-xl font-bold text-blue-900 mb-2">Important</h3>
                <p className="text-blue-700">
                    Les horaires peuvent être modifiés en fonction des conditions météorologiques ou des tournois. 
                    Nous communiquons tout changement via notre groupe WhatsApp parents.
                </p>
            </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default SchedulePage;