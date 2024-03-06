// Importing i18next library and related modules
import i18next from "i18next";
import {initReactI18next} from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Importing translation files for English and Swedish
import lang_sv from "./translations/sv/global.json";
import lang_en from "./translations/en/global.json";

i18next.
    use(LanguageDetector).
    use(initReactI18next).
    init({
    fallbackLng: 'en', // Default language if no language is detected or supported
    supportedLngs: ['en', 'sv'], // List of supported languages
    interpolation: {escapeValue: false}, // Allowing HTML escape in translations
    resources: {
        en: {
            translation: lang_en // English translations
        },
        sv: {
            translation: lang_sv // Swedish translations
        }
    }
});

// Exporting the configured i18next instance for use in the application
export default i18next;