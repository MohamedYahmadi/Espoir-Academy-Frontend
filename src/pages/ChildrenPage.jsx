import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { getChildren, deleteChild } from '@/api/AcademyApi';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import { Users, Plus, Trash2, ChevronRight, AlertCircle, Trophy, Camera } from 'lucide-react';

const ChildrenPage = () => {
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchChildren();
  }, [user, navigate]);

  const fetchChildren = async () => {
    try {
      const data = await getChildren();
      setChildren(data.data || []);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les enfants.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, firstName) => {
    if (!window.confirm(`Êtes-vous sûr de vouloir supprimer ${firstName} ?`)) {
      return;
    }

    try {
      await deleteChild(id);
      toast({
        title: "Enfant supprimé",
        description: `${firstName} a été supprimé avec succès.`,
      });
      fetchChildren();
    } catch (error) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de supprimer l'enfant.",
        variant: "destructive",
      });
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
        <title>Mes Enfants - Espoirs Academy</title>
        <meta name="description" content="Gérez les profils de vos enfants" />
      </Helmet>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        
        <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Mes Enfants</h1>
              <p className="text-lg text-gray-600">Gérez les profils de vos enfants</p>
            </motion.div>

            {children.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-md p-12 text-center border border-gray-100"
              >
                <Users className="h-20 w-20 text-gray-300 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Aucun enfant enregistré</h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Commencez par enregistrer votre premier enfant pour pouvoir l'inscrire à nos programmes sportifs.
                </p>
                <Link to="/children/register">
                  <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all">
                    <Plus className="h-6 w-6 mr-2" />
                    Enregistrer mon premier enfant
                  </Button>
                </Link>
              </motion.div>
            ) : (
              <>
                <div className="mb-6">
                  <Link to="/children/register">
                    <Button className="bg-red-600 hover:bg-red-700 text-white">
                      <Plus className="h-5 w-5 mr-2" />
                      Ajouter un enfant
                    </Button>
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {children.map((child, idx) => (
                    <motion.div
                      key={child._id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          {child.documents?.photoUrl ? (
                            <img
                              src={`http://localhost:5000/${child.documents.photoUrl}`}
                              alt={`${child.firstName} ${child.lastName}`}
                              className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                            />
                          ) : (
                            <div className="bg-red-100 rounded-full p-3">
                              <Users className="h-6 w-6 text-red-600" />
                            </div>
                          )}
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">
                              {child.firstName} {child.lastName}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {child.gender === 'Male' ? 'Garçon' : 'Fille'}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 mb-6">
                        <p className="text-sm text-gray-600">
                          <strong>Date de naissance:</strong> {new Date(child.dateOfBirth).toLocaleDateString('fr-FR')}
                        </p>
                        {child.medicalNotes && (
                          <p className="text-sm text-gray-600">
                            <strong>Notes médicales:</strong> {child.medicalNotes}
                          </p>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <Link to={`/children/${child._id}`} className="flex-1">
                          <Button variant="outline" className="w-full border-red-600 text-red-600 hover:bg-red-50">
                            Détails
                          </Button>
                        </Link>
                        <Link to={`/children/${child._id}/enroll`} className="flex-1">
                          <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                            <Trophy className="h-4 w-4 mr-1" />
                            Inscrire
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(child._id, child.firstName)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ChildrenPage;