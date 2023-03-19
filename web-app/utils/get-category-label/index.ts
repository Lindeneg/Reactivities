import { CATEGORY_LABEL, type Category } from '@/models/category';

const getCategoryLabel = (category: Category): string => {
    const result = CATEGORY_LABEL[category];

    if (!result) {
        return 'unknown';
    }

    return result;
};

export default getCategoryLabel;
