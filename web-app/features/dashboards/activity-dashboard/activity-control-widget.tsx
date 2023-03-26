import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import communicator from '@/communicator';
import Widget from '@/components/widget';
import api from '@/data/client';
import type { Activity } from '@/models';

export interface ActivityControlWidgetProps {
    activity: Activity;
    isAttending: boolean;
    isHost: boolean;
}

const ActivityControlWidget = ({ activity, isAttending, isHost }: ActivityControlWidgetProps) => {
    const openCreateActivityModal = () => {
        communicator.publish('set-create-activity-modal-state', { open: true, activity });
    };

    const onDelete = () => {
        communicator.publish('set-confirmation-modal-state', {
            open: true,
            description: `Are you sure you want to delete '${activity.title}'?`,
            onAccept: async () => {
                await api.activities.delete(activity.id, activity.title);
            },
        });
    };

    const onCancel = () => {
        communicator.publish('set-confirmation-modal-state', {
            open: true,
            description: 'Are you sure you want to cancel?',
            onAccept: async () => {
                await api.activities.attend(activity, isHost);
            },
        });
    };

    const onAttend = async () => {
        if (isHost) {
            communicator.publish('set-confirmation-modal-state', {
                open: true,
                description: `Are you sure you want to revive '${activity.title}'?`,
                onAccept: async () => {
                    await api.activities.attend(activity, isHost);
                },
            });
        } else {
            await api.activities.attend(activity, isHost);
        }
    };

    const getAttendButtonText = () => {
        if (isHost && !activity.isCancelled) return 'HOSTING';
        if (isHost && activity.isCancelled) return 'Revive Activity';
        return 'Attend Activity';
    };

    const buttonProps = isHost ? { sx: { width: '170px' } } : { fullWidth: true };

    return (
        <Widget
            withBox={false}
            cardContentProps={{
                sx: {
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                },
            }}
        >
            <Box marginBottom='1rem'>
                <Button
                    disabled={(isHost && !activity.isCancelled) || (!isHost && isAttending)}
                    onClick={onAttend}
                    size='small'
                    variant='contained'
                    {...buttonProps}
                >
                    {getAttendButtonText()}
                </Button>
                {isHost && (
                    <IconButton
                        onClick={openCreateActivityModal}
                        aria-label='open edit activity modal'
                        sx={{ float: 'right' }}
                    >
                        <EditIcon fontSize='small' />
                    </IconButton>
                )}
            </Box>
            <Box>
                <Button
                    disabled={!isAttending || activity.isCancelled}
                    onClick={onCancel}
                    size='small'
                    variant='outlined'
                    {...buttonProps}
                >
                    {'Cancel ' + (isHost ? 'Event' : 'Attendance')}
                </Button>
                {isHost && (
                    <IconButton onClick={onDelete} aria-label='delete activity' sx={{ float: 'right' }}>
                        <DeleteForeverIcon fontSize='small' />
                    </IconButton>
                )}
            </Box>
        </Widget>
    );
};

export default ActivityControlWidget;
