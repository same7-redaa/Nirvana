import { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const MetaTags = () => {
    const { t, translations } = useLanguage();

    useEffect(() => {
        // Update title
        document.title = t(translations.meta.title);

        // Update description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', t(translations.meta.description));
        }
    }, [t, translations]);

    return null;
};

export default MetaTags;
