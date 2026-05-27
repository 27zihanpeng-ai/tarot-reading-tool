import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { question, category, cards, language } = body;

    if (!question || !category || !cards || !language) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    // Mock interpretation (replace with real API when GROQ_API_KEY is available)
    const cardNames = cards.map((c: any) => language === 'en' ? c.name : c.zh).join(', ');
    
    const interpretation = language === 'zh'
      ? `🔮 占卜解读\n\n您抽到的卡牌：${cardNames}\n\n根据这些卡牌的组合，我看到了您当前状况的一个清晰图景。这表明在${category}方面，您正在经历一个重要的转折点。相信您的直觉，保持开放的心态。好的事情正在路上。`
      : `🔮 Your Reading\n\nCards: ${cardNames}\n\nBased on this combination, I see a clear picture of your situation. In the area of ${category}, you are at a pivotal point. Trust your intuition and remain open-minded. Great things are coming your way.`;

    return NextResponse.json({ interpretation });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
