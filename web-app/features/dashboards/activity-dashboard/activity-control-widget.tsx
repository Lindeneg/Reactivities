import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import communicator from '@/communicator';
import Widget from '@/components/widget';
import api from '@/data/client';
import type { Activity } from '@/models/activity';

export interface ActivityControlWidgetProps {
    activity: Activity;
    isAttending: boolean;
    isHost: boolean;
    onAttendActivity: () => void;
    onCancelAttendance: () => void;
}

const ActivityControlWidget = ({
    activity,
    isAttending,
    isHost,
    onAttendActivity,
    onCancelAttendance,
}: ActivityControlWidgetProps) => {
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
                    disabled={isAttending}
                    onClick={onAttendActivity}
                    size='small'
                    variant='contained'
                    {...buttonProps}
                >
                    Attend Activity
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
                    disabled={!isAttending}
                    onClick={onCancelAttendance}
                    size='small'
                    variant='outlined'
                    {...buttonProps}
                >
                    Cancel Attendance
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
