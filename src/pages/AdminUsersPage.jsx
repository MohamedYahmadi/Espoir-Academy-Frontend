import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { getUsers, updateUser, deactivateUser } from '@/api/AcademyApi';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import { Users, ArrowLeft, Edit, Trash2, Search } from 'lucide-react';

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    isActive: true,
  });
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      window.location.href = '/login';
      return;
    }
    fetchUsers();
  }, [user]);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data.data || []);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les utilisateurs.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(editingUser._id, formData);
      toast({ title: "Utilisateur modifié avec succès" });
      resetForm();
      fetchUsers();
    } catch (error) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de modifier l'utilisateur.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      fullName: user.fullName,
      email: user.email,
      phone: user.phone || '',
      isActive: user.isActive,
    });
  };

  const handleDeactivate = async (id, fullName) => {
    if (!window.confirm(`Êtes-vous sûr de vouloir désactiver le compte de ${fullName} ?`)) {
      return;
    }
    try {
      await deactivateUser(id);
      toast({ title: "Utilisateur désactivé avec succès" });
      fetchUsers();
    } catch (error) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de désactiver l'utilisateur.",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      isActive: true,
    });
    setEditingUser(null);
  };

  const filteredUsers = users.filter(user =>
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <title>Gestion des Utilisateurs - Administration</title>
        <meta name="description" content="Gérer les utilisateurs" />
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
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Gestion des Utilisateurs</h1>
              <p className="text-lg text-gray-600">Voir et gérer les comptes parents</p>
            </div>

            {/* Search */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Rechercher par nom ou email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 border-gray-300 focus:border-red-500 focus:ring-red-500"
                />
              </div>
            </div>

            {/* Edit Form */}
            {editingUser && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-md p-8 border border-gray-100 mb-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Modifier l'Utilisateur</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Nom Complet</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="isActive"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                    />
                    <Label htmlFor="isActive" className="cursor-pointer">Compte actif</Label>
                  </div>

                  <div className="flex gap-4">
                    <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white">
                      Mettre à jour
                    </Button>
                    <Button type="button" variant="outline" onClick={resetForm}>
                      Annuler
                    </Button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Users List */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Téléphone</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map((user, idx) => (
                      <motion.tr
                        key={user._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{user.fullName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600">{user.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600">{user.phone || '-'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {user.isActive ? 'Actif' : 'Inactif'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEdit(user)}
                              className="text-blue-600 hover:text-blue-700"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            {user.isActive && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeactivate(user._id, user.fullName)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default AdminUsersPage;