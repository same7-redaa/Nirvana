import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Lightbulb, Shield, Award, Eye, Zap, HeartHandshake,
  Settings, Users, BadgeDollarSign, ArrowRight, CheckCircle2,
  Home as HomeIcon, Building, Factory, Network,
  Camera, Lock, Activity, Thermometer, Sun,
  Key, Clock, Video, Monitor, LogIn,
  Flame, Bell, Cloud, Package,
  Router, Cpu, Radio, Server, Wifi,
  Handshake, Map, PencilRuler, Wrench, Layers, Calculator
} from 'lucide-react';
import { motion } from 'framer-motion';
import { ValueItem } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const Home: React.FC = () => {
  const { t, translations } = useLanguage();
  const navigate = useNavigate();

  const detailedServices = [
    {
      sectionId: 'smart-home',
      title: t(translations.home.detailedServices.smartHome.title),
      icon: HomeIcon,
      description: t(translations.home.detailedServices.smartHome.description),
    },
    {
      sectionId: 'smart-office',
      title: t(translations.home.detailedServices.smartOffice.title),
      icon: Building,
      description: t(translations.home.detailedServices.smartOffice.description),
    },
    {
      sectionId: 'smart-factory',
      title: t(translations.home.detailedServices.smartFactory.title),
      icon: Factory,
      description: t(translations.home.detailedServices.smartFactory.description),
    },
    {
      sectionId: 'networks',
      title: t(translations.home.detailedServices.networks.title),
      icon: Network,
      description: t(translations.home.detailedServices.networks.description),
    },
    {
      sectionId: 'bms',
      title: t(translations.home.detailedServices.bms.title),
      icon: Layers,
      description: t(translations.home.detailedServices.bms.description),
    },
    {
      sectionId: 'accounting',
      title: t(translations.home.detailedServices.accounting.title),
      icon: Calculator,
      description: t(translations.home.detailedServices.accounting.description),
    }
  ];

  const handleServiceClick = (sectionId: string) => {
    navigate('/services');
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const navbarHeight = 80;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: elementPosition - navbarHeight,
          behavior: 'smooth'
        });
      }
    }, 300);
  };

  const values: ValueItem[] = [
    { title: t(translations.home.valuesList.innovation), englishTitle: t(translations.home.valuesList.innovationEn), icon: Lightbulb },
    { title: t(translations.home.valuesList.security), englishTitle: t(translations.home.valuesList.securityEn), icon: Shield },
    { title: t(translations.home.valuesList.quality), englishTitle: t(translations.home.valuesList.qualityEn), icon: Award },
    { title: t(translations.home.valuesList.transparency), englishTitle: t(translations.home.valuesList.transparencyEn), icon: Eye },
    { title: t(translations.home.valuesList.responsiveness), englishTitle: t(translations.home.valuesList.responsivenessEn), icon: Zap },
    { title: t(translations.home.valuesList.satisfaction), englishTitle: t(translations.home.valuesList.satisfactionEn), icon: HeartHandshake },
  ];

  const brandLogos = [
    { name: "Hikvision", logo: "/images/logos/hikvision-1.svg" },
    { name: "EZVIZ", logo: "/images/logos/ezviz-logo.png" },
    { name: "ZKTECO", logo: "/images/logos/ZKTECO.png" },
    { name: "DAHUA", logo: "/images/logos/DAHUA.png" },
    { name: "Samsung", logo: "/images/logos/samsung-electronics.svg" },
    { name: "Samsung Wisenet", logo: "/images/logos/SamsungWisenet.jpg" },
    { name: "Google", logo: "/images/logos/google-1-1.svg" },
    { name: "Aqara", logo: "/images/logos/aqara_logo.jpg" },
    { name: "Alexa", logo: "/images/logos/alexa_logo.png" },
    { name: "Tuya", logo: "/images/logos/tuya-.png" },
  ];

  return (
    <div className="overflow-hidden">

      {/* Dynamic Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-dark via-dark to-dark/95">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gold/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gold/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Decorative Pattern */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-block mb-4 px-4 py-1.5 rounded-full border border-gold/30 bg-gold/10 backdrop-blur-md"
          >
            <span className="text-gold font-bold tracking-widest text-sm uppercase">{t(translations.home.hero.tagline)}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight leading-tight"
          >
            {t(translations.home.hero.title)} <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light">{t(translations.home.hero.titleHighlight)}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-3xl text-gray-300 font-light mb-12 max-w-3xl"
          >
            {t(translations.home.hero.subtitle)}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-5"
          >
            <Link to="/services">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-gold hover:bg-gold-light text-dark font-bold rounded-xl shadow-[0_0_30px_rgba(207,161,102,0.4)] transition-all flex items-center gap-2"
              >
                <span>{t(translations.home.hero.discoverServices)}</span>
                <ArrowRight size={20} />
              </motion.button>
            </Link>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-transparent border border-white/30 text-white font-bold rounded-xl backdrop-blur-sm transition-all"
              >
                {t(translations.home.hero.contactUs)}
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* About Section - Modern asymmetrical layout */}
      <section id="about" className="py-24 bg-cream relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gold/5 skew-x-12 transform origin-top pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="lg:w-1/2"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-1 bg-gold"></div>
                <span className="text-gold font-bold tracking-widest uppercase">{t(translations.home.about.label)}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-dark mb-8 leading-normal md:leading-relaxed">
                {t(translations.home.about.title)} <br /><span className="text-gold">{t(translations.home.about.titleHighlight)}</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {t(translations.home.about.description1)}
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {t(translations.home.about.description2)}
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-gold" />
                  <span className="font-bold text-dark">{t(translations.home.about.innovativeSolutions)}</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-gold" />
                  <span className="font-bold text-dark">{t(translations.home.about.highSecurity)}</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-gold" />
                  <span className="font-bold text-dark">{t(translations.home.about.support247)}</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-gold" />
                  <span className="font-bold text-dark">{t(translations.home.about.warranty)}</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 relative"
            >
              {/* Success Projects Card - Top Right */}
              <div className="absolute -top-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border-t-4 border-gold hidden md:block z-20">
                <p className="font-black text-4xl text-gold mb-1">+500</p>
                <p className="text-sm font-bold text-gray-500">{t(translations.home.about.successfulProjects)}</p>
              </div>

              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img src="/images/home.jpeg" alt="Smart Home" className="w-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gold/20 rounded-full blur-3xl -z-10"></div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-dark/10 rounded-full blur-3xl -z-10"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Detailed Services Section */}
      <section id="services" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-gold font-bold tracking-widest uppercase block mb-3"
            >
              {t(translations.home.services.label)}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-black text-dark"
            >
              {t(translations.home.services.title)} <span className="text-gold">{t(translations.home.services.titleHighlight)}</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {detailedServices.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => handleServiceClick(service.sectionId)}
                className="relative bg-gradient-to-br from-white via-cream/20 to-white p-8 rounded-3xl hover:shadow-2xl border-2 border-gray-100 hover:border-gold/40 transition-all duration-500 group overflow-hidden cursor-pointer"
              >
                {/* Decorative gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold/0 via-gold/5 to-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-gold/10 to-transparent rounded-bl-full"></div>

                <div className="relative z-10 flex flex-col items-center text-center">
                  {/* Icon with animated background */}
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-gold/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                    <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-gold to-gold-dark text-white flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                      <service.icon size={48} strokeWidth={1.5} />
                    </div>
                  </div>

                  <h3 className="text-2xl font-black text-dark mb-3 group-hover:text-gold transition-colors">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {service.description}
                  </p>

                  {/* Click indicator */}
                  <div className="mt-6 flex items-center gap-2 text-gold opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-sm font-bold">{t(translations.home.services.viewAll)}</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center">
            <Link to="/services">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-5 bg-dark text-white font-bold rounded-xl shadow-lg hover:bg-gold hover:text-dark transition-colors flex items-center gap-3"
              >
                <span>{t(translations.home.services.viewAll)}</span>
                <ArrowRight size={20} />
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* Core Values - Bento Grid Style */}
      <section id="values" className="py-24 bg-cream-dark bg-tech-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-gold font-bold tracking-widest uppercase block mb-2"
            >
              {t(translations.home.values.label)}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl font-black text-dark"
            >
              {t(translations.home.values.title)}
            </motion.h2>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {values.map((val, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-2xl shadow-card hover:shadow-glow border border-transparent hover:border-gold/30 transition-all duration-300 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-cream-dark text-dark group-hover:bg-gold group-hover:text-white flex items-center justify-center mb-6 transition-colors duration-300">
                  <val.icon size={32} strokeWidth={1.5} />
                </div>
                <h4 className="text-xl font-bold text-dark mb-2">{val.title}</h4>
                <p className="text-gray-400 font-sans text-sm tracking-wide group-hover:text-gold transition-colors">{val.englishTitle}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Workflow Section */}
      <section id="workflow" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-gold font-bold tracking-widest uppercase block mb-2"
            >
              {t(translations.home.workflow.label)}
            </motion.span>
            <h2 className="text-4xl font-black text-dark">{t(translations.home.workflow.title)}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Handshake, step: "01", title: t(translations.home.workflow.step1), desc: t(translations.home.workflow.step1Desc) },
              { icon: Map, step: "02", title: t(translations.home.workflow.step2), desc: t(translations.home.workflow.step2Desc) },
              { icon: PencilRuler, step: "03", title: t(translations.home.workflow.step3), desc: t(translations.home.workflow.step3Desc) },
              { icon: Wrench, step: "04", title: t(translations.home.workflow.step4), desc: t(translations.home.workflow.step4Desc) }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="relative bg-white p-8 rounded-2xl shadow-card hover:shadow-glow transition-all duration-300 border border-transparent hover:border-gold/30 group"
              >
                <div className="absolute -top-6 right-8 w-12 h-12 bg-dark text-gold font-black flex items-center justify-center rounded-xl shadow-lg border border-gold z-10 group-hover:scale-110 transition-transform">
                  {item.step}
                </div>
                <div className="mt-4 mb-6 text-gold-dark opacity-80 group-hover:text-gold transition-colors">
                  <item.icon size={48} strokeWidth={1.5} />
                </div>
                <h4 className="text-xl font-bold mb-2 text-dark">{item.title}</h4>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us - Dark Section */}
      <section id="whyus" className="py-24 bg-dark text-white relative overflow-hidden">
        {/* Abstract shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-gold/20 blur-[100px]"></div>
          <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[100px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-2">{t(translations.home.whyUs.title)} <span className="text-gold">{t(translations.home.whyUs.titleHighlight)}</span></h2>
              <p className="text-gray-400 font-sans tracking-widest uppercase">{t(translations.home.whyUs.label)}</p>
            </div>
            <div className="hidden md:block w-1/3 h-[1px] bg-gray-700 mb-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Settings, title: t(translations.home.whyUs.comprehensive), sub: t(translations.home.whyUs.label), desc: t(translations.home.whyUs.comprehensiveDesc) },
              { icon: Award, title: t(translations.home.whyUs.premiumQuality), sub: t(translations.home.whyUs.label), desc: t(translations.home.whyUs.qualityDesc) },
              { icon: BadgeDollarSign, title: t(translations.home.whyUs.competitive), sub: t(translations.home.whyUs.label), desc: t(translations.home.whyUs.competitiveDesc) },
              { icon: Users, title: t(translations.home.whyUs.professional), sub: t(translations.home.whyUs.label), desc: t(translations.home.whyUs.professionalDesc) }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="glass-dark p-8 rounded-2xl border border-white/5 hover:border-gold/50 transition-colors group"
              >
                <item.icon size={40} className="text-gold mb-6 group-hover:scale-110 transition-transform" />
                <h4 className="text-xl font-bold mb-1">{item.title}</h4>
                <p className="text-xs text-gray-500 font-sans mb-4">{item.sub}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted Brands */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">{t(translations.home.brands.label)}</span>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-5 gap-6 md:gap-8"
          >
            {brandLogos.map((brand, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{ scale: 1.1, y: -5 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-center p-3 md:p-4 rounded-xl hover:bg-cream transition-colors duration-300 cursor-default"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-8 md:h-12 w-auto object-contain max-w-full"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;