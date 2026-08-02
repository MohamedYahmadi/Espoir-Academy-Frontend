import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { resetPassword } from '@/api/AcademyApi';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import { Lock, Eye, EyeOff, ArrowLeft, ShieldCheck } from 'lucide-react';

const ResetPasswordPage = () => {
  const { token } = useParams();
  const [formData, setFormData] = useState({ password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      await resetPassword(token, formData.password);
      setIsReset(true);
      toast({
        title: "Mot de passe réinitialisé 🔒",
        description: "Votre mot de passe a été changé avec succès.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: error.message || "Le lien est invalide ou a expiré.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Réinitialiser le mot de passe - Espoirs Academy</title>
        <meta name="description" content="Choisissez un nouveau mot de passe" />
      </Helmet>
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        
        <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-md w-full"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-red-50 mb-4">
                  <ShieldCheck className="h-8 w-8 text-red-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Nouveau mot de passe</h2>
                <p className="text-gray-600">Choisissez un nouveau mot de passe pour votre compte</p>
              </div>

              {isReset ? (
                <div className="text-center space-y-6">
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                    <p className="text-green-800 font-medium mb-2">Mot de passe réinitialisé !</p>
                    <p className="text-green-700 text-sm">
                      Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.
                    </p>
                  </div>
                  <Link to="/login" className="block">
                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white h-12 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all">
                      Aller à la connexion
                    </Button>
                  </Link>
                </div>
              ) : (
                <>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-gray-700 font-medium">Nouveau mot de passe</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Nouveau mot de passe"
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          className="pl-10 pr-10 h-12 border-gray-300 focus:border-red-500 focus:ring-red-500"
                          required
                          minLength={6}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
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
                          placeholder="Confirmez le nouveau mot de passe"
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

                    <Button
                      type="submit"
                      className="w-full bg-red-600 hover:bg-red-700 text-white h-12 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Réinitialisation...' : 'Réinitialiser le mot de passe'}
                    </Button>
                  </form>

                  <div className="mt-6 text-center">
                    <Link
                      to="/login"
                      className="inline-flex items-center text-gray-600 hover:text-red-600 font-medium transition-colors"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Retour à la connexion
                    </Link>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ResetPasswordPage;