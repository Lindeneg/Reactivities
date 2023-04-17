import Grid from '@mui/material/Grid';
import ProfileFollowerWidget from '@/features/dashboards/profile-dashboard/profile-follower-widget';
import ProfileMenuWidget from '@/features/dashboards/profile-dashboard/profile-menu-widget';
import ProfileUserWidget from '@/features/dashboards/profile-dashboard/profile-user-widget';
import type { User } from '@/models';
import ProfileContentWidget from './profile-content-widget';

export interface ProfilePageProps {
    user: User;
    isOwnProfile: boolean;
}

const ProfileDashboard = ({ isOwnProfile, user }: ProfilePageProps) => {
    const isFollowing = false;
    const followText = isFollowing ? 'Unfollow' : 'Follow';

    return (
        <Grid container columnSpacing={2}>
            <Grid item xs={12} sm={6}>
                <ProfileUserWidget displayName={user.displayName} image={user.image} />
            </Grid>

            <Grid item xs={12} sm={6}>
                <ProfileFollowerWidget
                    followers={5}
                    following={12}
                    btnText={isOwnProfile ? 'Edit Profile' : `${followText} ${user.displayName}`}
                    btnColor={isFollowing ? 'warning' : 'primary'}
                    btnVariant={isFollowing ? 'outlined' : 'contained'}
                    onClick={() => {}}
                />
            </Grid>

            <Grid item xs={12} sm={9}>
                <ProfileContentWidget />
            </Grid>

            <Grid item xs={12} sm={3}>
                <ProfileMenuWidget />
            </Grid>
        </Grid>
    );
};

export default ProfileDashboard;
