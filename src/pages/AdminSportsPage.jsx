import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { getSports, createSport, updateSport, deleteSport } from '@/api/AcademyApi';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import { Trophy, Plus, Edit, Trash2, ArrowLeft } from 'lucide-react';

const AdminSportsPage = () => {
  const [sports, setSports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSport, setEditingSport] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    nameLatin: '',
    price: '',
    description: '',
    maxCapacity: '',
    minAge: '',
    maxAge: '',
    scheduleInfo: '',
  });
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
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
    try {
      const data = {
        ...formData,
        price: parseFloat(formData.price),
        maxCapacity: parseInt(formData.maxCapacity),
        minAge: parseInt(formData.minAge),
        maxAge: parseInt(formData.maxAge),
      };

      if (editingSport) {
        await updateSport(editingSport._id, data);
        toast({ title: "Sport modifié avec succès" });
      } else {
        await createSport(data);
        toast({ title: "Sport créé avec succès" });
      }
      resetForm();
      fetchSports();
    } catch (error) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de sauvegarder le sport.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (sport) => {
    setEditingSport(sport);
    setFormData({
      name: sport.name,
      nameLatin: sport.nameLatin || '',
      price: sport.price.toString(),
      description: sport.description || '',
      maxCapacity: sport.maxCapacity.toString(),
      minAge: sport.minAge.toString(),
      maxAge: sport.maxAge.toString(),
      scheduleInfo: sport.scheduleInfo || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Êtes-vous sûr de vouloir supprimer ${name} ?`)) {
      return;
    }
    try {
      await deleteSport(id);
      toast({ title: "Sport supprimé avec succès" });
      fetchSports();
    } catch (error) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de supprimer le sport.",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      nameLatin: '',
      price: '',
      description: '',
      maxCapacity: '',
      minAge: '',
      maxAge: '',
      scheduleInfo: '',
    });
    setEditingSport(null);
    setShowForm(false);
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
        <title>Gestion des Sports - Administration</title>
        <meta name="description" content="Gérer les sports" />
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
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">Gestion des Sports</h1>
                  <p className="text-lg text-gray-600">Ajouter, modifier ou supprimer des sports</p>
                </div>
                <Button
                  onClick={() => setShowForm(!showForm)}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Nouveau Sport
                </Button>
              </div>
            </div>

            {showForm && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-md p-8 border border-gray-100 mb-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {editingSport ? 'Modifier le Sport' : 'Nouveau Sport'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nom (Arabe)</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nameLatin">Nom (Latin)</Label>
                      <Input
                        id="nameLatin"
                        value={formData.nameLatin}
                        onChange={(e) => setFormData({ ...formData, nameLatin: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-red-500 focus:ring-red-500"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Prix (TND)</Label>
                      <Input
                        id="price"
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxCapacity">Capacité Max</Label>
                      <Input
                        id="maxCapacity"
                        type="number"
                        value={formData.maxCapacity}
                        onChange={(e) => setFormData({ ...formData, maxCapacity: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="scheduleInfo">Horaire</Label>
                      <Input
                        id="scheduleInfo"
                        value={formData.scheduleInfo}
                        onChange={(e) => setFormData({ ...formData, scheduleInfo: e.target.value })}
                        placeholder="Ex: Mon/Wed/Fri - 16:00"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="minAge">Âge Minimum</Label>
                      <Input
                        id="minAge"
                        type="number"
                        value={formData.minAge}
                        onChange={(e) => setFormData({ ...formData, minAge: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxAge">Âge Maximum</Label>
                      <Input
                        id="maxAge"
                        type="number"
                        value={formData.maxAge}
                        onChange={(e) => setFormData({ ...formData, maxAge: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white">
                      {editingSport ? 'Mettre à jour' : 'Créer'}
                    </Button>
                    <Button type="button" variant="outline" onClick={resetForm}>
                      Annuler
                    </Button>
                  </div>
                </form>
              </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sports.map((sport, idx) => (
                <motion.div
                  key={sport._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-red-100 rounded-full p-3">
                      <Trophy className="h-6 w-6 text-red-600" />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(sport)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Edit className="h-5 w-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(sport._id, sport.name)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{sport.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{sport.nameLatin}</p>
                  <p className="text-gray-600 text-sm mb-4">{sport.description}</p>
                  <div className="space-y-1 text-sm text-gray-500">
                    <p>💰 {sport.price} TND</p>
                    <p>👥 Max {sport.maxCapacity} enfants</p>
                    <p>📅 {sport.scheduleInfo}</p>
                    <p>🎂 Âge: {sport.minAge} - {sport.maxAge} ans</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default AdminSportsPage;