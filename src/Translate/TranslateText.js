import axios from 'axios';

const API_URL = 'https://libretranslate.com/translate';

export const translateText = async (text, targetLanguage) => {
    try {
        const response = await axios.post(
            API_URL,
            {
                q: text,
                source: 'en', // original language
                target: targetLanguage,
                format: 'text',
                alternatives: 3, // added alternatives parameter as in the original code
            },
            {
                headers: { "Content-Type": "application/json" }
            }
        );
        return response.data.translations;
    } catch (error) {
        console.error('LibreTranslate API error:', error);
        return text;
    }
};
