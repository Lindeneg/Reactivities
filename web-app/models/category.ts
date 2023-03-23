export const CATEGORY = {
    DRINKS: 0,
    CULTURE: 1,
    MUSIC: 2,
    TRAVEL: 3,
    FILM: 4,
    FOOD: 5,
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
