import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { getChildById, updateChild } from '@/api/AcademyApi';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import { User, Calendar, FileText, ArrowLeft, Upload, Camera, AlertCircle } from 'lucide-react';

const EditChildPage = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: 'Male',
    medicalNotes: '',
  });
  const [existingDocuments, setExistingDocuments] = useState({
    photoUrl: '',
    birthCertificateUrl: '',
    medicalCertificateUrl: '',
  });
  const [files, setFiles] = useState({
    photo: null,
    birthCertificate: null,
    medicalCertificate: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchChild();
  }, [user, navigate, id]);

  const fetchChild = async () => {
    try {
      const response = await getChildById(id);
      const child = response.data;
      setFormData({
        firstName: child.firstName || '',
        lastName: child.lastName || '',
        dateOfBirth: child.dateOfBirth ? child.dateOfBirth.split('T')[0] : '',
        gender: child.gender || 'Male',
        medicalNotes: child.medicalNotes || '',
      });
      setExistingDocuments({
        photoUrl: child.documents?.photoUrl || '',
        birthCertificateUrl: child.documents?.birthCertificateUrl || '',
        medicalCertificateUrl: child.documents?.medicalCertificateUrl || '',
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les informations de l'enfant.",
        variant: "destructive",
      });
      navigate('/children');
    } finally {
      setIsFetching(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const { name, files: fileList } = e.target;
    setFiles({ ...files, [name]: fileList[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = new FormData();
      data.append('firstName', formData.firstName);
      data.append('lastName', formData.lastName);
      data.append('dateOfBirth', formData.dateOfBirth);
      data.append('gender', formData.gender);
      data.append('medicalNotes', formData.medicalNotes);

      if (files.photo) data.append('photo', files.photo);
      if (files.birthCertificate) data.append('birthCertificate', files.birthCertificate);
      if (files.medicalCertificate) data.append('medicalCertificate', files.medicalCertificate);

      await updateChild(id, data);
      toast({
        title: "Profil mis à jour ! ✅",
        description: "Les informations et documents ont été modifiés avec succès.",
      });
      navigate(`/children/${id}`);
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
        <title>Modifier {formData.firstName} {formData.lastName} - Espoirs Academy</title>
        <meta name="description" content={`Modifier le profil de ${formData.firstName} ${formData.lastName}`} />
      </Helmet>
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        
        <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <Link to={`/children/${id}`}>
                <Button variant="ghost" className="mb-4 text-gray-600 hover:text-red-600">
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Retour au profil
                </Button>
              </Link>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Modifier le profil</h1>
              <p className="text-lg text-gray-600">Mettez à jour les informations de {formData.firstName} {formData.lastName}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Informations personnelles</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-gray-700 font-medium">Prénom</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          id="firstName"
                          name="firstName"
                          type="text"
                          value={formData.firstName}
                          onChange={handleChange}
                          className="pl-10 h-12 border-gray-300 focus:border-red-500 focus:ring-red-500"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-gray-700 font-medium">Nom</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          id="lastName"
                          name="lastName"
                          type="text"
                          value={formData.lastName}
                          onChange={handleChange}
                          className="pl-10 h-12 border-gray-300 focus:border-red-500 focus:ring-red-500"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth" className="text-gray-700 font-medium">Date de naissance</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          id="dateOfBirth"
                          name="dateOfBirth"
                          type="date"
                          value={formData.dateOfBirth}
                          onChange={handleChange}
                          className="pl-10 h-12 border-gray-300 focus:border-red-500 focus:ring-red-500"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="gender" className="text-gray-700 font-medium">Genre</Label>
                      <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full h-12 px-4 border border-gray-300 rounded-md focus:border-red-500 focus:ring-red-500"
                        required
                      >
                        <option value="Male">Garçon</option>
                        <option value="Female">Fille</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="medicalNotes" className="text-gray-700 font-medium">Notes médicales (optionnel)</Label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <textarea
                        id="medicalNotes"
                        name="medicalNotes"
                        placeholder="Allergies, conditions médicales, etc."
                        value={formData.medicalNotes}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:border-red-500 focus:ring-red-500 min-h-[100px]"
                      />
                    </div>
                  </div>
                </div>

                {/* Documents Upload */}
                <div className="space-y-4 pt-6 border-t border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Documents</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Téléchargez de nouveaux documents pour remplacer les existants.
                  </p>
                  
                  <div className="space-y-2">
                    <Label className="text-gray-700 font-medium">Photo d'identité</Label>
                    {existingDocuments.photoUrl && (
                      <p className="text-xs text-green-600 mb-1">✓ Document existant</p>
                    )}
                    <div className="relative">
                      <Camera className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        name="photo"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="pl-10 h-12 border-gray-300 focus:border-red-500 focus:ring-red-500"
                      />
                    </div>
                    <p className="text-xs text-gray-500">Format: JPG, PNG (max 5MB)</p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-700 font-medium">Acte de naissance</Label>
                    {existingDocuments.birthCertificateUrl && (
                      <p className="text-xs text-green-600 mb-1">✓ Document existant</p>
                    )}
                    <div className="relative">
                      <Upload className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        name="birthCertificate"
                        type="file"
                        accept="image/*,.pdf"
                        onChange={handleFileChange}
                        className="pl-10 h-12 border-gray-300 focus:border-red-500 focus:ring-red-500"
                      />
                    </div>
                    <p className="text-xs text-gray-500">Format: JPG, PNG, PDF (max 5MB)</p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-700 font-medium">Certificat médical</Label>
                    {existingDocuments.medicalCertificateUrl && (
                      <p className="text-xs text-green-600 mb-1">✓ Document existant</p>
                    )}
                    <div className="relative">
                      <Upload className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        name="medicalCertificate"
                        type="file"
                        accept="image/*,.pdf"
                        onChange={handleFileChange}
                        className="pl-10 h-12 border-gray-300 focus:border-red-500 focus:ring-red-500"
                      />
                    </div>
                    <p className="text-xs text-gray-500">Format: JPG, PNG, PDF (max 5MB)</p>
                  </div>
                </div>

                <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-yellow-800">
                      <strong>Note:</strong> Seuls les nouveaux fichiers sélectionnés seront téléchargés. Les documents existants restent inchangés si aucun nouveau fichier n'est choisi.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Link to={`/children/${id}`} className="flex-1">
                    <Button type="button" variant="outline" className="w-full h-12 rounded-full">
                      Annuler
                    </Button>
                  </Link>
                  <Button
                    type="submit"
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white h-12 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Enregistrement...' : 'Enregistrer les modifications'}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default EditChildPage;