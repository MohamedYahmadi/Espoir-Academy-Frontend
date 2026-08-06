import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { getProfile, updateProfile, uploadProfilePicture, removeProfilePicture } from '@/api/AcademyApi';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import { User, Mail, Phone, ArrowLeft, Camera, Pencil, X, Check } from 'lucide-react';

const ProfilePage = () => {
  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    phone: '',
    profilePicture: '',
  });
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
  });
  const [profilePictureUrl, setProfilePictureUrl] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploadingPicture, setIsUploadingPicture] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchProfile();
  }, [user, navigate]);

  const fetchProfile = async () => {
    try {
      const response = await getProfile();
      const userData = response.data || response;
      setProfileData({
        fullName: userData.fullName || '',
        email: userData.email || '',
        phone: userData.phone || '',
        profilePicture: userData.profilePicture || '',
      });
      setFormData({
        fullName: userData.fullName || '',
        email: userData.email || '',
        phone: userData.phone || '',
      });
      if (userData.profilePicture) {
        setProfilePictureUrl(`http://localhost:5000/${userData.profilePicture}`);
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger le profil.",
        variant: "destructive",
      });
    } finally {
      setIsFetching(false);
    }
  };

  const handlePictureUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploadingPicture(true);
    try {
      const formData = new FormData();
      formData.append('profilePicture', file);
      const response = await uploadProfilePicture(formData);
      const newUrl = `http://localhost:5000/${response.data.profilePicture}`;
      setProfilePictureUrl(newUrl);
      setProfileData(prev => ({ ...prev, profilePicture: response.data.profilePicture }));
      toast({
        title: "Photo mise à jour ! ✅",
        description: "Votre photo de profil a été modifiée.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de télécharger la photo.",
        variant: "destructive",
      });
    } finally {
      setIsUploadingPicture(false);
    }
  };

  const handleRemovePicture = async () => {
    try {
      await removeProfilePicture();
      setProfilePictureUrl('');
      setProfileData(prev => ({ ...prev, profilePicture: '' }));
      toast({
        title: "Photo supprimée",
        description: "Votre photo de profil a été supprimée.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de supprimer la photo.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await updateProfile(formData);
      setProfileData({
        fullName: response.data?.fullName || formData.fullName,
        email: response.data?.email || formData.email,
        phone: response.data?.phone || formData.phone,
        profilePicture: profileData.profilePicture,
      });
      setIsEditing(false);
      toast({
        title: "Profil mis à jour",
        description: "Vos informations ont été modifiées avec succès.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de mettre à jour le profil.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      fullName: profileData.fullName,
      email: profileData.email,
      phone: profileData.phone,
    });
    setIsEditing(false);
  };

  if (isFetching) {
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
        <title>Mon Profil - Espoirs Academy</title>
        <meta name="description" content="Gérez votre profil" />
      </Helmet>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        
        <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <Link to="/dashboard">
                <Button variant="ghost" className="mb-4 text-gray-600 hover:text-red-600">
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Retour au tableau de bord
                </Button>
              </Link>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Mon Profil</h1>
              <p className="text-lg text-gray-600">Consultez et gérez vos informations personnelles</p>
            </div>

            {/* Profile Picture Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-md p-8 border border-gray-100 mb-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Photo de profil</h2>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="relative">
                  {profilePictureUrl ? (
                    <img
                      src={profilePictureUrl}
                      alt="Photo de profil"
                      className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center">
                      <User className="h-10 w-10 text-red-600" />
                    </div>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <div>
                    <Label
                      htmlFor="profilePicture"
                      className="cursor-pointer inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold transition-colors"
                    >
                      <Camera className="h-5 w-5" />
                      {isUploadingPicture ? 'Téléchargement...' : 'Changer la photo'}
                    </Label>
                    <input
                      id="profilePicture"
                      name="profilePicture"
                      type="file"
                      accept="image/*"
                      onChange={handlePictureUpload}
                      className="hidden"
                    />
                    <p className="text-sm text-gray-500 mt-2">JPG, PNG (max 5MB)</p>
                  </div>
                  {profilePictureUrl && (
                    <Button
                      type="button"
                      variant="outline"
                      className="border-red-600 text-red-600 hover:bg-red-50 rounded-full"
                      onClick={handleRemovePicture}
                    >
                      Supprimer
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Profile Information */}
            {isEditing ? (
              /* Edit Mode */
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-md p-8 border border-gray-100"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Modifier mes informations</h2>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleCancel}
                    className="text-gray-500 hover:text-red-600"
                  >
                    <X className="h-5 w-5 mr-1" />
                    Annuler
                  </Button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-gray-700 font-medium">Nom complet (ex: Jean Dupont/جون دوبون)</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="Jean Dupont/جون دوبون"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="pl-10 h-12 border-gray-300 focus:border-red-500 focus:ring-red-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="pl-10 h-12 border-gray-300 focus:border-red-500 focus:ring-red-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-700 font-medium">Téléphone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="pl-10 h-12 border-gray-300 focus:border-red-500 focus:ring-red-500"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button
                      type="submit"
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white h-12 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        'Enregistrement...'
                      ) : (
                        <>
                          <Check className="h-5 w-5 mr-2" />
                          Enregistrer
                        </>
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 h-12 rounded-full"
                      onClick={handleCancel}
                    >
                      Annuler
                    </Button>
                  </div>
                </form>
              </motion.div>
            ) : (
              /* View Mode */
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-md p-8 border border-gray-100"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Mes informations</h2>
                  <Button
                    onClick={() => setIsEditing(true)}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    <Pencil className="h-5 w-5 mr-2" />
                    Modifier
                  </Button>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <div className="bg-red-100 rounded-full p-3 mr-4">
                      <User className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Nom Complet</p>
                      <p className="text-lg font-semibold text-gray-900">{profileData.fullName}</p>
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <div className="bg-red-100 rounded-full p-3 mr-4">
                      <Mail className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-lg font-semibold text-gray-900">{profileData.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <div className="bg-red-100 rounded-full p-3 mr-4">
                      <Phone className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Téléphone</p>
                      <p className="text-lg font-semibold text-gray-900">{profileData.phone || 'Non renseigné'}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-8 bg-white rounded-xl shadow-md p-8 border border-gray-100"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Sécurité</h2>
              <p className="text-gray-600 mb-4">Modifiez votre mot de passe pour sécuriser votre compte.</p>
              <Link to="/change-password">
                <Button className="bg-red-600 hover:bg-red-700 text-white">
                  Changer le mot de passe
                </Button>
              </Link>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ProfilePage;