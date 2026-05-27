'use client';

import { useState } from 'react';
import '../styles/cardSelector.css';

type Language = 'en' | 'zh';

interface Props {
  language: Language;
  numCards: number;
  onDraw: () => void;
  onBack: () => void;
}

export default function CardSelector({ language, numCards, onDraw, onBack }: Props) {
  const [isDrawing, setIsDrawing] = useState(false);

  const handleDraw = async () => {
    setIsDrawing(true);
    onDraw();
  };

  return (
    <div className="card-selector-container">
      <div className="deck-visual">
        <div className="deck">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="card-back" style={{ transform: `rotateZ(${-5 + i * 2.5}deg)` }}>✦</div>
          ))}
        </div>
      </div>
      <h2>{language === 'en' ? 'Draw Your Cards' : '抽取您的牌'}</h2>
      <p className="instruction">{language === 'en' ? 'Focus on your question and draw.' : '专注于您的问题，抽牌。'}</p>
      <div className="card-selector-actions">
        <button onClick={onBack} disabled={isDrawing}>{language === 'en' ? 'Back' : '返回'}</button>
        <button onClick={handleDraw} disabled={isDrawing}>{isDrawing ? '...' : language === 'en' ? 'Draw' : '抽牌'}</button>
      </div>
    </div>
  );
}
