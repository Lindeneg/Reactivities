import type { BaseModel } from './base-model';

export interface BaseActivity {
    title: string;
    date: string;
    description: string;
    category: string;
    city: string;
    venue: string;
}

export type Activity = BaseModel & BaseActivity;
