'use client';

import '../styles/interpretation.css';

type Language = 'en' | 'zh';

interface Card {
  name: string;
  zh: string;
  number: number;
  meaning: string;
  zh_meaning: string;
  image: string;
  detailedMeaningEn: {
    upright: string;
    reversed: string;
  };
  detailedMeaningZh: {
    upright: string;
    reversed: string;
  };
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
              <div className="card-image-wrapper">
                <img 
                  src={card.image} 
                  alt={language === 'en' ? card.name : card.zh}
                  className="card-image"
                  onError={(e) => {
                    // Fallback if image doesn't load
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <div className="card-placeholder">
                  <div className="card-number">{card.number}</div>
                  <div className="card-name">{language === 'en' ? card.name : card.zh}</div>
                </div>
              </div>
              <div className="card-info">
                <h4>{language === 'en' ? card.name : card.zh}</h4>
                <p className="card-meaning">
                  {language === 'en' ? card.meaning : card.zh_meaning}
                </p>
                <div className="detailed-meaning">
                  <div className="meaning-section">
                    <strong>{language === 'en' ? 'Upright:' : '正位:'}</strong>
                    <p>{language === 'en' ? card.detailedMeaningEn.upright : card.detailedMeaningZh.upright}</p>
                  </div>
                  <div className="meaning-section">
                    <strong>{language === 'en' ? 'Reversed:' : '逆位:'}</strong>
                    <p>{language === 'en' ? card.detailedMeaningEn.reversed : card.detailedMeaningZh.reversed}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="interpretation-section">
        <h2>{language === 'en' ? 'Your Reading' : '您的占卜结果'}</h2>
        {loading ? (
          <div className="loading">
            <p>{language === 'en' ? 'Generating your reading...' : '正在生成您的占卜结果...'}</p>
            <div className="loader"></div>
          </div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div className="interpretation-text">{interpretation}</div>
        )}
        <button className="reset-btn" onClick={onReset}>
          {language === 'en' ? 'New Reading' : '新占卜'}
        </button>
      </div>
    </div>
  );
}
