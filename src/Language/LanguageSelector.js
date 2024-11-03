import React from 'react';
import { useTranslation } from 'react-i18next';

const languages = [
    { code: "en", lang: "English" },
    { code: "fr", lang: "French" },
    { code: "hi", lang: "Hindi" }
];

const LanguageSelector = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (code) => {
        i18n.changeLanguage(code);
    };

    return (
        <div className="btn-container flex space-x-4">
            {languages.map((lng) => (
                <button

                    key={lng.code}
                    onClick={() => changeLanguage(lng.code)}
                    className={lng.code === i18n.language ?
                        "px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300" : ""}
                >
                    {lng.lang}
                </button>
            ))}
        </div>
    );
};

export default LanguageSelector;
