import type { BaseModel } from '@/models/base/base-model';
import type { Category } from '@/models/enums/category';

export interface BaseActivity {
    title: string;
    date: Date;
    description: string;
    category: Category;
    city: string;
    venue: string;
    hostUsername: string;
    profiles: string[];
}

export type Activity = BaseModel & BaseActivity;
