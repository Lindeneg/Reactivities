export const CATEGORY = {
    CULTURE: 'Culture',
    DRINKS: 'Drinks',
    FILM: 'Film',
    FOOD: 'Food',
    MUSIC: 'Music',
    TRAVEL: 'Travel',
} as const;

export type Category = (typeof CATEGORY)[keyof typeof CATEGORY];
