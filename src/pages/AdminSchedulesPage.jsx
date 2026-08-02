import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { getSports, getAllSchedules, createSchedule, updateSchedule, deleteSchedule } from '@/api/AcademyApi';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import { Calendar, Plus, Edit, Trash2, ArrowLeft, Clock, MapPin, Users } from 'lucide-react';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const DAY_LABELS = {
  Monday: 'Lundi',
  Tuesday: 'Mardi',
  Wednesday: 'Mercredi',
  Thursday: 'Jeudi',
  Friday: 'Vendredi',
  Saturday: 'Samedi',
  Sunday: 'Dimanche',
};

const AdminSchedulesPage = () => {
  const [schedules, setSchedules] = useState([]);
  const [sports, setSports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState(null);
  const [formData, setFormData] = useState({
    sportId: '',
    dayOfWeek: 'Saturday',
    startTime: '',
    endTime: '',
    groupName: '',
    minAge: '',
    maxAge: '',
    maxCapacity: '',
    coachName: '',
    location: '',
  });
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      window.location.href = '/login';
      return;
    }
    fetchData();
  }, [user]);

  const fetchData = async () => {
    try {
      const [schedulesData, sportsData] = await Promise.all([
        getAllSchedules(),
        getSports(),
      ]);
      setSchedules(schedulesData.data || []);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        minAge: formData.minAge ? parseInt(formData.minAge) : undefined,
        maxAge: formData.maxAge ? parseInt(formData.maxAge) : undefined,
        maxCapacity: formData.maxCapacity ? parseInt(formData.maxCapacity) : undefined,
      };

      if (editingSchedule) {
        await updateSchedule(editingSchedule._id, data);
        toast({ title: "Séance modifiée avec succès" });
      } else {
        await createSchedule(data);
        toast({ title: "Séance créée avec succès" });
      }
      resetForm();
      fetchData();
    } catch (error) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de sauvegarder la séance.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (schedule) => {
    setEditingSchedule(schedule);
    setFormData({
      sportId: schedule.sportId?._id || schedule.sportId || '',
      dayOfWeek: schedule.dayOfWeek,
      startTime: schedule.startTime,
      endTime: schedule.endTime,
      groupName: schedule.groupName || '',
      minAge: schedule.minAge?.toString() || '',
      maxAge: schedule.maxAge?.toString() || '',
      maxCapacity: schedule.maxCapacity?.toString() || '',
      coachName: schedule.coachName || '',
      location: schedule.location || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette séance ?')) {
      return;
    }
    try {
      await deleteSchedule(id);
      toast({ title: "Séance supprimée avec succès" });
      fetchData();
    } catch (error) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de supprimer la séance.",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      sportId: '',
      dayOfWeek: 'Saturday',
      startTime: '',
      endTime: '',
      groupName: '',
      minAge: '',
      maxAge: '',
      maxCapacity: '',
      coachName: '',
      location: '',
    });
    setEditingSchedule(null);
    setShowForm(false);
  };

  const getSportName = (schedule) => {
    return schedule.sportId?.name || 'Sport inconnu';
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
        <title>Gestion du Planning - Administration</title>
        <meta name="description" content="Gérer le planning des entraînements" />
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
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">Gestion du Planning</h1>
                  <p className="text-lg text-gray-600">Gérer les horaires des entraînements</p>
                </div>
                <Button
                  onClick={() => setShowForm(!showForm)}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Nouvelle Séance
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
                  {editingSchedule ? 'Modifier la Séance' : 'Nouvelle Séance'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="sportId">Sport</Label>
                      <select
                        id="sportId"
                        value={formData.sportId}
                        onChange={(e) => setFormData({ ...formData, sportId: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-red-500 focus:ring-red-500"
                        required
                      >
                        <option value="">Sélectionner un sport</option>
                        {sports.map(sport => (
                          <option key={sport._id} value={sport._id}>{sport.name} ({sport.nameLatin})</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dayOfWeek">Jour</Label>
                      <select
                        id="dayOfWeek"
                        value={formData.dayOfWeek}
                        onChange={(e) => setFormData({ ...formData, dayOfWeek: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-red-500 focus:ring-red-500"
                        required
                      >
                        {DAYS.map(day => (
                          <option key={day} value={day}>{DAY_LABELS[day]}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startTime">Heure de début</Label>
                      <Input
                        id="startTime"
                        type="time"
                        value={formData.startTime}
                        onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endTime">Heure de fin</Label>
                      <Input
                        id="endTime"
                        type="time"
                        value={formData.endTime}
                        onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="groupName">Nom du groupe</Label>
                    <Input
                      id="groupName"
                      value={formData.groupName}
                      onChange={(e) => setFormData({ ...formData, groupName: e.target.value })}
                      placeholder="Ex: U9-U11"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="minAge">Âge Minimum</Label>
                      <Input
                        id="minAge"
                        type="number"
                        value={formData.minAge}
                        onChange={(e) => setFormData({ ...formData, minAge: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxAge">Âge Maximum</Label>
                      <Input
                        id="maxAge"
                        type="number"
                        value={formData.maxAge}
                        onChange={(e) => setFormData({ ...formData, maxAge: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxCapacity">Capacité Max</Label>
                      <Input
                        id="maxCapacity"
                        type="number"
                        value={formData.maxCapacity}
                        onChange={(e) => setFormData({ ...formData, maxCapacity: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="coachName">Entraîneur</Label>
                      <Input
                        id="coachName"
                        value={formData.coachName}
                        onChange={(e) => setFormData({ ...formData, coachName: e.target.value })}
                        placeholder="Nom de l'entraîneur"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Lieu</Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="Ex: Terrain A"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white">
                      {editingSchedule ? 'Mettre à jour' : 'Créer'}
                    </Button>
                    <Button type="button" variant="outline" onClick={resetForm}>
                      Annuler
                    </Button>
                  </div>
                </form>
              </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {schedules.map((schedule, idx) => (
                <motion.div
                  key={schedule._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-red-100 rounded-full p-3">
                      <Calendar className="h-6 w-6 text-red-600" />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(schedule)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Edit className="h-5 w-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(schedule._id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{getSportName(schedule)}</h3>
                  {schedule.groupName && (
                    <p className="text-gray-600 text-sm mb-2">{schedule.groupName}</p>
                  )}
                  <div className="space-y-1 text-sm text-gray-500">
                    <p className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {DAY_LABELS[schedule.dayOfWeek] || schedule.dayOfWeek}
                    </p>
                    <p className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      {schedule.startTime} - {schedule.endTime}
                    </p>
                    {schedule.location && (
                      <p className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        {schedule.location}
                      </p>
                    )}
                    {schedule.coachName && (
                      <p className="flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        {schedule.coachName}
                      </p>
                    )}
                    {schedule.maxCapacity && (
                      <p>👥 Max {schedule.maxCapacity} enfants</p>
                    )}
                    {schedule.minAge && schedule.maxAge && (
                      <p>🎂 Âge: {schedule.minAge} - {schedule.maxAge} ans</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {schedules.length === 0 && !showForm && (
              <div className="bg-white rounded-xl shadow-md p-12 text-center border border-gray-100">
                <Calendar className="h-20 w-20 text-gray-300 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Aucune séance</h3>
                <p className="text-gray-600">Cliquez sur "Nouvelle Séance" pour ajouter un entraînement.</p>
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default AdminSchedulesPage;