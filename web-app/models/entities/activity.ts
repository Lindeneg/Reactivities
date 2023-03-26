import type { BaseModel } from '@/models/base/base-model';
import type { Category } from '@/models/enums/category';
import type { User } from './user';

export interface BaseActivity {
    title: string;
    date: Date;
    description: string;
    category: Category;
    city: string;
    venue: string;
    isCancelled: boolean;
    hostUsername: string;
    attendees: Array<User>;
}

export type Activity = BaseModel & BaseActivity;
