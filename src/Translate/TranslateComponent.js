import React, { useState } from 'react';
import { translateText } from './TranslateText';

function TranslateComponent() {
    const [translatedText, setTranslatedText] = useState('');
    const [language, setLanguage] = useState('hi'); // Default to French

    const handleTranslate = async () => {
        const text = "Hello, welcome to our app!";
        const translation = await translateText(text, language);
        setTranslatedText(translation);
    };

    return (
        <div>
            <p>Original: Hello, welcome to our app!</p>
            <p>Translated: {translatedText}</p>
            <select onChange={(e) => setLanguage(e.target.value)}>
                <option value="fr">French</option>
                <option value="hi">Hindi</option>
                <option value="de">German</option>
                <option value="it">Italian</option>
            </select>
            <button onClick={handleTranslate}>Translate</button>
        </div>
    );
}

export default TranslateComponent;
