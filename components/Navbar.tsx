import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Globe, Phone, ChevronDown, Home, Briefcase, Users, Settings, Mail, Languages } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

interface NavLink {
  name: string;
  path: string;
  isSection?: boolean;
  sectionId?: string;
  icon?: React.ElementType;
  subLinks?: { name: string; path: string; sectionId?: string }[];
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { language, toggleLanguage, t, translations } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setActiveDropdown(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - navbarHeight,
        behavior: 'smooth'
      });
    }
  };

  const handleNavClick = (link: NavLink) => {
    setIsOpen(false);
    setActiveDropdown(null);

    if (link.isSection && link.sectionId) {
      if (location.pathname === '/') {
        scrollToSection(link.sectionId);
      } else {
        navigate('/');
        setTimeout(() => scrollToSection(link.sectionId!), 100);
      }
    }
  };

  const navLinks: NavLink[] = [
    {
      name: t(translations.navbar.home),
      path: '/',
      icon: Home
    },
    {
      name: language === 'ar' ? 'من نحن' : 'About Us',
      path: '/#about',
      isSection: true,
      sectionId: 'about',
      icon: Users
    },
    {
      name: t(translations.navbar.services),
      path: '/services',
      icon: Briefcase,
      subLinks: [
        { name: language === 'ar' ? 'المنازل الذكية' : 'Smart Homes', path: '/services', sectionId: 'smart-home' },
        { name: language === 'ar' ? 'المكاتب الذكية' : 'Smart Offices', path: '/services', sectionId: 'smart-office' },
        { name: language === 'ar' ? 'المصانع الذكية' : 'Smart Factories', path: '/services', sectionId: 'smart-factory' },
        { name: language === 'ar' ? 'الشبكات' : 'Networks', path: '/services', sectionId: 'networks' },
      ]
    },
    {
      name: language === 'ar' ? 'طريقة العمل' : 'How We Work',
      path: '/#workflow',
      isSection: true,
      sectionId: 'workflow',
      icon: Settings
    },
    {
      name: t(translations.navbar.contact),
      path: '/contact',
      icon: Mail
    },
  ];

  const isActive = (path: string) => {
    if (path.includes('#')) {
      return false;
    }
    return location.pathname === path;
  };

  const isHomePage = location.pathname === '/';
  const isDark = !scrolled && !isOpen;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled || isOpen
        ? 'bg-white/95 backdrop-blur-lg shadow-lg py-2'
        : 'bg-gradient-to-b from-dark/50 to-transparent py-4'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo Section */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-3 group">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="relative w-12 h-12 md:w-14 md:h-14 rounded-xl overflow-hidden border-2 border-gold/40 group-hover:border-gold transition-all shadow-lg"
            >
              <img src="/images/logo.png" alt="Nirvana IOT Logo" className="w-full h-full object-contain" />
            </motion.div>
            <div className="flex flex-col">
              <span className={`font-black text-xl md:text-2xl tracking-tight leading-none transition-colors ${isDark ? 'text-white' : 'text-dark'}`}>
                NIRVANA
              </span>
              <span className="text-[10px] text-gold tracking-[0.25em] font-bold uppercase">
                {t(translations.navbar.iotSolutions)}
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div key={link.path} className="relative">
                {link.subLinks ? (
                  // Dropdown menu
                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveDropdown(activeDropdown === link.path ? null : link.path);
                      }}
                      className={`flex items-center gap-1 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${isActive(link.path) || activeDropdown === link.path
                        ? 'text-gold bg-gold/10'
                        : isDark
                          ? 'text-white hover:text-gold hover:bg-white/10'
                          : 'text-dark/80 hover:text-gold hover:bg-gold/5'
                        }`}
                    >
                      {link.name}
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-300 ${activeDropdown === link.path ? 'rotate-180' : ''}`}
                      />
                    </button>

                    <AnimatePresence>
                      {activeDropdown === link.path && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full mt-2 right-0 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50"
                        >
                          <div className="p-2">
                            <Link
                              to={link.path}
                              onClick={() => setActiveDropdown(null)}
                              className="block px-4 py-3 rounded-xl text-sm font-bold text-dark hover:bg-gold/10 hover:text-gold transition-colors border-b border-gray-100 mb-1"
                            >
                              {language === 'ar' ? 'عرض الكل' : 'View All'}
                            </Link>
                            {link.subLinks.map((subLink, idx) => (
                              <button
                                key={idx}
                                onClick={() => {
                                  setActiveDropdown(null);
                                  if (subLink.sectionId) {
                                    if (location.pathname === '/services') {
                                      scrollToSection(subLink.sectionId);
                                    } else {
                                      navigate('/services');
                                      setTimeout(() => scrollToSection(subLink.sectionId!), 300);
                                    }
                                  }
                                }}
                                className="w-full text-right block px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gold/10 hover:text-gold transition-colors"
                              >
                                {subLink.name}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : link.isSection ? (
                  // Section link
                  <button
                    onClick={() => handleNavClick(link)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${isDark
                      ? 'text-white hover:text-gold hover:bg-white/10'
                      : 'text-dark/80 hover:text-gold hover:bg-gold/5'
                      }`}
                  >
                    {link.name}
                  </button>
                ) : (
                  // Regular link
                  <Link
                    to={link.path}
                    className={`relative px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${isActive(link.path)
                      ? 'text-gold bg-gold/10'
                      : isDark
                        ? 'text-white hover:text-gold hover:bg-white/10'
                        : 'text-dark/80 hover:text-gold hover:bg-gold/5'
                      }`}
                  >
                    {link.name}
                    {isActive(link.path) && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-gold rounded-full"
                      />
                    )}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleLanguage}
              className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all ${isDark
                ? 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                : 'bg-gray-100 text-dark hover:bg-gold/10 hover:text-gold'
                }`}
              title={language === 'ar' ? 'Switch to English' : 'التحويل للعربية'}
            >
              <Languages size={20} />
            </motion.button>

            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: '0 10px 30px rgba(207,161,102,0.4)' }}
                whileTap={{ scale: 0.97 }}
                className="bg-gradient-to-r from-gold to-gold-dark hover:from-gold-dark hover:to-gold text-white px-6 py-2.5 rounded-xl font-bold shadow-lg flex items-center gap-2 transition-all"
              >
                <Phone size={16} />
                <span>{t(translations.navbar.callUs)}</span>
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className={`w-9 h-9 rounded-lg flex items-center justify-center ${isDark ? 'bg-white/10 text-white' : 'bg-gray-100 text-dark'
                }`}
              title={language === 'ar' ? 'Switch to English' : 'التحويل للعربية'}
            >
              <Languages size={18} />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isDark ? 'text-white bg-white/10' : 'text-dark bg-gray-100'
                } hover:bg-gold hover:text-white`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
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
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white overflow-hidden shadow-2xl"
          >
            <div className="px-4 py-6 space-y-2 max-h-[70vh] overflow-y-auto">
              {navLinks.map((link) => (
                <div key={link.path}>
                  {link.subLinks ? (
                    <div className="space-y-1">
                      <Link
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-bold ${isActive(link.path) ? 'bg-gold/10 text-gold' : 'text-dark hover:bg-gray-50'
                          }`}
                      >
                        {link.icon && <link.icon size={20} />}
                        {link.name}
                      </Link>
                      <div className="mr-6 pr-4 border-r-2 border-gold/20 space-y-1">
                        {link.subLinks.map((subLink, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setIsOpen(false);
                              if (subLink.sectionId) {
                                if (location.pathname === '/services') {
                                  scrollToSection(subLink.sectionId);
                                } else {
                                  navigate('/services');
                                  setTimeout(() => scrollToSection(subLink.sectionId!), 300);
                                }
                              }
                            }}
                            className="w-full text-right block px-4 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:text-gold hover:bg-gold/5 transition-colors"
                          >
                            {subLink.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : link.isSection ? (
                    <button
                      onClick={() => handleNavClick(link)}
                      className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-bold text-dark hover:bg-gray-50 text-right"
                    >
                      {link.icon && <link.icon size={20} />}
                      {link.name}
                    </button>
                  ) : (
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-bold ${isActive(link.path) ? 'bg-gold/10 text-gold' : 'text-dark hover:bg-gray-50'
                        }`}
                    >
                      {link.icon && <link.icon size={20} />}
                      {link.name}
                      {isActive(link.path) && <div className="mr-auto w-2 h-2 rounded-full bg-gold"></div>}
                    </Link>
                  )}
                </div>
              ))}

              <div className="pt-4 mt-4 border-t border-gray-100">
                <Link to="/contact" onClick={() => setIsOpen(false)}>
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-gold to-gold-dark text-white py-4 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2"
                  >
                    <Phone size={18} />
                    <span>{t(translations.navbar.callUs)}</span>
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;