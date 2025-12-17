import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { language, toggleLanguage, t, translations } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t(translations.navbar.home), path: '/' },
    { name: t(translations.navbar.services), path: '/services' },
    { name: t(translations.navbar.contact), path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled || isOpen ? 'bg-white/90 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'} ${isOpen ? 'md:rounded-none rounded-b-3xl' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo Section */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-3 group">
            <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-xl overflow-hidden border-2 border-gold/30 group-hover:border-gold transition-all group-hover:scale-105">
              <img src="/images/logo.png" alt="Nirvana IOT Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className={`font-extrabold text-2xl tracking-tight leading-none ${scrolled || isOpen ? 'text-dark' : 'text-white'} transition-colors`}>
                NIRVANA
              </span>
              <span className="text-[10px] text-gold tracking-[0.2em] font-bold uppercase">IOT Solutions</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 space-x-reverse bg-white/5 backdrop-blur-sm px-8 py-3 rounded-full border border-white/10 shadow-sm">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-2 py-1 text-base font-bold transition-colors duration-300 ${isActive(link.path)
                  ? 'text-gold'
                  : (scrolled || location.pathname !== '/' ? 'text-dark hover:text-gold' : 'text-white hover:text-gold')
                  }`}
              >
                {isActive(link.path) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 right-0 w-full h-0.5 bg-gold rounded-full"
                  />
                )}
                {link.name}
              </Link>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4 space-x-reverse">
            <button onClick={toggleLanguage} className={`flex items-center gap-1 text-sm font-bold transition-colors ${scrolled || location.pathname !== '/' ? 'text-dark hover:text-gold' : 'text-white hover:text-gold'}`}>
              <Globe size={18} />
              <span>{language === 'ar' ? 'En' : 'ع'}</span>
            </button>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gold hover:bg-gold-dark text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-gold/30 flex items-center gap-2 transition-colors"
              >
                <Smartphone size={18} />
                <span>اتصل بنا</span>
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`${scrolled || location.pathname !== '/' || isOpen ? 'text-dark' : 'text-white'} hover:text-gold transition-colors focus:outline-none`}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white overflow-hidden rounded-b-3xl shadow-lg"
          >
            <div className="px-4 pt-3 pb-5 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-base font-bold flex items-center justify-between ${isActive(link.path)
                    ? 'bg-cream text-gold'
                    : 'text-dark hover:bg-gray-50'
                    }`}
                >
                  {link.name}
                  {isActive(link.path) && <div className="w-2 h-2 rounded-full bg-gold"></div>}
                </Link>
              ))}
              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center px-4">
                <button onClick={toggleLanguage} className="font-bold text-gray-500 hover:text-gold transition-colors">
                  {language === 'ar' ? 'English' : 'العربية'}
                </button>
                <Globe size={20} className="text-gold" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;