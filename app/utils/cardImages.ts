/**
 * Card image helper utilities
 * 
 * To use card images:
 * 1. Place your tarot card images in the public/cards/ folder
 * 2. Name them as: NN-card-name.png (e.g., 00-fool.png)
 * 3. Images should be high quality with 2:3 aspect ratio
 * 
 * For free tarot card images, consider:
 * - Using open-source tarot deck images
 * - Creating custom cyberpunk-style illustrations
 * - Using AI-generated images that match your aesthetic
 */

export const getCardImageUrl = (cardNumber: number): string => {
  // Ensures proper zero-padding (e.g., 0 becomes 00, 1 becomes 01)
  const paddedNumber = String(cardNumber).padStart(2, '0');
  return `/cards/${paddedNumber}-card.png`;
};

export const isCardImageAvailable = (cardNumber: number): boolean => {
  // In a real implementation, you might check if the image exists
  // For now, this acts as a placeholder for future enhancements
  return true;
};

export const getCardPlaceholder = (cardName: string, cardNumber: number): string => {
  return `Card ${cardNumber}: ${cardName}`;
};
