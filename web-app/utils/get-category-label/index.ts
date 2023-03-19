import { CATEGORY_LABEL, type Category } from '@/models/category';

const getCategoryLabel = (category: Category) => CATEGORY_LABEL[category];

export default getCategoryLabel;
