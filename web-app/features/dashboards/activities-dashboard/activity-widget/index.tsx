import { fillLink } from 'cl-fill-link';
import { useRouter } from 'next/router';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Widget from '@/components/widget';
import { APP_LINK } from '@/constants';
import getCategory from '@/logic/get-category';
import getUserImageOrDefault from '@/logic/get-user-image-or-default';
import prettyDateString from '@/logic/pretty-date-string';
import withColorContrast from '@/logic/with-color-contrast';
import type { Activity, User } from '@/models';

export interface ActivityWidgetProps {
    activity: Activity;
    user: User;
    onMoreDetails: () => void;
}

const ActivityWidget = ({ activity, user, onMoreDetails }: ActivityWidgetProps) => {
    const router = useRouter();
    const sx = activity.isCancelled ? { textDecoration: 'line-through' } : {};

    return (
        <Widget
            action={
                <Button onClick={onMoreDetails} size='small'>
                    More Details
                </Button>
            }
        >
            <Box display='flex' flexDirection='row' marginBottom='0.3rem'>
                {activity.isCancelled && (
                    <Chip
                        label='CANCELLED'
                        size='small'
                        variant='outlined'
                        color='error'
                        sx={{ marginRight: '0.2rem' }}
                    />
                )}
                {activity.hostUsername === user.username && (
                    <Chip label='HOST' size='small' variant='outlined' color='info' sx={{ marginRight: '0.2rem' }} />
                )}
                <Chip label={getCategory.label(activity.category).toUpperCase()} size='small' variant='outlined' />
            </Box>

            <Box
                display='flex'
                sx={(theme) => ({
                    [theme.breakpoints.up('md')]: {
                        flexDirection: 'row',
                    },
                    [theme.breakpoints.down('md')]: {
                        flexDirection: 'column',
                    },
                })}
            >
                <Avatar
                    sx={{
                        width: '64px',
                        height: '64px',
                    }}
                    alt={`${user.displayName}'s avatar`}
                    src={getUserImageOrDefault(user.image)}
                    onClick={() => router.push(fillLink(APP_LINK.PROFILE_USERNAME, { username: user.username }))}
                />
                <Box
                    display='flex'
                    flexDirection='column'
                    sx={(theme) => ({
                        [theme.breakpoints.up('md')]: {
                            margin: '0 0 0 1rem',
                        },
                        [theme.breakpoints.down('md')]: {
                            margin: '0',
                        },
                    })}
                >
                    <Typography variant='h5' component='div'>
                        {activity.title}
                    </Typography>
                    <Typography sx={{ mb: 1.5, ...sx }} color='text.secondary'>
                        {activity.city} | {activity.venue}
                    </Typography>
                </Box>
            </Box>

            <Typography sx={{ mt: 1.5, ...sx }} color='text.secondary'>
                {prettyDateString(activity.date)}
            </Typography>

            <Box
                display='flex'
                flexDirection='row'
                sx={withColorContrast({ padding: '8px', margin: '1rem 0', borderRadius: '1rem' })}
            >
                {activity.attendees.map(({ username, displayName, image }, idx) => (
                    <Tooltip key={username} title='Go to profile'>
                        <Avatar
                            sx={{
                                cursor: 'pointer',
                                width: '32px',
                                height: '32px',
                                marginLeft: idx === 0 ? '0' : '4px',
                                '&:hover': {
                                    opacity: 0.8,
                                },
                            }}
                            alt={`${displayName}'s avatar`}
                            src={getUserImageOrDefault(image)}
                            onClick={() => router.push(fillLink(APP_LINK.PROFILE_USERNAME, { username }))}
                        />
                    </Tooltip>
                ))}
            </Box>

            <Typography variant='body2' sx={sx}>
                {activity.description}
            </Typography>
        </Widget>
    );
};

export default ActivityWidget;
