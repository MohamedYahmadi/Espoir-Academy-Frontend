import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { getUsers, updateUser, deactivateUser, getUserById, createChild, updateChild, deleteChild } from '@/api/AcademyApi';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import { Users, ArrowLeft, Edit, Trash2, Search, Plus, Calendar, FileText, Upload } from 'lucide-react';

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

  // Children management state
  const [children, setChildren] = useState([]);
  const [loadingChildren, setLoadingChildren] = useState(false);
  const [showChildForm, setShowChildForm] = useState(false);
  const [editingChild, setEditingChild] = useState(null);
  
  const [childFormData, setChildFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: 'Male',
    medicalNotes: '',
  });
  
  const [childFiles, setChildFiles] = useState({
    photo: null,
    birthCertificate: null,
    medicalCertificate: null,
  });
  
  const [isSubmittingChild, setIsSubmittingChild] = useState(false);

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

  const fetchChildren = async (userId) => {
    setLoadingChildren(true);
    try {
      const res = await getUserById(userId);
      console.log('fetchChildren response:', res);
      const childrenList = res.data?.children || res.children || (Array.isArray(res.data) ? res.data : []);
      setChildren(childrenList);
    } catch (error) {
      console.error('Error fetching children:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les enfants du parent.",
        variant: "destructive",
      });
    } finally {
      setLoadingChildren(false);
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
    fetchChildren(user._id);
  };

  const handleChildEdit = (child) => {
    setEditingChild(child);
    setChildFormData({
      firstName: child.firstName || '',
      lastName: child.lastName || '',
      dateOfBirth: child.dateOfBirth ? child.dateOfBirth.split('T')[0] : '',
      gender: child.gender || 'Male',
      medicalNotes: child.medicalNotes || '',
    });
    setChildFiles({
      photo: null,
      birthCertificate: null,
      medicalCertificate: null,
    });
    setShowChildForm(true);
  };

  const handleChildAdd = () => {
    setEditingChild(null);
    setChildFormData({
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      gender: 'Male',
      medicalNotes: '',
    });
    setChildFiles({
      photo: null,
      birthCertificate: null,
      medicalCertificate: null,
    });
    setShowChildForm(true);
  };

  const handleChildDelete = async (childId, name) => {
    if (!window.confirm(`Êtes-vous sûr de vouloir supprimer le profil de ${name} ?`)) {
      return;
    }
    try {
      await deleteChild(childId);
      toast({ title: "Profil de l'enfant supprimé" });
      fetchChildren(editingUser._id);
    } catch (error) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de supprimer l'enfant.",
        variant: "destructive",
      });
    }
  };

  const handleChildFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingChild(true);
    try {
      const data = new FormData();
      data.append('firstName', childFormData.firstName);
      data.append('lastName', childFormData.lastName);
      data.append('dateOfBirth', childFormData.dateOfBirth);
      data.append('gender', childFormData.gender);
      data.append('medicalNotes', childFormData.medicalNotes);
      data.append('parentId', editingUser._id);

      if (childFiles.photo) data.append('photo', childFiles.photo);
      if (childFiles.birthCertificate) data.append('birthCertificate', childFiles.birthCertificate);
      if (childFiles.medicalCertificate) data.append('medicalCertificate', childFiles.medicalCertificate);

      if (editingChild) {
        await updateChild(editingChild._id, data);
        toast({ title: "Enfant modifié avec succès" });
      } else {
        await createChild(data);
        toast({ title: "Enfant ajouté avec succès" });
      }
      setShowChildForm(false);
      setEditingChild(null);
      fetchChildren(editingUser._id);
    } catch (error) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible d'enregistrer l'enfant.",
        variant: "destructive",
      });
    } finally {
      setIsSubmittingChild(false);
    }
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
                    <Label htmlFor="fullName">Nom complet</Label>
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

                {/* Children section */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Enfants associés</h3>
                      <p className="text-sm text-gray-500">Gérez les profils des enfants de ce parent</p>
                    </div>
                    <Button
                      type="button"
                      onClick={handleChildAdd}
                      className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Ajouter un Enfant
                    </Button>
                  </div>

                  {loadingChildren ? (
                    <div className="text-center py-6">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto mb-2"></div>
                      <p className="text-gray-500 text-sm">Chargement des enfants...</p>
                    </div>
                  ) : children.length === 0 ? (
                    <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                      <p className="text-gray-500 text-sm">Aucun enfant enregistré pour ce parent.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {children.map((child) => (
                        <div key={child._id} className="bg-gray-50 rounded-xl p-4 border border-gray-200 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h4 className="font-semibold text-gray-900">{child.firstName} {child.lastName}</h4>
                                <p className="text-xs text-gray-500">Né(e) le: {child.dateOfBirth ? new Date(child.dateOfBirth).toLocaleDateString('fr-FR') : '-'}</p>
                                <p className="text-xs text-gray-500">Genre: {child.gender === 'Male' ? 'Garçon' : 'Fille'}</p>
                              </div>
                              <div className="flex gap-1">
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleChildEdit(child)}
                                  className="text-blue-600 hover:text-blue-700 h-8 w-8"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleChildDelete(child._id, `${child.firstName} ${child.lastName}`)}
                                  className="text-red-600 hover:text-red-700 h-8 w-8"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            {child.medicalNotes && (
                              <p className="text-xs text-gray-600 bg-yellow-50 p-2 rounded border border-yellow-100 mt-2">
                                <strong>Notes médicales:</strong> {child.medicalNotes}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {showChildForm && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto"
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    {editingChild ? "Modifier l'Enfant" : "Ajouter un Enfant"}
                  </h3>
                  <form onSubmit={handleChildFormSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="childFirstName">Prénom</Label>
                        <Input
                          id="childFirstName"
                          value={childFormData.firstName}
                          onChange={(e) => setChildFormData({ ...childFormData, firstName: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="childLastName">Nom</Label>
                        <Input
                          id="childLastName"
                          value={childFormData.lastName}
                          onChange={(e) => setChildFormData({ ...childFormData, lastName: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="childDOB">Date de naissance</Label>
                        <Input
                          id="childDOB"
                          type="date"
                          value={childFormData.dateOfBirth}
                          onChange={(e) => setChildFormData({ ...childFormData, dateOfBirth: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="childGender">Genre</Label>
                        <select
                          id="childGender"
                          value={childFormData.gender}
                          onChange={(e) => setChildFormData({ ...childFormData, gender: e.target.value })}
                          className="w-full h-10 px-3 border border-gray-300 rounded-md focus:border-red-500 focus:ring-red-500 text-sm font-medium"
                          required
                        >
                          <option value="Male">Garçon</option>
                          <option value="Female">Fille</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="childMedical">Notes médicales (optionnel)</Label>
                      <textarea
                        id="childMedical"
                        value={childFormData.medicalNotes}
                        onChange={(e) => setChildFormData({ ...childFormData, medicalNotes: e.target.value })}
                        placeholder="Allergies, conditions médicales, etc."
                        className="w-full min-h-[80px] p-3 border border-gray-300 rounded-md focus:border-red-500 focus:ring-red-500 text-sm"
                      />
                    </div>

                    <div className="space-y-3 pt-4 border-t border-gray-100">
                      <h4 className="font-semibold text-sm text-gray-900">Documents (optionnels)</h4>
                      
                      <div className="space-y-1">
                        <Label htmlFor="childPhoto" className="text-xs">Photo d'identité</Label>
                        <Input
                          id="childPhoto"
                          type="file"
                          accept="image/*"
                          onChange={(e) => setChildFiles({ ...childFiles, photo: e.target.files[0] })}
                          className="h-10 text-xs"
                        />
                      </div>

                      <div className="space-y-1">
                        <Label htmlFor="childBC" className="text-xs">Acte de naissance</Label>
                        <Input
                          id="childBC"
                          type="file"
                          accept="image/*,.pdf"
                          onChange={(e) => setChildFiles({ ...childFiles, birthCertificate: e.target.files[0] })}
                          className="h-10 text-xs"
                        />
                      </div>

                      <div className="space-y-1">
                        <Label htmlFor="childMC" className="text-xs">Certificat médical</Label>
                        <Input
                          id="childMC"
                          type="file"
                          accept="image/*,.pdf"
                          onChange={(e) => setChildFiles({ ...childFiles, medicalCertificate: e.target.files[0] })}
                          className="h-10 text-xs"
                        />
                      </div>
                    </div>

                    <div className="flex gap-3 pt-6 border-t border-gray-100">
                      <Button
                        type="submit"
                        disabled={isSubmittingChild}
                        className="flex-grow bg-red-600 hover:bg-red-700 text-white"
                      >
                        {isSubmittingChild ? "Enregistrement..." : "Enregistrer"}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowChildForm(false)}
                        className="flex-grow"
                      >
                        Annuler
                      </Button>
                    </div>
                  </form>
                </motion.div>
              </div>
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