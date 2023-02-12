import type BaseModel from './base-model';

interface Activity extends BaseModel {
    title: string;
    date: string;
    description: string;
    category: string;
    city: string;
    venue: string;
}

export default Activity;
