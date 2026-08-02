import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { getAllEnrollments, updateEnrollmentStatus } from '@/api/AcademyApi';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import { ArrowLeft, CheckCircle, XCircle, Users } from 'lucide-react';

const AdminEnrollmentsPage = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      window.location.href = '/login';
      return;
    }
    fetchEnrollments();
  }, [user, filter]);

  const fetchEnrollments = async () => {
    try {
      const data = await getAllEnrollments();
      let filtered = data.data || [];
      if (filter !== 'all') {
        filtered = filtered.filter(e => e.status === filter.toUpperCase());
      }
      setEnrollments(filtered);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les inscriptions.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await updateEnrollmentStatus(id, newStatus);
      toast({ title: `Inscription ${newStatus === 'APPROVED' ? 'approuvée' : 'rejetée'} avec succès` });
      fetchEnrollments();
    } catch (error) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de mettre à jour le statut.",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'APPROVED':
        return 'bg-green-100 text-green-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'REJECTED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'APPROVED':
        return 'Approuvé';
      case 'PENDING':
        return 'En attente';
      case 'REJECTED':
        return 'Rejeté';
      default:
        return status;
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
        <title>Gestion des Inscriptions - Administration</title>
        <meta name="description" content="Gérer les inscriptions" />
      </Helmet>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        
        <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <Link to="/admin-secret-backoffice">
                <Button variant="ghost" className="mb-4 text-gray-600 hover:text-red-600">
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Retour au tableau de bord
                </Button>
              </Link>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Gestion des Inscriptions</h1>
              <p className="text-lg text-gray-600">Approuver ou rejeter les demandes d'inscription</p>
            </div>

            {/* Filter */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 mb-8">
              <div className="flex gap-2">
                <Button
                  onClick={() => setFilter('all')}
                  variant={filter === 'all' ? 'default' : 'outline'}
                  className={filter === 'all' ? 'bg-red-600 hover:bg-red-700' : ''}
                >
                  Toutes
                </Button>
                <Button
                  onClick={() => setFilter('pending')}
                  variant={filter === 'pending' ? 'default' : 'outline'}
                  className={filter === 'pending' ? 'bg-red-600 hover:bg-red-700' : ''}
                >
                  En attente
                </Button>
                <Button
                  onClick={() => setFilter('approved')}
                  variant={filter === 'approved' ? 'default' : 'outline'}
                  className={filter === 'approved' ? 'bg-red-600 hover:bg-red-700' : ''}
                >
                  Approuvées
                </Button>
                <Button
                  onClick={() => setFilter('rejected')}
                  variant={filter === 'rejected' ? 'default' : 'outline'}
                  className={filter === 'rejected' ? 'bg-red-600 hover:bg-red-700' : ''}
                >
                  Rejetées
                </Button>
              </div>
            </div>

            {enrollments.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-md p-12 text-center border border-gray-100"
              >
                <Users className="h-20 w-20 text-gray-300 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Aucune inscription</h3>
                <p className="text-gray-600">Aucune inscription ne correspond à ce filtre.</p>
              </motion.div>
            ) : (
              <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enfant</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parent</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sport</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {enrollments.map((enrollment, idx) => (
                        <motion.tr
                          key={enrollment._id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="hover:bg-gray-50"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {enrollment.childId?.firstName} {enrollment.childId?.lastName}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-600">
                              {enrollment.childId?.parentId?.fullName}
                            </div>
                            <div className="text-xs text-gray-500">
                              {enrollment.childId?.parentId?.email}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {enrollment.sportId?.name}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(enrollment.status)}`}>
                              {getStatusText(enrollment.status)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-600">
                              {new Date(enrollment.submittedAt).toLocaleDateString('fr-FR')}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            {enrollment.status === 'PENDING' && (
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  onClick={() => handleStatusUpdate(enrollment._id, 'APPROVED')}
                                  className="bg-green-600 hover:bg-green-700 text-white"
                                >
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Approuver
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleStatusUpdate(enrollment._id, 'REJECTED')}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <XCircle className="h-4 w-4 mr-1" />
                                  Rejeter
                                </Button>
                              </div>
                            )}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default AdminEnrollmentsPage;