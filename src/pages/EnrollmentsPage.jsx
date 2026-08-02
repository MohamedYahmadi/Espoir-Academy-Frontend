import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { getSports, createEnrollment } from '@/api/AcademyApi';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import { Trophy, Calendar, ChevronRight, AlertCircle } from 'lucide-react';
import { Label } from '@/components/ui/label';

const EnrollmentsPage = () => {
  const { childId } = useParams();
  const [sports, setSports] = useState([]);
  const [selectedSport, setSelectedSport] = useState('');
  const [schedule, setSchedule] = useState({ day: 'Monday', startTime: '16:00', endTime: '17:30' });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
      window.location.href = '/login';
      return;
    }
    fetchSports();
  }, [user]);

  const fetchSports = async () => {
    try {
      const data = await getSports();
      setSports(data.data || []);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les sports.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await createEnrollment({
        childId,
        sportId: selectedSport,
        schedule,
      });
      toast({
        title: "Inscription réussie ! 🎉",
        description: "Votre demande d'inscription a été soumise.",
      });
      window.location.href = `/children/${childId}`;
    } catch (error) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de soumettre l'inscription.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Inscription - Espoirs Academy</title>
        <meta name="description" content="Inscrivez votre enfant à un sport" />
      </Helmet>
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        
        <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <Link to={`/children/${childId}`} className="inline-flex items-center text-gray-600 hover:text-red-600 mb-4">
                <ChevronRight className="h-5 w-5 mr-1 rotate-180" />
                Retour au profil
              </Link>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Inscription à un sport</h1>
              <p className="text-lg text-gray-600">Choisissez le sport et l'horaire souhaités</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Choisir un sport</h3>
                  
                  <div className="grid grid-cols-1 gap-4">
                    {sports.map((sport) => (
                      <div
                        key={sport._id}
                        onClick={() => setSelectedSport(sport._id)}
                        className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
                          selectedSport === sport._id
                            ? 'border-red-600 bg-red-50'
                            : 'border-gray-200 hover:border-red-300'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4">
                            <div className={`rounded-full p-3 ${
                              selectedSport === sport._id ? 'bg-red-600' : 'bg-gray-100'
                            }`}>
                              <Trophy className={`h-6 w-6 ${
                                selectedSport === sport._id ? 'text-white' : 'text-gray-600'
                              }`} />
                            </div>
                            <div>
                              <h4 className="text-lg font-bold text-gray-900">{sport.name}</h4>
                              <p className="text-gray-600 text-sm mt-1">{sport.description}</p>
                              <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                                <span>💰 {sport.price} TND</span>
                                <span>👥 Max {sport.maxCapacity} enfants</span>
                                <span>📅 {sport.scheduleInfo}</span>
                              </div>
                            </div>
                          </div>
                          {selectedSport === sport._id && (
                            <div className="bg-red-600 text-white rounded-full p-1">
                              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedSport && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4 pt-6 border-t border-gray-200"
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Horaire</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="day" className="text-gray-700 font-medium">Jour</Label>
                        <select
                          id="day"
                          value={schedule.day}
                          onChange={(e) => setSchedule({ ...schedule, day: e.target.value })}
                          className="w-full h-12 px-4 border border-gray-300 rounded-md focus:border-red-500 focus:ring-red-500"
                          required
                        >
                          <option value="Monday">Lundi</option>
                          <option value="Tuesday">Mardi</option>
                          <option value="Wednesday">Mercredi</option>
                          <option value="Thursday">Jeudi</option>
                          <option value="Friday">Vendredi</option>
                          <option value="Saturday">Samedi</option>
                          <option value="Sunday">Dimanche</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="startTime" className="text-gray-700 font-medium">Heure de début</Label>
                        <Input
                          id="startTime"
                          type="time"
                          value={schedule.startTime}
                          onChange={(e) => setSchedule({ ...schedule, startTime: e.target.value })}
                          className="h-12 border-gray-300 focus:border-red-500 focus:ring-red-500"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="endTime" className="text-gray-700 font-medium">Heure de fin</Label>
                        <Input
                          id="endTime"
                          type="time"
                          value={schedule.endTime}
                          onChange={(e) => setSchedule({ ...schedule, endTime: e.target.value })}
                          className="h-12 border-gray-300 focus:border-red-500 focus:ring-red-500"
                          required
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-blue-800">
                      L'inscription sera soumise pour approbation. Vous recevrez une confirmation par email une fois validée par notre équipe.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Link to={`/children/${childId}`} className="flex-1">
                    <Button type="button" variant="outline" className="w-full h-12 rounded-full">
                      Annuler
                    </Button>
                  </Link>
                  <Button
                    type="submit"
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white h-12 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
                    disabled={!selectedSport || submitting}
                  >
                    {submitting ? 'Inscription...' : "S'inscrire"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default EnrollmentsPage;