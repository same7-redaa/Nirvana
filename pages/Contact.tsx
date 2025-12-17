import React from 'react';
import { Phone, Mail, MapPin, Handshake, Map, PencilRuler, Wrench, Send } from 'lucide-react';
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
        <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row">

          {/* Info Side */}
          <div className="lg:w-2/5 bg-dark text-white p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>

            <h3 className="text-3xl font-bold mb-8 relative z-10">{t(translations.contact.info.title)}</h3>
            <p className="text-gray-400 mb-12 relative z-10">{t(translations.contact.info.description)}</p>

            <ul className="space-y-8 relative z-10">
              <li className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-gold border border-white/10"><MapPin size={24} /></div>
                <div>
                  <span className="block font-bold text-lg mb-1">{t(translations.contact.info.address)}</span>
                  <span className="text-gray-400">{t(translations.contact.info.addressValue)}</span>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-gold border border-white/10"><Phone size={24} /></div>
                <div>
                  <span className="block font-bold text-lg mb-1">{t(translations.contact.info.phone)}</span>
                  <span className="text-gray-400 dir-ltr block hover:text-gold transition-colors" dir="ltr">+966 533 46 1133</span>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-gold border border-white/10"><Mail size={24} /></div>
                <div>
                  <span className="block font-bold text-lg mb-1">{t(translations.contact.info.email)}</span>
                  <span className="text-gray-400 font-sans hover:text-gold transition-colors">info@nirvanaiot.com</span>
                </div>
              </li>
            </ul>

            {/* Socials or extra decor */}
            <div className="mt-20 relative z-10">
              <div className="h-48 w-full rounded-2xl overflow-hidden grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
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

          {/* Form Side */}
          <div className="lg:w-3/5 p-12 lg:p-16 bg-white">
            <h3 className="text-3xl font-bold text-dark mb-2">{t(translations.contact.form.title)}</h3>
            <p className="text-gray-500 mb-10">{t(translations.contact.form.description)}</p>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-dark">{t(translations.contact.form.fullName)}</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all" placeholder={t(translations.contact.form.namePlaceholder)} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-dark">{t(translations.contact.form.mobile)}</label>
                  <input type="tel" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all" placeholder="05xxxxxxxx" dir="ltr" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-dark">{t(translations.contact.form.emailLabel)}</label>
                <input type="email" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all" placeholder="example@email.com" dir="ltr" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-dark">{t(translations.contact.form.message)}</label>
                <textarea rows={4} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all" placeholder={t(translations.contact.form.messagePlaceholder)}></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                className="w-full bg-gold text-white font-bold py-4 rounded-xl hover:bg-gold-dark transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <Send size={20} />
                <span>{t(translations.contact.form.submit)}</span>
              </motion.button>
            </form>
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