import React from 'react';
import { Phone, Mail, MapPin, Handshake, Map, PencilRuler, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const Contact: React.FC = () => {
  const { t, translations } = useLanguage();
  return (
    <div className="bg-cream min-h-screen">

      {/* Header */}
      <section className="relative bg-gradient-to-br from-dark via-dark to-dark/95 pt-32 pb-24 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gold/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
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
            <span className="text-gold font-bold tracking-widest text-sm uppercase">{t(translations.contact.hero.label)}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl font-black text-white mb-4 leading-tight"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light">{t(translations.contact.hero.title)}</span> {t(translations.contact.hero.titleHighlight)}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto"
          >
            {t(translations.contact.hero.subtitle)}
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20 pb-20">

        {/* Contact Container */}
        <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden">

          {/* Info Section - Full Width */}
          <div className="bg-dark text-white p-12 lg:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>

            <div className="max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold mb-4 relative z-10 text-center">{t(translations.contact.info.title)}</h3>
              <p className="text-gray-400 mb-12 relative z-10 text-center max-w-2xl mx-auto">{t(translations.contact.info.description)}</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-gold/40 transition-all group text-center"
                >
                  <div className="w-16 h-16 bg-gold/20 rounded-2xl flex items-center justify-center text-gold mx-auto mb-6 group-hover:bg-gold group-hover:text-dark transition-all">
                    <MapPin size={32} />
                  </div>
                  <span className="block font-bold text-xl mb-2">{t(translations.contact.info.address)}</span>
                  <span className="text-gray-400">{t(translations.contact.info.addressValue)}</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-gold/40 transition-all group text-center"
                >
                  <div className="w-16 h-16 bg-gold/20 rounded-2xl flex items-center justify-center text-gold mx-auto mb-6 group-hover:bg-gold group-hover:text-dark transition-all">
                    <Phone size={32} />
                  </div>
                  <span className="block font-bold text-xl mb-2">{t(translations.contact.info.phone)}</span>
                  <div className="flex items-center justify-center gap-3">
                    <a href="tel:+966533461133" className="text-gray-400 hover:text-gold transition-colors" dir="ltr">+966 533 46 1133</a>
                    <a href="https://wa.me/966533461133" target="_blank" rel="noopener noreferrer" className="bg-green-500 hover:bg-green-400 text-white p-2 rounded-lg transition-colors" title="واتساب">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-gold/40 transition-all group text-center"
                >
                  <div className="w-16 h-16 bg-gold/20 rounded-2xl flex items-center justify-center text-gold mx-auto mb-6 group-hover:bg-gold group-hover:text-dark transition-all">
                    <Mail size={32} />
                  </div>
                  <span className="block font-bold text-xl mb-2">{t(translations.contact.info.email)}</span>
                  <a href="mailto:info@nirvanaiot.com" className="text-gray-400 font-sans hover:text-gold transition-colors block">info@nirvanaiot.com</a>
                </motion.div>
              </div>

              {/* Map Section */}
              <div className="mt-12 relative z-10">
                <div className="h-64 w-full rounded-2xl overflow-hidden border border-white/10">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.693358057286!2d46.6753!3d24.7136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQyJzQ5LjAiTiA0NsKwNDAnMzEuMSJF!5e0!3m2!1sen!2ssa!4v1625000000000!5m2!1sen!2ssa"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Workflow Section Reimagined */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-dark">{t(translations.contact.workflow.title)}</h2>
            <p className="text-gold font-sans uppercase tracking-widest mt-2">{t(translations.contact.workflow.label)}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Handshake, step: "01", title: t(translations.contact.workflow.step1Title), desc: t(translations.contact.workflow.step1Desc) },
              { icon: Map, step: "02", title: t(translations.contact.workflow.step2Title), desc: t(translations.contact.workflow.step2Desc) },
              { icon: PencilRuler, step: "03", title: t(translations.contact.workflow.step3Title), desc: t(translations.contact.workflow.step3Desc) },
              { icon: Wrench, step: "04", title: t(translations.contact.workflow.step4Title), desc: t(translations.contact.workflow.step4Desc) }
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
      </div>
    </div>
  );
};

export default Contact;