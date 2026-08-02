import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      navigate(user.role === 'admin' ? '/admin-secret-backoffice' : '/dashboard');
    }
  }, [user, navigate]);

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await login(formData);
      const isAdmin = response.data?.user?.role === 'admin';
      toast({
        title: "Connexion réussie ! 🎉",
        description: isAdmin
          ? "Bienvenue sur votre espace administrateur."
          : "Bienvenue sur votre espace parent.",
      });
      // Navigate after a short delay to ensure state is updated
      setTimeout(() => {
        navigate(isAdmin ? '/admin-secret-backoffice' : from, { replace: true });
      }, 300);
    } catch (error) {
      toast({
        title: "Erreur de connexion",
        description: error.message || "Email ou mot de passe incorrect.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Connexion - Espoirs Academy</title>
        <meta name="description" content="Connectez-vous à votre compte parent Espoirs Academy" />
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
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Connexion</h2>
                <p className="text-gray-600">Accédez à votre espace parent</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Votre adresse email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="pl-10 h-12 border-gray-300 focus:border-red-500 focus:ring-red-500"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700 font-medium">Mot de passe</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Votre mot de passe"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="pl-10 pr-10 h-12 border-gray-300 focus:border-red-500 focus:ring-red-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <Link
                    to="/forgot-password"
                    className="text-sm font-medium text-red-600 hover:text-red-700"
                  >
                    Mot de passe oublié ?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white h-12 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
                  disabled={isLoading}
                >
                  {isLoading ? 'Connexion...' : 'Se connecter'}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Pas encore de compte ?{' '}
                  <Link to="/register" className="text-red-600 hover:text-red-700 font-semibold">
                    Inscrivez-vous
                  </Link>
                </p>
              </div>

            </div>
          </motion.div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default LoginPage;