'use client';

import '../styles/interpretation.css';

type Language = 'en' | 'zh';

interface Card {
  name: string;
  number: number;
  meaning: string;
}

interface Props {
  language: Language;
  cards: Card[];
  interpretation: string;
  error?: string;
  loading: boolean;
  onReset: () => void;
}

export default function Interpretation({ language, cards, interpretation, error, loading, onReset }: Props) {
  return (
    <div className="interpretation-container">
      <div className="drawn-cards">
        <h2>{language === 'en' ? 'Your Cards' : '您的牌'}</h2>
        <div className="cards-grid">
          {cards.map((card, idx) => (
            <div key={idx} className="card-display">
              <div className="card">{card.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="interpretation-section">
        <h2>{language === 'en' ? 'Your Reading' : '您的占卜结果'}</h2>
        {loading ? (
          <p>{language === 'en' ? 'Generating...' : '正在生成...'}</p>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div className="interpretation-text">{interpretation}</div>
        )}
        <button onClick={onReset}>{language === 'en' ? 'New Reading' : '新占卜'}</button>
      </div>
    </div>
  );
}
