import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { forgotPassword } from '@/api/AcademyApi';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import { Mail, ArrowLeft, KeyRound } from 'lucide-react';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await forgotPassword(email);
      setIsSubmitted(true);
      toast({
        title: "Email envoyé 📧",
        description: "Si un compte existe avec cet email, un lien de réinitialisation a été envoyé.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Mot de passe oublié - Espoirs Academy</title>
        <meta name="description" content="Réinitialisez votre mot de passe Espoirs Academy" />
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
                  <KeyRound className="h-8 w-8 text-red-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Mot de passe oublié</h2>
                <p className="text-gray-600">
                  {isSubmitted
                    ? "Vérifiez votre boîte mail"
                    : "Entrez votre email pour recevoir un lien de réinitialisation"}
                </p>
              </div>

              {isSubmitted ? (
                <div className="text-center space-y-6">
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                    <p className="text-green-800 font-medium mb-2">Email envoyé avec succès !</p>
                    <p className="text-green-700 text-sm leading-relaxed">
                      Si un compte existe avec l'adresse <strong>{email}</strong>, vous recevrez
                      un email contenant un lien pour réinitialiser votre mot de passe.
                      Le lien est valide pendant 1 heure.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <Link to="/login" className="block">
                      <Button className="w-full bg-red-600 hover:bg-red-700 text-white h-12 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all">
                        Retour à la connexion
                      </Button>
                    </Link>
                    <button
                      type="button"
                      onClick={() => { setIsSubmitted(false); setEmail(''); }}
                      className="text-sm font-medium text-gray-600 hover:text-red-600 transition-colors"
                    >
                      Renvoyer l'email
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="Votre adresse email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10 h-12 border-gray-300 focus:border-red-500 focus:ring-red-500"
                          required
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-red-600 hover:bg-red-700 text-white h-12 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Envoi...' : 'Envoyer le lien de réinitialisation'}
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

export default ForgotPasswordPage;