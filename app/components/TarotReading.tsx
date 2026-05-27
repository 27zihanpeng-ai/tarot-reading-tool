'use client';

import { useState } from 'react';
import { tarotCards } from '../data/tarotCards';
import { translations } from '../data/translations';
import { checkContentModeration } from '../utils/moderation';
import QuestionForm from './QuestionForm';
import CardSelector from './CardSelector';
import Interpretation from './Interpretation';
import '../styles/tarotReading.css';

type Language = 'en' | 'zh';
type ReadingStage = 'intro' | 'question' | 'draw' | 'interpretation';

interface ReadingData {
  question: string;
  category: string;
  cards: (typeof tarotCards)[number][];
  interpretation: string;
  loading: boolean;
  error?: string;
}

const spreads = {
  single: { name: 'Single Card', zh: '单卡占卜', cards: 1 },
  threeCard: { name: 'Three Card', zh: '三卡占卜', cards: 3 },
  celticCross: { name: 'Celtic Cross', zh: '凯尔特十字', cards: 10 },
};

export default function TarotReading({ language }: { language: Language }) {
  const [stage, setStage] = useState<ReadingStage>('intro');
  const [spreadType, setSpreadType] = useState<keyof typeof spreads>('single');
  const [reading, setReading] = useState<ReadingData>({
    question: '',
    category: 'general',
    cards: [],
    interpretation: '',
    loading: false,
  });
  const [showWarning, setShowWarning] = useState(true);

  const t = translations[language];

  const handleStartReading = async (question: string, category: string) => {
    const moderationResult = await checkContentModeration(question, language);
    if (!moderationResult.safe) {
      setReading({
        ...reading,
        error: language === 'en'
          ? 'Your question contains inappropriate content. Please rephrase.'
          : '您的问题包含不当内容，请重新表述。',
      });
      setStage('question');
      return;
    }

    setReading({ ...reading, question, category });
    setStage('draw');
  };

  const handleDrawCards = async () => {
    const numCards = spreads[spreadType].cards;
    const selectedCards: (typeof tarotCards)[number][] = [];
    const cardIndices = new Set<number>();

    while (cardIndices.size < numCards) {
      cardIndices.add(Math.floor(Math.random() * tarotCards.length));
    }

    cardIndices.forEach(index => {
      selectedCards.push(tarotCards[index]);
    });

    setReading({ ...reading, cards: selectedCards, loading: true });
    await new Promise(resolve => setTimeout(resolve, 2000));

    try {
      const response = await fetch('/api/interpret', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: reading.question,
          category: reading.category,
          cards: selectedCards,
          language,
        }),
      });

      if (!response.ok) throw new Error('Failed');

      const data = await response.json();
      setReading({
        ...reading,
        cards: selectedCards,
        interpretation: data.interpretation,
        loading: false,
      });
      setStage('interpretation');
    } catch (err) {
      setReading({
        ...reading,
        error: language === 'en' ? 'Failed to get interpretation.' : '获取解读失败。',
        loading: false,
      });
      setStage('interpretation');
    }
  };

  const handleReset = () => {
    setStage('intro');
    setReading({ question: '', category: 'general', cards: [], interpretation: '', loading: false });
  };

  return (
    <div className="tarot-reading">
      {showWarning && (
        <div className="warning-container">
          <div className="warning-banner">
            <h3>{language === 'en' ? '⚠️ Disclaimer' : '⚠️ 免责声明'}</h3>
            <p>
              {language === 'en'
                ? 'This service is for entertainment only. Please maintain a rational perspective.'
                : '本服务仅供娱乐，请理性看待所有占卜结果。'}
            </p>
            <button onClick={() => setShowWarning(false)}>
              {language === 'en' ? 'I Understand' : '我明白了'}
            </button>
          </div>
        </div>
      )}

      {stage === 'intro' && (
        <div className="stage intro">
          <p className="intro-text">{t.intro}</p>
          <div className="spread-selector">
            <h3>{language === 'en' ? 'Select Spread' : '选择牌阵'}</h3>
            {Object.entries(spreads).map(([key, spread]) => (
              <button
                key={key}
                className={`spread-btn ${spreadType === key ? 'active' : ''}`}
                onClick={() => setSpreadType(key as keyof typeof spreads)}
              >
                {language === 'en' ? spread.name : spread.zh}
                <span>({spread.cards} {language === 'en' ? 'cards' : '张'})</span>
              </button>
            ))}
          </div>
          <button className="start-btn" onClick={() => setStage('question')}>
            {language === 'en' ? 'Begin' : '开始'}
          </button>
        </div>
      )}

      {stage === 'question' && (
        <QuestionForm language={language} onSubmit={handleStartReading} onBack={() => setStage('intro')} error={reading.error} />
      )}

      {stage === 'draw' && (
        <CardSelector language={language} numCards={spreads[spreadType].cards} onDraw={handleDrawCards} onBack={() => setStage('question')} />
      )}

      {stage === 'interpretation' && (
        <Interpretation language={language} cards={reading.cards} interpretation={reading.interpretation} error={reading.error} loading={reading.loading} onReset={handleReset} />
      )}
    </div>
  );
}
