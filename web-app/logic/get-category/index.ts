import { CATEGORY, CATEGORY_LABEL, type Category } from '@/models';

const label = (category: Category): string => {
    const result = CATEGORY_LABEL[category];

    if (!result) {
        return 'Unknown';
    }

    return result;
};

const selection = (): { value: number | string; label: string }[] => {
    return Object.values(CATEGORY).map((val) => ({
        label: label(val),
        value: val,
    }));
};

const getCategory = {
    label,
    selection,
};

export default getCategory;
