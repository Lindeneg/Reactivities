import { PLACEHOLDER_USER_IMAGE } from '@/constants';
import type { User } from '@/models';

const getUserImageOrDefault = (user: User | string | null): string => {
    if (typeof user === 'string') return user;
    if (user !== null && typeof user === 'object' && user.image !== null) return user.image;
    return PLACEHOLDER_USER_IMAGE;
};

export default getUserImageOrDefault;
