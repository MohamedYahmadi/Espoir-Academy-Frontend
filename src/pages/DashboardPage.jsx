
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { getChildren, getSports } from '@/api/AcademyApi';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import { Users, Calendar, Trophy, Plus, ChevronRight } from 'lucide-react';

const DashboardPage = () => {
  const [children, setChildren] = useState([]);
  const [sports, setSports] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchData();
  }, [user, navigate]);

  const fetchData = async () => {
    try {
      const [childrenData, sportsData] = await Promise.all([
        getChildren(),
        getSports(),
      ]);
      setChildren(childrenData.data || []);
      setSports(sportsData.data || []);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les données.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Déconnexion réussie",
      description: "À bientôt !",
    });
    navigate('/');
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
        <title>Tableau de Bord - Espoirs Academy</title>
        <meta name="description" content="Espace parent - Gérez vos enfants et leurs inscriptions" />
      </Helmet>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        
        <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Bonjour, {user?.fullName?.split(' ')[0]} ! 👋
              </h1>
              <p className="text-lg text-gray-600">
                Bienvenue dans votre espace parent
              </p>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            >
              <Link to="/children">
                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow cursor-pointer">
                  <Users className="h-12 w-12 text-red-600 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Mes Enfants</h3>
                  <p className="text-gray-600 mb-4">Gérez les profils de vos enfants</p>
                  <div className="flex items-center text-red-600 font-semibold">
                    Voir les enfants <ChevronRight className="h-5 w-5 ml-1" />
                  </div>
                </div>
              </Link>

              <Link to="/schedule">
                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow cursor-pointer">
                  <Calendar className="h-12 w-12 text-red-600 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Planning</h3>
                  <p className="text-gray-600 mb-4">Consultez les horaires des sports</p>
                  <div className="flex items-center text-red-600 font-semibold">
                    Voir le planning <ChevronRight className="h-5 w-5 ml-1" />
                  </div>
                </div>
              </Link>

              <Link to="/pricing">
                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow cursor-pointer">
                  <Trophy className="h-12 w-12 text-red-600 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Sports & Tarifs</h3>
                  <p className="text-gray-600 mb-4">Découvrez nos programmes</p>
                  <div className="flex items-center text-red-600 font-semibold">
                    Voir les tarifs <ChevronRight className="h-5 w-5 ml-1" />
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Children Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-md p-8 border border-gray-100"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Mes Enfants</h2>
                <Link to="/children">
                  <Button className="bg-red-600 hover:bg-red-700 text-white">
                    <Plus className="h-5 w-5 mr-2" />
                    Ajouter un enfant
                  </Button>
                </Link>
              </div>

              {children.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">Vous n'avez pas encore enregistré d'enfants.</p>
                  <Link to="/children">
                    <Button className="bg-red-600 hover:bg-red-700 text-white">
                      Enregistrer mon premier enfant
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {children.map((child, idx) => (
                    <motion.div
                      key={child._id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                    >
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {child.firstName} {child.lastName}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        Né(e) le {new Date(child.dateOfBirth).toLocaleDateString('fr-FR')}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          {child.gender === 'Male' ? 'Garçon' : 'Fille'}
                        </span>
                        <div className="flex gap-2">
                          <Link to={`/children/${child._id}/enroll`}>
                            <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                              <Trophy className="h-4 w-4 mr-1" />
                              Inscrire
                            </Button>
                          </Link>
                          <Link to={`/children/${child._id}`}>
                            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                              Détails <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                          </Link>
                        </div>
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

export default DashboardPage;