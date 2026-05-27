'use client';

import { useState } from 'react';
import '../styles/questionForm.css';

type Language = 'en' | 'zh';

const categories = {
  en: [
    { value: 'general', label: 'General' },
    { value: 'love', label: 'Love' },
    { value: 'career', label: 'Career' },
    { value: 'finance', label: 'Finance' },
    { value: 'health', label: 'Health' },
    { value: 'personal', label: 'Personal' },
  ],
  zh: [
    { value: 'general', label: '综合' },
    { value: 'love', label: '爱情' },
    { value: 'career', label: '事业' },
    { value: 'finance', label: '财务' },
    { value: 'health', label: '健康' },
    { value: 'personal', label: '个人' },
  ],
};

interface Props {
  language: Language;
  onSubmit: (question: string, category: string) => void;
  onBack: () => void;
  error?: string;
}

export default function QuestionForm({ language, onSubmit, onBack, error }: Props) {
  const [question, setQuestion] = useState('');
  const [category, setCategory] = useState('general');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim()) onSubmit(question, category);
  };

  return (
    <div className="question-form-container">
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="question-form">
        <h2>{language === 'en' ? 'Ask Your Question' : '提出您的问题'}</h2>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories[language].map((cat) => (
            <option key={cat.value} value={cat.value}>{cat.label}</option>
          ))}
        </select>
        <textarea value={question} onChange={(e) => setQuestion(e.target.value)} placeholder={language === 'en' ? 'What would you like to know?' : '您想了解什么？'} maxLength={500} />
        <div className="form-actions">
          <button type="button" onClick={onBack}>{language === 'en' ? 'Back' : '返回'}</button>
          <button type="submit" disabled={!question.trim()}>{language === 'en' ? 'Continue' : '继续'}</button>
        </div>
      </form>
    </div>
  );
}
