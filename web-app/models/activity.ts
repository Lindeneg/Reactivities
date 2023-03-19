import type { BaseModel } from './base-model';
import type { Category } from './category';

export interface BaseActivity {
    title: string;
    date: string;
    description: string;
    category: Category;
    city: string;
    venue: string;
}

export type Activity = BaseModel & BaseActivity;
