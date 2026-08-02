import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { updateProfile } from '@/api/AcademyApi';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import { Lock, ArrowLeft, Eye, EyeOff } from 'lucide-react';

const ChangePasswordPage = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      await updateProfile({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });
      toast({
        title: "Mot de passe modifié",
        description: "Votre mot de passe a été changé avec succès.",
      });
      setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      navigate('/profile');
    } catch (error) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de changer le mot de passe.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Changer le mot de passe - Espoirs Academy</title>
        <meta name="description" content="Modifiez votre mot de passe" />
      </Helmet>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        
        <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <Link to="/profile">
                <Button variant="ghost" className="mb-4 text-gray-600 hover:text-red-600">
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Retour au profil
                </Button>
              </Link>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Changer le mot de passe</h1>
              <p className="text-lg text-gray-600">Modifiez votre mot de passe pour sécuriser votre compte</p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-md p-8 border border-gray-100"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword" className="text-gray-700 font-medium">Mot de passe actuel</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="currentPassword"
                      type={showCurrentPassword ? 'text' : 'password'}
                      value={formData.currentPassword}
                      onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                      className="pl-10 pr-10 h-12 border-gray-300 focus:border-red-500 focus:ring-red-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showCurrentPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword" className="text-gray-700 font-medium">Nouveau mot de passe</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="newPassword"
                      type={showNewPassword ? 'text' : 'password'}
                      value={formData.newPassword}
                      onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                      className="pl-10 pr-10 h-12 border-gray-300 focus:border-red-500 focus:ring-red-500"
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500">Minimum 6 caractères</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">Confirmer le mot de passe</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="pl-10 pr-10 h-12 border-gray-300 focus:border-red-500 focus:ring-red-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white h-12 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Modification...' : 'Changer le mot de passe'}
                  </Button>
                  <Link to="/profile" className="flex-1">
                    <Button type="button" variant="outline" className="w-full h-12 rounded-full">
                      Annuler
                    </Button>
                  </Link>
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

export default ChangePasswordPage;