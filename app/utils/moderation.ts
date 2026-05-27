const bannedWords = [
  'harm', 'kill', 'suicide', '伤害', '杀害', '自杀',
];

export async function checkContentModeration(
  text: string,
  language: 'en' | 'zh'
): Promise<{ safe: boolean }> {
  const lowerText = text.toLowerCase();
  for (const word of bannedWords) {
    if (lowerText.includes(word)) return { safe: false };
  }
  return { safe: true };
}
