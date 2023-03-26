export interface User {
    displayName: string;
    username: string;
    bio: string | null;
    image: string | null;
}

export type UserWithToken = User & { token: string };
