import Image from 'next/image';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import communicator from '@/communicator';
import Widget from '@/components/widget';
import api from '@/data/client';
import getCategory from '@/logic/get-category';
import prettyDateString from '@/logic/pretty-date-string';
import withColorContrast from '@/logic/with-color-contrast';
import type { Activity } from '@/models/activity';

export interface ActivityWidgetProps {
    activity: Activity;
    isHost: boolean;
    onMoreDetails: () => void;
}

const ActivityWidget = ({ activity, isHost, onMoreDetails }: ActivityWidgetProps) => {
    const openCreateActivityModal = () => {
        communicator.publish('set-create-activity-modal-state', { open: true, activity });
    };

    const onDelete = () => {
        communicator.publish('set-confirmation-modal-state', {
            open: true,
            description: `Are you sure you want to activity '${activity.title}'?`,
            onAccept: async () => {
                await api.activities.delete(activity.id, activity.title);
            },
        });
    };

    return (
        <Widget
            action={
                <Box display='flex' width='100%' padding='8px' alignItems='center' justifyContent='space-between'>
                    <Button onClick={onMoreDetails} size='small'>
                        More Details
                    </Button>
                    {isHost && (
                        <IconButton aria-label='delete activity' onClick={onDelete}>
                            <DeleteForeverIcon fontSize='small' />
                        </IconButton>
                    )}
                </Box>
            }
        >
            <Box display='flex' alignItems='center' justifyContent='space-between' marginBottom={isHost ? '0' : '1rem'}>
                <Chip label={getCategory.label(activity.category).toUpperCase()} size='small' variant='outlined' />
                {isHost && (
                    <IconButton aria-label='open edit activity modal' onClick={openCreateActivityModal}>
                        <EditIcon fontSize='small' />
                    </IconButton>
                )}
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
                <Image src={'/images/user.png'} alt='activity image' width={128} height={128} />
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
                    <Typography sx={{ mb: 1.5 }} color='text.secondary'>
                        {activity.city} | {activity.venue}
                    </Typography>
                </Box>
            </Box>
            <Typography sx={{ mt: 1.5 }} color='text.secondary'>
                {prettyDateString(activity.date)}
            </Typography>
            <Typography
                variant='body2'
                sx={withColorContrast({
                    margin: '8px 0',
                    padding: '4px',
                    borderRadius: '12px',
                })}
            >
                Attendees
            </Typography>
            <Typography variant='body2'>{activity.description}</Typography>
        </Widget>
    );
};

export default ActivityWidget;
