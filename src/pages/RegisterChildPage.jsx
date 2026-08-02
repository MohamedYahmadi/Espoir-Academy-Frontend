import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { createChild } from '@/api/AcademyApi';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import { User, Calendar, Phone, FileText, Upload, AlertCircle } from 'lucide-react';

const RegisterChildPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: 'Male',
    medicalNotes: '',
  });
  const [files, setFiles] = useState({
    photo: null,
    birthCertificate: null,
    medicalCertificate: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
  }, [user, navigate]);

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

      await createChild(data);
      toast({
        title: "Enfant enregistré ! 🎉",
        description: "Le profil a été créé avec succès.",
      });
      navigate('/children');
    } catch (error) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible d'enregistrer l'enfant.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Enregistrer un enfant - Espoirs Academy</title>
        <meta name="description" content="Ajoutez le profil de votre enfant" />
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
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Enregistrer un enfant</h1>
              <p className="text-lg text-gray-600">Ajoutez le profil de votre enfant pour l'inscrire à nos programmes</p>
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
                          placeholder="Prénom de l'enfant"
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
                          placeholder="Nom de l'enfant"
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
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Documents (optionnels)</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Vous pouvez ajouter les documents maintenant ou plus tard. Ils seront requis lors de l'inscription à un sport.
                  </p>
                  
                  <div className="space-y-2">
                    <Label htmlFor="photo" className="text-gray-700 font-medium">Photo d'identité</Label>
                    <div className="relative">
                      <Upload className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="photo"
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
                    <Label htmlFor="birthCertificate" className="text-gray-700 font-medium">Acte de naissance</Label>
                    <div className="relative">
                      <Upload className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="birthCertificate"
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
                    <Label htmlFor="medicalCertificate" className="text-gray-700 font-medium">Certificat médical</Label>
                    <div className="relative">
                      <Upload className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="medicalCertificate"
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
                      <strong>Note:</strong> Les documents sont optionnels lors de la création du profil. Vous pourrez les ajouter plus tard, mais ils seront requis pour inscrire votre enfant à un sport.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Link to="/children" className="flex-1">
                    <Button type="button" variant="outline" className="w-full h-12 rounded-full">
                      Annuler
                    </Button>
                  </Link>
                  <Button
                    type="submit"
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white h-12 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Enregistrement...' : "Enregistrer l'enfant"}
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

export default RegisterChildPage;