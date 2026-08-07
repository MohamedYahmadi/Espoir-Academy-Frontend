import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// ============================================================
// BOUTIQUE / CART FEATURE - DISABLED (commented out)
// To re-enable: uncomment the useCart import and the cart-related
// code marked with the same banner below.
// ============================================================
// import { Menu, X, ShoppingBag, ChevronDown, User, LogOut, Settings, LayoutDashboard, CreditCard, Users, Mail, Shield } from 'lucide-react';
import { Menu, X, ChevronDown, User, LogOut, Settings, LayoutDashboard, CreditCard, Users, Mail, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
// import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { getSports } from '@/api/AcademyApi';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSportsOpen, setIsSportsOpen] = useState(false);
  const [sports, setSports] = useState([]);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  // ============================================================
  // BOUTIQUE / CART FEATURE - DISABLED (commented out)
  // To re-enable: uncomment the useCart hook usage below
  // ============================================================
  // const { cartItems, toggleCart } = useCart();
  const { user, logout } = useAuth();

  useEffect(() => {
    fetchSports();
  }, []);

  const fetchSports = async () => {
    try {
      const data = await getSports();
      setSports(data.data || []);
    } catch (error) {
      console.error('Failed to load sports:', error);
    }
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    setIsMobileMenuOpen(false);
    navigate('/');
  };

  // ============================================================
  // BOUTIQUE / CART FEATURE - DISABLED (commented out)
  // To re-enable: uncomment the cartItemCount line below
  // ============================================================
  // const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const isActive = (path) => location.pathname === path ? "text-red-600" : "text-gray-700 hover:text-red-600";

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 font-sans">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center group gap-3">
            <motion.img 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              src="https://horizons-cdn.hostinger.com/8a39f79e-fdf0-42d9-8aeb-03138b49031c/e5c698a7ed34ce7b5e115d22e6560772.png" 
              alt="ESPOIRS ACADEMY Logo" 
              className="h-12 w-12 md:h-14 md:w-14 object-contain"
            />
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col md:flex-row md:items-end leading-none"
            >
              <span className="text-xl md:text-2xl font-extrabold text-red-600 tracking-tighter">ESPOIRS</span>
              <span className="text-xl md:text-2xl font-extrabold text-black md:ml-1 tracking-tighter group-hover:text-gray-700 transition-colors">ACADEMY</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link to="/" className={`${isActive('/')} font-semibold text-sm uppercase tracking-wide transition-colors`}>Accueil</Link>
            <Link to="/about" className={`${isActive('/about')} font-semibold text-sm uppercase tracking-wide transition-colors`}>À Propos</Link>
            
            <div className="relative group h-full flex items-center">
              <button className="flex items-center text-gray-700 hover:text-red-600 font-semibold text-sm uppercase tracking-wide transition-colors focus:outline-none">
                Sports <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute top-full left-0 w-56 bg-white rounded-b-lg shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50 border-t-4 border-red-600">
                {sports.map(sport => (
                  <Link key={sport._id} to={`/sport/${sport._id}`} className="block px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors">
                    {sport.name} {sport.nameLatin && `(${sport.nameLatin})`}
                  </Link>
                ))}
              </div>
            </div>

            <Link to="/schedule" className={`${isActive('/schedule')} font-semibold text-sm uppercase tracking-wide transition-colors`}>Planning</Link>
            <Link to="/pricing" className={`${isActive('/pricing')} font-semibold text-sm uppercase tracking-wide transition-colors`}>Tarifs</Link>
            {/* ============================================================
                BOUTIQUE FEATURE - DISABLED (commented out)
                To re-enable: uncomment the Boutique nav link below
            ============================================================ */}
            {/* <Link to="/store" className={`${isActive('/store')} font-semibold text-sm uppercase tracking-wide transition-colors`}>Boutique</Link> */}

            {/* Right side: Cart + User Menu */}
            <div className="pl-4 border-l border-gray-200 flex items-center gap-2">
              {/* ============================================================
                  BOUTIQUE / CART FEATURE - DISABLED (commented out)
                  To re-enable: uncomment the Cart Button below
              ============================================================ */}
              {/* Cart Button */}
              {/* <Button onClick={toggleCart} variant="ghost" className="relative p-2 hover:bg-red-50 rounded-full transition-all text-gray-800 hover:text-red-600">
                <ShoppingBag className="h-6 w-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-sm ring-2 ring-white">
                    {cartItemCount}
                  </span>
                )}
              </Button> */}

              {user ? (
                /* User Hamburger Dropdown */
                <div className="relative" ref={dropdownRef}>
                  <Button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)} 
                    variant="ghost" 
                    className={`p-2 hover:bg-red-50 rounded-full transition-all ${isMenuOpen ? 'bg-red-50 text-red-600' : 'text-gray-800 hover:text-red-600'}`}
                  >
                    {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                  </Button>
                  <AnimatePresence>
                    {isMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-3 z-50 overflow-hidden"
                      >
                        {/* User info header */}
                        <div className="px-5 py-3 border-b border-gray-100">
                          <p className="font-semibold text-gray-900 text-sm truncate">{user?.fullName || 'Utilisateur'}</p>
                          <p className="text-xs text-gray-500 truncate">{user?.email || ''}</p>
                        </div>
                        
                        <div className="py-2">
                          <Link 
                            to="/dashboard" 
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                          >
                            <LayoutDashboard className="h-5 w-5" />
                            Mon Espace
                          </Link>
                          <Link 
                            to="/profile" 
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                          >
                            <User className="h-5 w-5" />
                            Profil
                          </Link>
                          <Link 
                            to="/children" 
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                          >
                            <Users className="h-5 w-5" />
                            Mes Enfants
                          </Link>
                          <Link 
                            to="/payments" 
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                          >
                            <CreditCard className="h-5 w-5" />
                            Paiements
                          </Link>
                          {user?.role === 'admin' && (
                            <Link 
                              to="/admin-secret-backoffice" 
                              onClick={() => setIsMenuOpen(false)}
                              className="flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                            >
                              <Shield className="h-5 w-5" />
                              Administration
                            </Link>
                          )}
                        </div>

                        <div className="border-t border-gray-100 py-2">
                          <Link 
                            to="/contact" 
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                          >
                            <Mail className="h-5 w-5" />
                            Contact
                          </Link>
                          <button 
                            onClick={handleLogout}
                            className="flex items-center gap-3 w-full text-left px-5 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <LogOut className="h-5 w-5" />
                            Déconnexion
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                /* Not logged in - Login/Register buttons */
                <div className="flex items-center gap-2">
                  <Link to="/login">
                    <Button variant="ghost" className="text-gray-800 hover:text-red-600 font-semibold text-sm">
                      Connexion
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button className="bg-red-600 hover:bg-red-700 text-white text-sm">
                      Inscription
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile: Cart + Hamburger */}
          <div className="lg:hidden flex items-center gap-3">
            {/* ============================================================
                BOUTIQUE / CART FEATURE - DISABLED (commented out)
                To re-enable: uncomment the mobile Cart Button below
            ============================================================ */}
            {/* <Button onClick={toggleCart} variant="ghost" className="relative p-2 text-gray-800">
              <ShoppingBag className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-sm ring-2 ring-white">
                  {cartItemCount}
                </span>
              )}
            </Button> */}
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-gray-200 bg-white overflow-hidden"
            >
              <div className="flex flex-col space-y-1 px-2 py-4">
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-800 hover:bg-red-50 hover:text-red-600 font-medium py-3 px-4 rounded-lg block transition-colors">Accueil</Link>
                <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-800 hover:bg-red-50 hover:text-red-600 font-medium py-3 px-4 rounded-lg block transition-colors">À Propos</Link>
                
                <div className="rounded-lg overflow-hidden">
                  <button 
                    onClick={() => setIsSportsOpen(!isSportsOpen)}
                    className="flex items-center justify-between w-full text-gray-800 hover:bg-red-50 hover:text-red-600 font-medium py-3 px-4 rounded-lg transition-colors text-left"
                  >
                    Sports <ChevronDown className={`h-4 w-4 transform transition-transform ${isSportsOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isSportsOpen && (
                    <div className="bg-gray-50 py-2 px-4 space-y-1 ml-4 border-l-2 border-gray-200 my-1">
                      <Link to="/football" onClick={() => setIsMobileMenuOpen(false)} className="block text-sm font-medium text-gray-600 hover:text-red-600 py-2">Football</Link>
                      <Link to="/basketball" onClick={() => setIsMobileMenuOpen(false)} className="block text-sm font-medium text-gray-600 hover:text-red-600 py-2">Basketball</Link>
                      <Link to="/tennis" onClick={() => setIsMobileMenuOpen(false)} className="block text-sm font-medium text-gray-600 hover:text-red-600 py-2">Tennis</Link>
                    </div>
                  )}
                </div>

                <Link to="/schedule" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-800 hover:bg-red-50 hover:text-red-600 font-medium py-3 px-4 rounded-lg block transition-colors">Planning</Link>
                <Link to="/pricing" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-800 hover:bg-red-50 hover:text-red-600 font-medium py-3 px-4 rounded-lg block transition-colors">Tarifs</Link>
                {/* ============================================================
                    BOUTIQUE FEATURE - DISABLED (commented out)
                    To re-enable: uncomment the mobile Boutique nav link below
                ============================================================ */}
                {/* <Link to="/store" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-800 hover:bg-red-50 hover:text-red-600 font-medium py-3 px-4 rounded-lg block transition-colors">Boutique</Link> */}
                
                {user ? (
                  <>
                  <div className="border-t border-gray-200 my-2 pt-2">
                    <p className="px-4 py-2 text-xs text-gray-500 uppercase tracking-wider font-semibold">Mon Compte</p>
                  </div>
                  <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-800 hover:bg-red-50 hover:text-red-600 font-medium py-3 px-4 rounded-lg block transition-colors">Mon Espace</Link>
                  <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-800 hover:bg-red-50 hover:text-red-600 font-medium py-3 px-4 rounded-lg block transition-colors">Profil</Link>
                  <Link to="/children" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-800 hover:bg-red-50 hover:text-red-600 font-medium py-3 px-4 rounded-lg block transition-colors">Mes Enfants</Link>
                  <Link to="/payments" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-800 hover:bg-red-50 hover:text-red-600 font-medium py-3 px-4 rounded-lg block transition-colors">Paiements</Link>
                    {user?.role === 'admin' && (
                      <Link to="/admin-secret-backoffice" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-800 hover:bg-red-50 hover:text-red-600 font-medium py-3 px-4 rounded-lg block transition-colors">Administration</Link>
                    )}
                    <button onClick={handleLogout} className="text-red-600 hover:bg-red-50 font-medium py-3 px-4 rounded-lg block transition-colors text-left w-full">Déconnexion</button>
                  </>
                ) : (
                  <>
                    <div className="border-t border-gray-200 my-2 pt-2">
                      <p className="px-4 py-2 text-xs text-gray-500 uppercase tracking-wider font-semibold">Compte</p>
                    </div>
                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-800 hover:bg-red-50 hover:text-red-600 font-medium py-3 px-4 rounded-lg block transition-colors">Connexion</Link>
                    <Link to="/register" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-800 hover:bg-red-50 hover:text-red-600 font-medium py-3 px-4 rounded-lg block transition-colors">Inscription</Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;