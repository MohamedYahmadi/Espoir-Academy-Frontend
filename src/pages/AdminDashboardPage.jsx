import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { getSports, getUsers } from '@/api/AcademyApi';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import { Users, Trophy, Settings, LogOut, ChevronRight, Plus, Calendar } from 'lucide-react';

const AdminDashboardPage = () => {
  const [sports, setSports] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
      return;
    }
    fetchData();
  }, [user, navigate]);

  const fetchData = async () => {
    try {
      const [sportsData, usersData] = await Promise.all([
        getSports(),
        getUsers(),
      ]);
      setSports(sportsData.data || []);
      setUsers(usersData.data || []);
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
        <title>Administration - Espoirs Academy</title>
        <meta name="description" content="Panneau d'administration" />
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
                Administration 👋
              </h1>
              <p className="text-lg text-gray-600">
                Gérez les sports, utilisateurs et inscriptions
              </p>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
            >
              <Link to="/admin-secret-backoffice/sports">
                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow cursor-pointer">
                  <Trophy className="h-12 w-12 text-red-600 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Gérer les Sports</h3>
                  <p className="text-gray-600 mb-4">Ajouter, modifier ou supprimer des sports</p>
                  <div className="flex items-center text-red-600 font-semibold">
                    Voir les sports <ChevronRight className="h-5 w-5 ml-1" />
                  </div>
                </div>
              </Link>

              <Link to="/admin-secret-backoffice/users">
                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow cursor-pointer">
                  <Users className="h-12 w-12 text-red-600 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Gérer les Utilisateurs</h3>
                  <p className="text-gray-600 mb-4">Voir et gérer les comptes parents</p>
                  <div className="flex items-center text-red-600 font-semibold">
                    Voir les utilisateurs <ChevronRight className="h-5 w-5 ml-1" />
                  </div>
                </div>
              </Link>

              <Link to="/admin-secret-backoffice/enrollments">
                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow cursor-pointer">
                  <Settings className="h-12 w-12 text-red-600 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Inscriptions</h3>
                  <p className="text-gray-600 mb-4">Approuver ou rejeter les demandes</p>
                  <div className="flex items-center text-red-600 font-semibold">
                    Voir les inscriptions <ChevronRight className="h-5 w-5 ml-1" />
                  </div>
                </div>
              </Link>

              <Link to="/admin-secret-backoffice/schedules">
                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow cursor-pointer">
                  <Calendar className="h-12 w-12 text-red-600 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Planning</h3>
                  <p className="text-gray-600 mb-4">Gérer les horaires des entraînements</p>
                  <div className="flex items-center text-red-600 font-semibold">
                    Voir le planning <ChevronRight className="h-5 w-5 ml-1" />
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Total Sports</p>
                    <p className="text-3xl font-bold text-gray-900">{sports.length}</p>
                  </div>
                  <Trophy className="h-12 w-12 text-red-600" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Total Utilisateurs</p>
                    <p className="text-3xl font-bold text-gray-900">{users.length}</p>
                  </div>
                  <Users className="h-12 w-12 text-red-600" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Rôle</p>
                    <p className="text-3xl font-bold text-gray-900">Admin</p>
                  </div>
                  <Settings className="h-12 w-12 text-red-600" />
                </div>
              </div>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default AdminDashboardPage;