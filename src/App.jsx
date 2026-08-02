import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import { CartProvider } from '@/hooks/useCart';
import { WishlistProvider } from '@/hooks/useWishlist';
import { AuthProvider } from '@/hooks/useAuth';
import ShoppingCart from '@/components/ShoppingCart';
import ScrollToTop from '@/components/ui/scroll-to-top';
import PageTransition from '@/components/PageTransition';
import AdminRoute from '@/components/AdminRoute';

import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import FootballPage from '@/pages/FootballPage';
import BasketballPage from '@/pages/BasketballPage';
import TennisPage from '@/pages/TennisPage';
import SchedulePage from '@/pages/SchedulePage';
import PricingPage from '@/pages/PricingPage';
import ContactPage from '@/pages/ContactPage';
import StorePage from '@/pages/StorePage';
import AdminPage from '@/pages/AdminPage';
import ProductDetailPage from '@/pages/ProductDetailPage';
import SuccessPage from '@/pages/SuccessPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import ForgotPasswordPage from '@/pages/ForgotPasswordPage';
import ResetPasswordPage from '@/pages/ResetPasswordPage';
import DashboardPage from '@/pages/DashboardPage';
import ChildrenPage from '@/pages/ChildrenPage';
import RegisterChildPage from '@/pages/RegisterChildPage';
import EditChildPage from '@/pages/EditChildPage';
import ChildDetailPage from '@/pages/ChildDetailPage';
import EnrollmentsPage from '@/pages/EnrollmentsPage';
import AdminDashboardPage from '@/pages/AdminDashboardPage';
import AdminSportsPage from '@/pages/AdminSportsPage';
import AdminUsersPage from '@/pages/AdminUsersPage';
import AdminEnrollmentsPage from '@/pages/AdminEnrollmentsPage';
import AdminSchedulesPage from '@/pages/AdminSchedulesPage';
import ProfilePage from '@/pages/ProfilePage';
import ChangePasswordPage from '@/pages/ChangePasswordPage';
import PaymentsPage from '@/pages/PaymentsPage';

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
        <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
        <Route path="/football" element={<PageTransition><FootballPage /></PageTransition>} />
        <Route path="/basketball" element={<PageTransition><BasketballPage /></PageTransition>} />
        <Route path="/tennis" element={<PageTransition><TennisPage /></PageTransition>} />
        <Route path="/schedule" element={<PageTransition><SchedulePage /></PageTransition>} />
        <Route path="/pricing" element={<PageTransition><PricingPage /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
        <Route path="/store" element={<PageTransition><StorePage /></PageTransition>} />
        <Route path="/product/:id" element={<PageTransition><ProductDetailPage /></PageTransition>} />
        <Route path="/success" element={<PageTransition><SuccessPage /></PageTransition>} />
        <Route path="/admin-secret-backoffice" element={<AdminRoute><PageTransition><AdminDashboardPage /></PageTransition></AdminRoute>} />
        <Route path="/admin-secret-backoffice/sports" element={<AdminRoute><PageTransition><AdminSportsPage /></PageTransition></AdminRoute>} />
        <Route path="/admin-secret-backoffice/users" element={<AdminRoute><PageTransition><AdminUsersPage /></PageTransition></AdminRoute>} />
        <Route path="/admin-secret-backoffice/enrollments" element={<AdminRoute><PageTransition><AdminEnrollmentsPage /></PageTransition></AdminRoute>} />
        <Route path="/admin-secret-backoffice/schedules" element={<AdminRoute><PageTransition><AdminSchedulesPage /></PageTransition></AdminRoute>} />
        
        {/* Auth Routes */}
        <Route path="/login" element={<PageTransition><LoginPage /></PageTransition>} />
        <Route path="/register" element={<PageTransition><RegisterPage /></PageTransition>} />
        <Route path="/forgot-password" element={<PageTransition><ForgotPasswordPage /></PageTransition>} />
        <Route path="/reset-password/:token" element={<PageTransition><ResetPasswordPage /></PageTransition>} />
        
        {/* Protected Routes */}
        <Route path="/dashboard" element={<PageTransition><DashboardPage /></PageTransition>} />
        <Route path="/children" element={<PageTransition><ChildrenPage /></PageTransition>} />
        <Route path="/children/register" element={<PageTransition><RegisterChildPage /></PageTransition>} />
        <Route path="/children/:id" element={<PageTransition><ChildDetailPage /></PageTransition>} />
        <Route path="/children/:id/edit" element={<PageTransition><EditChildPage /></PageTransition>} />
        <Route path="/children/:childId/enroll" element={<PageTransition><EnrollmentsPage /></PageTransition>} />
        
        {/* Profile Routes */}
        <Route path="/profile" element={<PageTransition><ProfilePage /></PageTransition>} />
        <Route path="/change-password" element={<PageTransition><ChangePasswordPage /></PageTransition>} />
        
        {/* Payments Route */}
        <Route path="/payments" element={<PageTransition><PaymentsPage /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <Router>
            <div className="min-h-screen flex flex-col bg-white">
              <ShoppingCart />
              <AnimatedRoutes />
              <ScrollToTop />
              <Toaster />
            </div>
          </Router>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;