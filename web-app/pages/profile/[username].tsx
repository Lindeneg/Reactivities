import { useEffect } from 'react';
import { Avatar, Box, Button, Divider, Typography } from '@mui/material';
import communicator from '@/communicator';
import Widget from '@/components/widget';
import api from '@/data/server';
import Layout from '@/features/layout';
import getUserImageOrDefault from '@/logic/get-user-image-or-default';
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

    const isFollowing = true;
    const followText = isFollowing ? 'Unfollow' : 'Follow';
    const btnColor = isFollowing ? 'warning' : 'primary';
    const btnVariant = isFollowing ? 'outlined' : 'contained';
    const statsSx = { variant: 'h6', color: 'HighlightText', bgcolor: 'Highlight', borderRadius: '1rem' } as const;
    const widgetSx = { sx: { minHeight: '200px' } };

    return (
        <Layout user={loggedInUser}>
            <Box display='flex' flexDirection='row' flexWrap='wrap' justifyContent='space-evenly'>
                <Widget cardProps={widgetSx}>
                    <Box display='flex' flexDirection='row' alignItems='center' padding='16px'>
                        <Avatar
                            sx={{
                                width: '128px',
                                height: '128px',
                                marginRight: '1rem',
                            }}
                            alt={`${user.displayName}'s avatar`}
                            src={getUserImageOrDefault(user.image)}
                        />
                        <Typography variant='h4'>{user.displayName}</Typography>
                    </Box>
                </Widget>
                <Widget boxProps={{ textAlign: 'center' }} cardProps={widgetSx}>
                    <Typography {...statsSx}>5 FOLLOWERS</Typography>
                    <Typography {...statsSx} color='Highlight' bgcolor='HighlightText' marginTop='1rem'>
                        5 FOLLOWING
                    </Typography>
                    <Divider sx={{ marginTop: '1rem', marginBottom: '1rem' }} />
                    <Button variant={btnVariant} color={btnColor}>
                        {isOwnProfile ? 'Edit Profile' : `${followText} ${user.displayName}`}
                    </Button>
                </Widget>
            </Box>
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
