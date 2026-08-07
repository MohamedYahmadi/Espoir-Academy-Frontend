import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { getChildById, getChildEnrollments } from '@/api/AcademyApi';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import { ArrowLeft, Calendar, Trophy, Trash2, Users, Pencil } from 'lucide-react';

const DAY_LABELS = {
  Monday: 'Lundi',
  Tuesday: 'Mardi',
  Wednesday: 'Mercredi',
  Thursday: 'Jeudi',
  Friday: 'Vendredi',
  Saturday: 'Samedi',
  Sunday: 'Dimanche',
};

const ChildDetailPage = () => {
  const { id } = useParams();
  const [child, setChild] = useState(null);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchData();
  }, [user, navigate, id]);

  const fetchData = async () => {
    try {
      const [childData, enrollmentsData] = await Promise.all([
        getChildById(id),
        getChildEnrollments(id),
      ]);
      setChild(childData.data);
      setEnrollments(enrollmentsData.data || []);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les détails.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
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

  if (!child) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 mb-4">Enfant non trouvé.</p>
            <Link to="/children">
              <Button className="bg-red-600 hover:bg-red-700 text-white">Retour à la liste</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{child.firstName} {child.lastName} - Espoirs Academy</title>
        <meta name="description" content={`Profil de ${child.firstName} ${child.lastName}`} />
      </Helmet>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        
        <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <Link to="/children">
                <Button variant="ghost" className="mb-4 text-gray-600 hover:text-red-600">
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Retour à la liste
                </Button>
              </Link>
              
              <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
                <div className="flex items-start gap-6">
                  {child.documents?.photoUrl ? (
                    <img
                      src={`http://localhost:5000/${child.documents.photoUrl}`}
                      alt={`${child.firstName} ${child.lastName}`}
                      className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                    />
                  ) : (
                    <div className="bg-red-100 rounded-full p-4">
                      <Users className="h-12 w-12 text-red-600" />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                          {child.firstName} {child.lastName}
                        </h1>
                        <p className="text-gray-600 mb-4">
                          {child.gender === 'Male' ? 'Garçon' : 'Fille'} • Né(e) le {new Date(child.dateOfBirth).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                      <Link to={`/children/${child._id}/edit`}>
                        <Button className="bg-red-600 hover:bg-red-700 text-white">
                          <Pencil className="h-5 w-5 mr-2" />
                          Modifier
                        </Button>
                      </Link>
                    </div>
                    {child.medicalNotes && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <p className="text-sm text-yellow-800">
                          <strong>Notes médicales:</strong> {child.medicalNotes}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Enrollments */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-md p-8 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Trophy className="h-8 w-8 text-red-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Inscriptions</h2>
                </div>
                <Link to={`/children/${child._id}/enroll`}>
                  <Button className="bg-red-600 hover:bg-red-700 text-white">
                    <Trophy className="h-5 w-5 mr-2" />
                    Nouvelle inscription
                  </Button>
                </Link>
              </div>

              {enrollments.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">Aucune inscription pour le moment.</p>
                  <Link to="/pricing">
                    <Button className="bg-red-600 hover:bg-red-700 text-white">
                      Voir les sports disponibles
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {enrollments.map((enrollment, idx) => (
                    <motion.div
                      key={enrollment._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">
                            {enrollment.sportId?.name}
                          </h3>
                          <p className="text-gray-600 text-sm">
                            {enrollment.sportId?.scheduleInfo}
                          </p>
                          {enrollment.schedule?.day && (
                            <p className="text-gray-600 text-sm">
                              Horaire choisi: {DAY_LABELS[enrollment.schedule.day] || enrollment.schedule.day} · {enrollment.schedule.startTime} - {enrollment.schedule.endTime}
                            </p>
                          )}
                          <p className="text-gray-500 text-sm mt-1">
                            Prix: {enrollment.sportId?.price} TND
                          </p>
                        </div>
                        <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                          enrollment.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                          enrollment.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {enrollment.status === 'PENDING' ? 'En attente' :
                           enrollment.status === 'APPROVED' ? 'Approuvé' : 'Rejeté'}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ChildDetailPage;