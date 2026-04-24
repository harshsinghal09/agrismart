import { createContext, useContext, useState } from 'react';

const translations = {
  en: {
    nav_home: 'Home',
    nav_crop: 'Crop Tool',
    nav_fertilizer: 'Fertilizer',
    nav_disease: 'Disease',
    nav_about: 'About',
    nav_contact: 'Contact',
    nav_cta: 'Start Analysis',
    hero_title: 'AI-Powered Farming for Better Yield',
    hero_subtitle: 'Get crop suggestions, fertilizer plans, and disease detection instantly',
    hero_cta: 'Start Analysis',
    hero_learn: 'Learn More',
    stat_farmers: 'Farmers Assisted',
    stat_accuracy: 'Accuracy Rate',
    stat_regions: 'Regions Covered',
    stat_rating: 'User Rating',
    crop_title: 'Crop Recommendation',
    crop_subtitle: 'Get AI-powered crop suggestions based on your soil and location',
    crop_soil: 'Soil Type',
    crop_location: 'State / Region',
    crop_season: 'Season',
    crop_cta: 'Get Crop Recommendations',
    fert_title: 'Fertilizer Advisor',
    fert_subtitle: 'Smart NPK plans tailored to your crop and farm size',
    fert_crop: 'Crop Type',
    fert_soil: 'Soil Type',
    fert_size: 'Farm Size (acres)',
    fert_cta: 'Get Fertilizer Plan',
    disease_title: 'Disease Detection',
    disease_subtitle: 'Upload a plant photo for instant AI diagnosis',
    disease_drop: 'Drop your plant image here',
    disease_browse: 'or click to browse',
    disease_cta: 'Detect Disease',
    about_title: 'AI for Every Farmer',
    about_subtitle: 'Empowering India\'s 140 million farmers with precision agriculture',
    loading: 'Analyzing with AI...',
    error_generic: 'Something went wrong. Please try again.',
    confidence: 'Confidence',
    treatment: 'Treatment',
    prevention: 'Prevention',
    symptoms: 'Symptoms',
    spread_risk: 'Spread Risk',
  },
  hi: {
    nav_home: 'होम',
    nav_crop: 'फसल टूल',
    nav_fertilizer: 'खाद',
    nav_disease: 'रोग',
    nav_about: 'हमारे बारे में',
    nav_contact: 'संपर्क',
    nav_cta: 'विश्लेषण शुरू करें',
    hero_title: 'बेहतर उपज के लिए AI-संचालित खेती',
    hero_subtitle: 'तुरंत फसल सुझाव, खाद योजना और रोग पहचान प्राप्त करें',
    hero_cta: 'विश्लेषण शुरू करें',
    hero_learn: 'और जानें',
    stat_farmers: 'सहायता प्राप्त किसान',
    stat_accuracy: 'सटीकता दर',
    stat_regions: 'क्षेत्र शामिल',
    stat_rating: 'उपयोगकर्ता रेटिंग',
    crop_title: 'फसल अनुशंसा',
    crop_subtitle: 'अपनी मिट्टी और स्थान के आधार पर AI फसल सुझाव प्राप्त करें',
    crop_soil: 'मिट्टी का प्रकार',
    crop_location: 'राज्य / क्षेत्र',
    crop_season: 'मौसम',
    crop_cta: 'फसल अनुशंसाएं प्राप्त करें',
    fert_title: 'खाद सलाहकार',
    fert_subtitle: 'आपकी फसल और खेत के आकार के अनुसार स्मार्ट NPK योजना',
    fert_crop: 'फसल का प्रकार',
    fert_soil: 'मिट्टी का प्रकार',
    fert_size: 'खेत का आकार (एकड़)',
    fert_cta: 'खाद योजना प्राप्त करें',
    disease_title: 'रोग पहचान',
    disease_subtitle: 'तत्काल AI निदान के लिए पौधे की फोटो अपलोड करें',
    disease_drop: 'यहां अपनी पौधे की छवि छोड़ें',
    disease_browse: 'या ब्राउज़ करने के लिए क्लिक करें',
    disease_cta: 'रोग पहचानें',
    about_title: 'हर किसान के लिए AI',
    about_subtitle: 'भारत के 14 करोड़ किसानों को परिशुद्ध कृषि से सशक्त बनाना',
    loading: 'AI से विश्लेषण हो रहा है...',
    error_generic: 'कुछ गलत हुआ। कृपया पुनः प्रयास करें।',
    confidence: 'विश्वास',
    treatment: 'उपचार',
    prevention: 'रोकथाम',
    symptoms: 'लक्षण',
    spread_risk: 'फैलाव जोखिम',
  },
};

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('en');
  const t = (key) => translations[lang][key] || key;
  const toggleLang = () => setLang((l) => (l === 'en' ? 'hi' : 'en'));
  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => useContext(LanguageContext);
