import React, { useState, useEffect } from 'react';
import {
  Home, Building, Factory, Network,
  ShieldCheck, ArrowLeft, Lock, FileText, CheckCircle, Layers, Calculator
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ServiceItem } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

const Services: React.FC = () => {
  const { t, translations } = useLanguage();


  const services: ServiceItem[] = [
    {
      id: 'smart-home',
      title: t(translations.services.cards.smartHome.title),
      subtitle: t(translations.services.cards.smartHome.subtitle),
      description: t(translations.services.cards.smartHome.description),
      icon: Home,
      image: "/images/smart-home-main.png",
      items: [
        t(translations.services.cards.smartHome.items.cameras),
        t(translations.services.cards.smartHome.items.locks),
        t(translations.services.cards.smartHome.items.sensors),
        t(translations.services.cards.smartHome.items.lighting),
        t(translations.services.cards.smartHome.items.curtains),
        t(translations.services.cards.smartHome.items.climate),
        t(translations.services.cards.smartHome.items.automation),
        t(translations.services.cards.smartHome.items.compatibility),
      ]
    },
    {
      id: 'smart-office',
      title: t(translations.services.cards.smartOffice.title),
      subtitle: t(translations.services.cards.smartOffice.subtitle),
      description: t(translations.services.cards.smartOffice.description),
      icon: Building,
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069",
      items: [
        t(translations.services.cards.smartOffice.items.access),
        t(translations.services.cards.smartOffice.items.attendance),
        t(translations.services.cards.smartOffice.items.cameras),
        t(translations.services.cards.smartOffice.items.meetings),
        t(translations.services.cards.smartOffice.items.lighting),
        t(translations.services.cards.smartOffice.items.climate),
        t(translations.services.cards.smartOffice.items.parking),
        t(translations.services.cards.smartOffice.items.doors),
        t(translations.services.cards.smartOffice.items.visitors),
      ]
    },
    {
      id: 'smart-factory',
      title: t(translations.services.cards.smartFactory.title),
      subtitle: t(translations.services.cards.smartFactory.subtitle),
      description: t(translations.services.cards.smartFactory.description),
      icon: Factory,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070",
      items: [
        t(translations.services.cards.smartFactory.items.cameras),
        t(translations.services.cards.smartFactory.items.gas),
        t(translations.services.cards.smartFactory.items.fire),
        t(translations.services.cards.smartFactory.items.environmental),
        t(translations.services.cards.smartFactory.items.energy),
        t(translations.services.cards.smartFactory.items.safety),
        t(translations.services.cards.smartFactory.items.warehouse),
        t(translations.services.cards.smartFactory.items.access),
      ]
    },
    {
      id: 'security',
      title: t(translations.services.cards.security.title),
      subtitle: t(translations.services.cards.security.subtitle),
      description: t(translations.services.cards.security.description),
      icon: Lock,
      image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=2070",
      items: [
        t(translations.services.cards.security.items.types),
        t(translations.services.cards.security.items.features),
        t(translations.services.cards.security.items.gasSensors),
        t(translations.services.cards.security.items.smoke),
        t(translations.services.cards.security.items.motion),
        t(translations.services.cards.security.items.alerts),
      ]
    },
    {
      id: 'networks',
      title: t(translations.services.cards.networks.title),
      subtitle: t(translations.services.cards.networks.subtitle),
      description: t(translations.services.cards.networks.description),
      icon: Network,
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2070",
      items: [
        t(translations.services.cards.networks.items.mesh),
        t(translations.services.cards.networks.items.routers),
        t(translations.services.cards.networks.items.integration),
        t(translations.services.cards.networks.items.infrastructure),
        t(translations.services.cards.networks.items.security),
      ]
    },
    {
      id: 'bms',
      title: t(translations.services.cards.bms.title),
      subtitle: t(translations.services.cards.bms.subtitle),
      description: t(translations.services.cards.bms.description),
      icon: Layers,
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
      items: [
        t(translations.services.cards.bms.items.hvac),
        t(translations.services.cards.bms.items.lighting),
        t(translations.services.cards.bms.items.energy),
        t(translations.services.cards.bms.items.safety),
      ]
    },
    {
      id: 'accounting',
      title: t(translations.services.cards.accounting.title),
      subtitle: t(translations.services.cards.accounting.subtitle),
      description: t(translations.services.cards.accounting.description),
      icon: Calculator,
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2070",
      items: [
        t(translations.services.cards.accounting.items.odoo),
        t(translations.services.cards.accounting.items.alameen),
        t(translations.services.cards.accounting.items.setup),
        t(translations.services.cards.accounting.items.customization),
        t(translations.services.cards.accounting.items.training),
        t(translations.services.cards.accounting.items.integration),
        t(translations.services.cards.accounting.items.hardware),
      ]
    }
  ];

  return (
    <div className="bg-cream-dark min-h-screen">

      {/* Page Header */}
      <section className="relative bg-gradient-to-br from-dark via-dark to-dark/95 pt-32 pb-24 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Decorative Pattern */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-6 px-6 py-2 rounded-full border-2 border-gold/40 bg-gold/10 backdrop-blur-sm"
          >
            <span className="text-gold font-bold tracking-widest text-sm uppercase">{t(translations.services.hero.label)}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl font-black text-white mb-4 leading-tight"
          >
            {t(translations.services.hero.title)} <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light">{t(translations.services.hero.titleHighlight)}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto"
          >
            {t(translations.services.hero.subtitle)}
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 pb-24 relative z-20">

        <div className="space-y-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              id={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="group scroll-mt-24"
            >
              <div className="relative bg-white rounded-3xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-500 border border-gray-100 hover:border-gold/40">
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gold/10 to-transparent rounded-bl-full"></div>

                {/* Large Icon Section - Replaces Image */}
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-cream/50 via-white to-gold/5 flex items-center justify-center">
                  {/* Decorative background circles */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gold/10 rounded-full blur-2xl"></div>
                    <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-gold/5 rounded-full blur-xl"></div>
                    <div className="absolute bottom-1/4 left-1/4 w-32 h-32 bg-gold/5 rounded-full blur-xl"></div>
                  </div>

                  {/* Main Icon */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="relative z-10"
                  >
                    <div className="w-32 h-32 bg-gradient-to-br from-gold to-gold-dark rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-gold/30 group-hover:scale-110 transition-transform duration-500">
                      <service.icon size={80} strokeWidth={1.5} />
                    </div>
                  </motion.div>

                  {/* Floating mini icons */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-8 right-12 w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center text-gold"
                  >
                    <service.icon size={24} strokeWidth={2} />
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-8 left-12 w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center text-gold"
                  >
                    <service.icon size={24} strokeWidth={2} />
                  </motion.div>
                </div>

                {/* Content Section - Below Image */}
                <div className="p-8">
                  <h2 className="text-3xl font-black text-dark mb-2">{service.title}</h2>
                  <h3 className="text-sm text-gold font-sans font-bold mb-4 uppercase tracking-widest">{service.subtitle}</h3>
                  <p className="text-gray-600 mb-6 text-base leading-relaxed">
                    {service.description}
                  </p>

                  {/* Items List - Two Columns */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                    {service.items.map((item, i) => {
                      const [title] = item.includes(':') ? item.split(':') : [item, ''];
                      return (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <div className="w-5 h-5 rounded bg-gold/20 flex items-center justify-center flex-shrink-0">
                            <CheckCircle size={12} className="text-gold" strokeWidth={3} />
                          </div>
                          <span className="text-gray-700 font-medium">{title}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* CTA Button */}
                  <button className="bg-gradient-to-r from-gold to-gold-dark text-white font-bold px-8 py-3 rounded-xl hover:shadow-lg hover:shadow-gold/30 transition-all flex items-center gap-2 group/btn">
                    <span>{t(translations.services.requestQuote)}</span>
                    <ArrowLeft size={16} className="group-hover/btn:-translate-x-2 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="mt-16 rounded-3xl bg-gradient-to-r from-gold to-gold-dark p-10 text-center text-white shadow-xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10">
            <h3 className="text-3xl font-black mb-4">{t(translations.services.cta.title)}</h3>
            <p className="text-white/90 mb-6 text-base max-w-2xl mx-auto">{t(translations.services.cta.description)}</p>
            <a href="#/contact" className="bg-white text-gold-dark px-8 py-3 rounded-xl font-bold hover:bg-dark hover:text-white transition-all shadow-lg inline-flex items-center gap-2">
              {t(translations.services.cta.button)}
            </a>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Services;