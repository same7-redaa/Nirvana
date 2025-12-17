import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram, Twitter, Linkedin, Facebook, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t, translations } = useLanguage();
  return (
    <footer className="bg-dark text-white pt-20 pb-10 border-t border-white/10 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-gold/40 shadow-lg">
                <img src="/images/logo.png" alt="Nirvana IOT Logo" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-2xl tracking-tight leading-none">NIRVANA</span>
                <span className="text-[10px] text-gold tracking-[0.25em] font-bold uppercase">IOT Solutions</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-7 mb-6">
              {t(translations.footer.description)}
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Linkedin, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-gold hover:text-dark transition-all duration-300">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white">{t(translations.footer.quickLinks)}</h3>
            <ul className="space-y-4">
              {[
                { name: t(translations.footer.home), path: '/' },
                { name: t(translations.footer.ourServices), path: '/services' },
                { name: t(translations.footer.aboutUs), path: '/' },
                { name: t(translations.footer.contactUs), path: '/contact' }
              ].map((link, i) => (
                <li key={i}>
                  <Link to={link.path} className="text-gray-400 hover:text-gold transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold/50 group-hover:bg-gold transition-colors"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white">{t(translations.footer.services)}</h3>
            <ul className="space-y-4">
              {[t(translations.footer.smartHomes), t(translations.footer.smartOffices), t(translations.footer.smartFactories), t(translations.footer.networkSystems)].map((item, i) => (
                <li key={i} className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white">{t(translations.footer.contact)}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin className="text-gold mt-1 flex-shrink-0" size={18} />
                <span>الرياض، المملكة العربية السعودية</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone className="text-gold flex-shrink-0" size={18} />
                <span dir="ltr">+966 533 46 1133</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Mail className="text-gold flex-shrink-0" size={18} />
                <span className="font-sans">info@nirvanaiot.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© 2025 Nirvana IOT. {t(translations.footer.allRightsReserved)}</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-gold">{t(translations.footer.privacyPolicy)}</a>
            <a href="#" className="hover:text-gold">{t(translations.footer.termsOfUse)}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;