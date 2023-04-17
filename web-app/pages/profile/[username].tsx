import { useEffect } from 'react';
import communicator from '@/communicator';
import api from '@/data/server';
import ProfileDashboard from '@/features/dashboards/profile-dashboard';
import Layout from '@/features/layout';
import withMustBeAuthenticated from '@/middleware/with-must-be-authenticated';
import type { User } from '@/models';

export interface ProfilePageProps {
    loggedInUser: User | null;
    user: User | null;
    isOwnProfile: boolean;
    error: string | null;
}

const ProfilePage = ({ loggedInUser, isOwnProfile, user, error }: ProfilePageProps) => {
    useEffect(() => {
        error && communicator.publish('enqueue-snackbar', { msg: error, variant: 'error', autoHideDuration: 10000 });
    }, [error]);

    if (error || !user) {
        return (
            <Layout user={null}>
                <p>An error occurred</p>
            </Layout>
        );
    }

    return (
        <Layout user={loggedInUser}>
            <ProfileDashboard user={user} isOwnProfile={isOwnProfile} />
        </Layout>
    );
};

export const getServerSideProps = withMustBeAuthenticated<ProfilePageProps>(async ({ token, ...user }, cxt) => {
    const { response, error } = await api.profile.getProfile(String(cxt.query.username), token);

    if (error || !response) {
        return {
            props: {
                user: null,
                loggedInUser: null,
                isOwnProfile: false,
                error: 'An error occurred. Please try again later.',
            },
        };
    }

    return {
        props: {
            loggedInUser: user,
            user: response.data,
            isOwnProfile: user.username === response.data.username,
            error: null,
        },
    };
});

export default ProfilePage;
