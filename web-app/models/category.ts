export const CATEGORY = {
    CULTURE: 0,
    DRINKS: 1,
    FILM: 2,
    FOOD: 3,
    MUSIC: 4,
    TRAVEL: 5,
} as const;

export const CATEGORY_LABEL = {
    [CATEGORY.CULTURE]: 'Culture',
    [CATEGORY.DRINKS]: 'Drinks',
    [CATEGORY.FILM]: 'Film',
    [CATEGORY.FOOD]: 'Food',
    [CATEGORY.MUSIC]: 'Music',
    [CATEGORY.TRAVEL]: 'Travel',
} as const;

export type Category = (typeof CATEGORY)[keyof typeof CATEGORY];
