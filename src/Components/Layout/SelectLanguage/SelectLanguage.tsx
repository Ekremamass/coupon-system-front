import "./SelectLanguage.css";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

interface LanguageItem {
  value: string;
  text: string;
}

const languages: LanguageItem[] = [
  { value: "en", text: "English" },
  { value: "he", text: "עברית" },
  { value: "ar", text: "العربية" },
];

function SelectLanguage(): JSX.Element {
  const { i18n } = useTranslation();

  const [lang, setLang] = useState<string>(i18n.language); // Initialize with the current language

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const newLang = e.target.value;
    setLang(newLang);
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="SelectLanguage">
      <select value={lang} onChange={handleChange}>
        {languages.map((item) => (
          <option key={item.value} value={item.value}>
            {item.text}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectLanguage;
