'use client';

import { useState, useEffect } from 'react';
import TarotReading from './components/TarotReading';
import './page.css';

type Language = 'en' | 'zh';

const translations = {
  en: {
    title: 'Tarot Reading Tool',
    subtitle: 'Cyberpunk Fortune Telling',
    languageToggle: '中文',
  },
  zh: {
    title: '塔罗占卜工具',
    subtitle: '赛博朋克风格占卜',
    languageToggle: 'English',
  },
};

export default function Home() {
  const [language, setLanguage] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const t = translations[language];

  return (
    <main className="cyberpunk-container">
      <div className="header">
        <div className="language-toggle">
          <button
            onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
            className="toggle-btn"
          >
            {t.languageToggle}
          </button>
        </div>
        <h1 className="glitch-text">{t.title}</h1>
        <p className="subtitle">{t.subtitle}</p>
      </div>

      <div className="content">
        <TarotReading language={language} />
      </div>

      <footer className="cyberpunk-footer">
        <p>© 2024 Tarot Reading Tool | For Entertainment Only</p>
        <p>© 2024 塔罗占卜工具 | 仅供娱乐参考</p>
      </footer>
    </main>
  );
}
