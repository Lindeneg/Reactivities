export interface User {
    displayName: string;
    username: string;
    image: string | null;
}

export type UserWithToken = User & { token: string };
