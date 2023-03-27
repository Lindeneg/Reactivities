interface Photo {
    id: string;
    url: string;
    isMain: boolean;
}

export interface User {
    displayName: string;
    username: string;
    bio: string | null;
    image: string | null;
    photos: Photo[];
}

export type UserWithToken = User & { token: string };
