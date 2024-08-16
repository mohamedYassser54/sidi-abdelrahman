import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import dataAr from "./component/translate/AR.json"
import dataEn from "./component/translate/EN.json"
const resources = {
  en:{
    translation:dataEn,
  },
  ar:{
      translation:dataAr,
  }
};

i18n
  .use(initReactI18next) 
  .init({
    resources,
    lng: "ar", 
    interpolation: {
      escapeValue: false 
    }
  });

  export default i18n;