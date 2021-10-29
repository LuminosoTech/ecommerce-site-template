import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { I18nResource } from ".";

const detector = new LanguageDetector(undefined, {
    order: ["navigator", "localStorage"],
    caches: ["localStorage"],
});
i18n.use(detector)
    .use(initReactI18next)
    .init({
        debug: false,
        defaultNS: "translations",
        fallbackLng: "en",

        interpolation: {
            escapeValue: false,
        },
        ns: ["translations"],
        react: {
            wait: true,
        },
        resources: I18nResource,
    });

export default i18n;
