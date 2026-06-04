import { NextRequest, NextResponse } from 'next/server';

const interpretationTemplates = {
  en: {
    love: [
      'In matters of the heart, {cards} suggest {insight}. The energy surrounding your romantic situation is {energy}. You should {advice}.',
      'The cards reveal that {cards} point toward {meaning}. In your love life, {cards_meaning}. Consider {guidance}.',
      'Looking at {cards}, the universe is telling you that {message}. Your next step in love should be {action}.',
    ],
    career: [
      'Professionally, {cards} indicates {insight}. Your work path is {energy}. Focus on {advice}.',
      'In your career, {cards} suggests {meaning}. This points to {cards_meaning}. Your next move should be {guidance}.',
      '{cards} reveals that your professional future is {message}. You should {action} in your career decisions.',
    ],
    health: [
      'Regarding your wellbeing, {cards} shows {insight}. Your health energy is {energy}. Consider {advice}.',
      'The cards indicate that {cards} relates to {meaning}. Your wellness journey involves {cards_meaning}. Remember to {guidance}.',
      'In terms of health, {cards} communicates {message}. Your path forward requires {action}.',
    ],
    finance: [
      'Financially, {cards} speaks to {insight}. Your monetary situation is {energy}. Act by {advice}.',
      'Your finances are influenced by {cards}, which means {meaning}. This suggests {cards_meaning}. Be strategic and {guidance}.',
      'The financial cards {cards} tell you that {message}. Your best approach is to {action}.',
    ],
    general: [
      'The cards {cards} have a message for you: {insight}. The overall energy is {energy}. You should {advice}.',
      'Drawing {cards}, the reading shows {meaning}. This represents {cards_meaning}. Moving forward, {guidance}.',
      'In this moment, {cards} indicate {message}. Your path involves {action}.',
    ]
  },
  zh: {
    love: [
      '在爱情事务中，{cards}暗示{insight}。围绕你的浪漫情况的能量是{energy}。你应该{advice}。',
      '卡牌揭示{cards}指向{meaning}。在你的爱情生活中，{cards_meaning}。考虑{guidance}。',
      '看着{cards}，宇宙在告诉你{message}。���在爱情中的下一步应该是{action}。',
    ],
    career: [
      '在专业方面，{cards}表示{insight}。你的职业道路是{energy}。专注于{advice}。',
      '在你的职业生涯中，{cards}暗示{meaning}。这指向{cards_meaning}。你的下一步应该是{guidance}。',
      '{cards}显示你的职业前景是{message}。你应该在职业决定中{action}。',
    ],
    health: [
      '关于你的健康，{cards}显示{insight}。你的健康能量是{energy}。考虑{advice}。',
      '卡牌表明{cards}与{meaning}相关。你的健康之旅涉及{cards_meaning}。记住{guidance}。',
      '在健康方面，{cards}传达{message}。你前进的道路需要{action}。',
    ],
    finance: [
      '从财务上讲，{cards}说明{insight}。你的财务状况是{energy}。通过{advice}行动。',
      '你的财务受到{cards}的影响，这意味着{meaning}。这表明{cards_meaning}。要战略性且{guidance}。',
      '财务卡牌{cards}告诉你{message}。你最好的方法是{action}。',
    ],
    general: [
      '卡牌{cards}为你有一条消息：{insight}。总体能量是{energy}。你应该{advice}。',
      '抽取{cards}，该阅读显示{meaning}。这代表{cards_meaning}。往前进，{guidance}。',
      '在此刻，{cards}表示{message}。你的道路涉及{action}。',
    ]
  }
};

const insights = {
  en: [
    'a powerful message about transformation',
    'wisdom that has been hidden from view',
    'an important sign about your true path',
    'a reflection of your inner state',
    'a guide toward what you truly desire',
    'a warning to pay attention to details',
    'a blessing for the journey ahead',
  ],
  zh: [
    '关于转变的强大消息',
    '一直隐藏的智慧',
    '关于你真实道路的重要标志',
    '你内心状态的反映',
    '引导你真正渴望的事物的指南',
    '注意细节的警告',
    '对前方旅程的祝福',
  ]
};

const energies = {
  en: [
    'one of growth and possibility',
    'challenging but ultimately transformative',
    'stable with moments of excitement',
    'dynamic and full of potential',
    'peaceful yet encouraging change',
    'intense and demanding focus',
    'harmonious and aligned with your efforts',
  ],
  zh: [
    '增长和可能性之一',
    '具有挑战性但最终具有变革性',
    '稳定但充满兴奋时刻',
    '动态且充满潜力',
    '和平但鼓励变化',
    '强烈且需要集中注意力',
    '和谐并与你的努力相一致',
  ]
};

const advices = {
  en: [
    'trust your instincts and take bold action',
    'slow down and reflect on what truly matters',
    'reach out to others for support and wisdom',
    'focus on what you can control',
    'be patient and allow things to unfold naturally',
    'embrace change as an opportunity for growth',
    'strengthen your inner foundation before moving forward',
  ],
  zh: [
    '相信你的直觉并采取大胆行动',
    '放慢速度并反思真正重要的事情',
    '向他人寻求支持和智慧',
    '专注于你能控制的事情',
    '要有耐心并让事情自然展开',
    '将变化视为增长的机会',
    '在前进之前加强你的内在基础',
  ]
};

function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateDetailedInterpretation(
  cardNames: string,
  category: string,
  language: 'en' | 'zh'
): string {
  const templates = interpretationTemplates[language][category as keyof typeof interpretationTemplates['en']] || interpretationTemplates[language].general;
  const template = getRandomElement(templates);
  
  const insight = getRandomElement(insights[language]);
  const energy = getRandomElement(energies[language]);
  const advice = getRandomElement(advices[language]);
  
  const meanings = {
    en: {
      upright: 'this is a sign of positive transformation',
      multiple: 'together they create a powerful narrative',
      challenge: 'a call to rise above current circumstances',
    },
    zh: {
      upright: '这是积极转变的标志',
      multiple: '一起他们创造了一个强大的叙述',
      challenge: '超越当前环境的呼唤',
    }
  };
  
  const cardsMeaning = getRandomElement([
    language === 'en' ? 'shows internal struggles that lead to strength' : '显示导致力量的内部斗争',
    language === 'en' ? 'represents a journey of self-discovery' : '代表自我发现的旅程',
    language === 'en' ? 'indicates a time of significant change' : '表示重大变化的时期',
  ]);
  
  const message = language === 'en'
    ? 'The universe aligns to support your growth and evolution in this area'
    : '宇宙调整以支持你在这一领域的成长和进化';
  
  const action = language === 'en'
    ? 'listen to your inner wisdom and take inspired action'
    : '聆听你的内心智慧并采取受启发的行动';

  return template
    .replace('{cards}', cardNames)
    .replace('{insight}', insight)
    .replace('{energy}', energy)
    .replace('{advice}', advice)
    .replace('{meaning}', getRandomElement([meanings[language].upright, meanings[language].multiple]))
    .replace('{cards_meaning}', cardsMeaning)
    .replace('{message}', message)
    .replace('{guidance}', getRandomElement(advices[language]))
    .replace('{action}', action);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { question, category, cards, language } = body;

    if (!question || !category || !cards || !language) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    // Get card names in appropriate language
    const cardNames = cards
      .map((c: any) => language === 'en' ? c.name : c.zh)
      .join(', ');
    
    // Generate detailed interpretation
    const interpretation = generateDetailedInterpretation(cardNames, category, language);

    // Add emoji and formatting based on language
    const formatted = language === 'zh'
      ? `🔮 您的塔罗占卜解读\n\n您抽到的卡牌：${cardNames}\n\n${interpretation}\n\n✨ 愿这个读数为您的人生之旅带来光芒。`
      : `🔮 Your Tarot Reading\n\nCards Drawn: ${cardNames}\n\n${interpretation}\n\n✨ May this reading illuminate your path forward.`;

    return NextResponse.json({ interpretation: formatted });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
