// import i18n from 'i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';
// import { initReactI18next } from 'react-i18next';
// import Backend from 'i18next-http-backend'

// i18n.use(LanguageDetector).use(initReactI18next).use(Backend).init({
//     debug: true,
//     lng: 'en', // default language
//     fallbackLng: 'en',
//     returnObjects: true,
//     interpolation: { escapeValue: false },
// });

// export default i18n;


// i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translation: {
                greeting: "Welcome",
                category: "Category",
                instructor: "Instructor",
                help: "Help",
                // Other texts used in your component
            },
        },
        fr: {
            translation: {
                greeting: "Bienvenue",
                category: "Catégorie",
                instructor: "Instructeur",
                help: "Aide",
                // Translated texts
            },
        },
        hi: {
            translation: {
                greeting: "स्वागत है",
                category: "श्रेणी",
                instructor: "प्रशिक्षक",
                help: "सहायता",
                // Translated texts
            },
        },
    },
    lng: "en", // default language
    fallbackLng: "en",
    interpolation: { escapeValue: false },
});

export default i18n;
