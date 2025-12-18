import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Phone, ChevronDown, Home, Briefcase, Users, Settings, Mail, ShoppingBag, Building, Factory, Lock, Network, Layers, Calculator } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Category } from '../types/product';

interface ServiceLink {
  name: string;
  path: string;
  sectionId: string;
  icon: React.ElementType;
}

interface NavLink {
  name: string;
  path: string;
  isSection?: boolean;
  sectionId?: string;
  icon?: React.ElementType;
  hasMegaMenu?: boolean;
  megaMenuType?: 'products' | 'services';
  subLinks?: { name: string; path: string; sectionId?: string }[];
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
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

  // Fetch categories for mega menu
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesQuery = query(collection(db, 'categories'), orderBy('order', 'asc'));
        const snapshot = await getDocs(categoriesQuery);
        const categoriesData: Category[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data() as Category;
          if (data.isActive) {
            categoriesData.push({ id: doc.id, ...data });
          }
        });
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null);
      setHoveredMenu(null);
    };
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
    setHoveredMenu(null);

    if (link.isSection && link.sectionId) {
      if (location.pathname === '/') {
        scrollToSection(link.sectionId);
      } else {
        navigate('/');
        setTimeout(() => scrollToSection(link.sectionId!), 100);
      }
    }
  };

  // Updated service links matching Services.tsx
  const serviceLinks: ServiceLink[] = [
    { name: language === 'ar' ? 'المنازل الذكية' : 'Smart Homes', path: '/services', sectionId: 'smart-home', icon: Home },
    { name: language === 'ar' ? 'المكاتب الذكية' : 'Smart Offices', path: '/services', sectionId: 'smart-office', icon: Building },
    { name: language === 'ar' ? 'المصانع الذكية' : 'Smart Factories', path: '/services', sectionId: 'smart-factory', icon: Factory },
    { name: language === 'ar' ? 'أنظمة الأمان' : 'Security Systems', path: '/services', sectionId: 'security', icon: Lock },
    { name: language === 'ar' ? 'الشبكات' : 'Networks', path: '/services', sectionId: 'networks', icon: Network },
    { name: language === 'ar' ? 'إدارة المباني' : 'Building Management', path: '/services', sectionId: 'bms', icon: Layers },
    { name: language === 'ar' ? 'الأنظمة المحاسبية' : 'Accounting Systems', path: '/services', sectionId: 'accounting', icon: Calculator },
  ];

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
      hasMegaMenu: true,
      megaMenuType: 'services'
    },
    {
      name: language === 'ar' ? 'طريقة العمل' : 'How We Work',
      path: '/#workflow',
      isSection: true,
      sectionId: 'workflow',
      icon: Settings
    },
    {
      name: language === 'ar' ? 'المنتجات' : 'Products',
      path: '/products',
      icon: ShoppingBag,
      hasMegaMenu: true,
      megaMenuType: 'products'
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
  const isDark = !scrolled && !isOpen && !hoveredMenu;

  const handleCategoryClick = (categoryId: string) => {
    setHoveredMenu(null);
    navigate(`/products?category=${categoryId}`);
  };

  const handleServiceClick = (sectionId: string) => {
    setHoveredMenu(null);
    if (location.pathname === '/services') {
      scrollToSection(sectionId);
    } else {
      navigate('/services');
      setTimeout(() => scrollToSection(sectionId), 300);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled || isOpen || hoveredMenu
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
              <div
                key={link.path}
                className="relative"
                onMouseEnter={() => link.hasMegaMenu && setHoveredMenu(link.path)}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                {link.hasMegaMenu ? (
                  // Mega Menu trigger
                  <div className="relative">
                    <Link
                      to={link.path}
                      className={`flex items-center gap-1 px-4 py-2.5 rounded-xl text-base font-bold transition-all duration-300 ${isActive(link.path) || hoveredMenu === link.path
                        ? 'text-gold bg-gold/10'
                        : isDark
                          ? 'text-white hover:text-gold hover:bg-white/10'
                          : 'text-dark/80 hover:text-gold hover:bg-gold/5'
                        }`}
                    >
                      {link.name}
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-300 ${hoveredMenu === link.path ? 'rotate-180' : ''}`}
                      />
                    </Link>
                  </div>
                ) : link.isSection ? (
                  // Section link
                  <button
                    onClick={() => handleNavClick(link)}
                    className={`px-4 py-2.5 rounded-xl text-base font-bold transition-all duration-300 ${isDark
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
                    className={`relative px-4 py-2.5 rounded-xl text-base font-bold transition-all duration-300 ${isActive(link.path)
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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleLanguage}
              className={`flex items-center justify-center px-3 h-10 rounded-xl transition-all font-bold text-sm ${isDark
                ? 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                : 'bg-gray-100 text-dark hover:bg-gold/10 hover:text-gold'
                }`}
              title={language === 'ar' ? 'Switch to English' : 'التحويل للعربية'}
            >
              {language === 'ar' ? 'EN' : 'AR'}
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
              className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all font-bold text-sm ${isDark
                ? 'bg-white/10 text-white'
                : 'bg-gray-100 text-dark'
                }`}
            >
              {language === 'ar' ? 'EN' : 'AR'}
            </button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-xl transition-all ${isDark ? 'text-white hover:bg-white/10' : 'text-dark hover:bg-gray-100'}`}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mega Menu Bar - Desktop */}
      <AnimatePresence>
        {hoveredMenu && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="hidden lg:block bg-white border-t border-gray-100 shadow-lg"
            onMouseEnter={() => setHoveredMenu(hoveredMenu)}
            onMouseLeave={() => setHoveredMenu(null)}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              {/* Products Mega Menu */}
              {hoveredMenu === '/products' && (
                <div className="flex items-center justify-center flex-wrap gap-3">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryClick(category.id!)}
                      className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-gold/10 transition-colors group"
                    >
                      <div className="w-14 h-14 rounded-lg overflow-hidden bg-white border border-gray-100 group-hover:border-gold/40 transition-colors">
                        <img
                          src={category.imageUrl}
                          alt={language === 'ar' ? category.nameAr : category.nameEn}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <span className="text-xs font-bold text-dark group-hover:text-gold transition-colors text-center whitespace-nowrap max-w-[80px] truncate">
                        {language === 'ar' ? category.nameAr : category.nameEn}
                      </span>
                    </button>
                  ))}
                  {categories.length === 0 && (
                    <div className="text-center py-4 text-gray-500 text-sm w-full">
                      {language === 'ar' ? 'لا توجد فئات' : 'No categories'}
                    </div>
                  )}
                </div>
              )}

              {/* Services Mega Menu */}
              {hoveredMenu === '/services' && (
                <div className="flex items-center justify-center flex-wrap gap-2">
                  {serviceLinks.map((service, idx) => {
                    const IconComponent = service.icon;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleServiceClick(service.sectionId)}
                        className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-gold/10 transition-colors group"
                      >
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center border border-gold/20 group-hover:border-gold/40 transition-colors">
                          <IconComponent size={20} className="text-gold" />
                        </div>
                        <span className="text-[10px] font-bold text-dark group-hover:text-gold transition-colors text-center max-w-[70px]">
                          {service.name}
                        </span>
                      </button>
                    );
                  })}
                  {/* View All Button */}
                  <Link
                    to="/services"
                    onClick={() => setHoveredMenu(null)}
                    className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-gold/10 hover:bg-gold/20 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
                      <Briefcase size={20} className="text-white" />
                    </div>
                    <span className="text-[10px] font-bold text-gold text-center whitespace-nowrap">
                      {language === 'ar' ? 'كل الخدمات' : 'All Services'}
                    </span>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-6 space-y-2">
              {navLinks.map((link) => (
                <div key={link.path}>
                  {link.hasMegaMenu ? (
                    <div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveDropdown(activeDropdown === link.path ? null : link.path);
                        }}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-bold transition-all ${isActive(link.path)
                          ? 'text-gold bg-gold/10'
                          : 'text-dark hover:bg-gold/5 hover:text-gold'
                          }`}
                      >
                        <span className="flex items-center gap-3">
                          {link.icon && <link.icon size={20} />}
                          {link.name}
                        </span>
                        <ChevronDown
                          size={18}
                          className={`transition-transform ${activeDropdown === link.path ? 'rotate-180' : ''}`}
                        />
                      </button>

                      <AnimatePresence>
                        {activeDropdown === link.path && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pr-8 mt-2 space-y-1"
                          >
                            <Link
                              to={link.path}
                              onClick={() => { setIsOpen(false); setActiveDropdown(null); }}
                              className="block px-4 py-2 rounded-lg text-sm font-medium text-gold hover:bg-gold/10"
                            >
                              {language === 'ar' ? 'عرض الكل' : 'View All'}
                            </Link>

                            {link.megaMenuType === 'products' && categories.map((category) => (
                              <button
                                key={category.id}
                                onClick={() => {
                                  setIsOpen(false);
                                  setActiveDropdown(null);
                                  handleCategoryClick(category.id!);
                                }}
                                className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gold/10 hover:text-gold"
                              >
                                <img
                                  src={category.imageUrl}
                                  alt=""
                                  className="w-8 h-8 rounded object-contain bg-gray-100"
                                />
                                {language === 'ar' ? category.nameAr : category.nameEn}
                              </button>
                            ))}

                            {link.megaMenuType === 'services' && serviceLinks.map((service, idx) => (
                              <button
                                key={idx}
                                onClick={() => {
                                  setIsOpen(false);
                                  setActiveDropdown(null);
                                  handleServiceClick(service.sectionId!);
                                }}
                                className="w-full text-right block px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gold/10 hover:text-gold"
                              >
                                {service.name}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : link.isSection ? (
                    <button
                      onClick={() => handleNavClick(link)}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-dark hover:bg-gold/5 hover:text-gold transition-all"
                    >
                      {link.icon && <link.icon size={20} />}
                      {link.name}
                    </button>
                  ) : (
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${isActive(link.path)
                        ? 'text-gold bg-gold/10'
                        : 'text-dark hover:bg-gold/5 hover:text-gold'
                        }`}
                    >
                      {link.icon && <link.icon size={20} />}
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}

              {/* Mobile CTA */}
              <div className="pt-4 mt-4 border-t border-gray-100">
                <Link to="/contact" onClick={() => setIsOpen(false)}>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    className="w-full bg-gradient-to-r from-gold to-gold-dark text-white py-3 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2"
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