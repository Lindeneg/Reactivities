import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Widget from '@/components/widget';
import api from '@/data/api';
import type { Activity } from '@/models/activity';
import communicator from '@/utils/communicator';

export interface ActivityWidgetProps {
    activity: Activity;
    onMoreDetails: () => void;
}

const ActivityWidget = ({ activity, onMoreDetails }: ActivityWidgetProps) => {
    const openCreateActivityModal = () => {
        communicator.publish('set-create-activity-modal-state', { open: true, activity });
    };

    const onDelete = () => {
        communicator.publish('set-confirmation-modal-state', {
            open: true,
            description: `Are you sure you want to activity '${activity.title}'?`,
            onAccept: () => api.activities.delete(activity.id, activity.title),
        });
    };

    return (
        <Widget
            action={
                <Box display='flex' width='100%' padding='8px' alignItems='center' justifyContent='space-between'>
                    <Button onClick={onMoreDetails} size='small'>
                        More Details
                    </Button>
                    <IconButton aria-label='delete activity' onClick={onDelete}>
                        <DeleteForeverIcon fontSize='small' />
                    </IconButton>
                </Box>
            }
        >
            <Box display='flex' alignItems='center' justifyContent='space-between'>
                <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
                    {activity.category.toUpperCase()}
                </Typography>
                <IconButton aria-label='open edit activity modal' onClick={openCreateActivityModal}>
                    <EditIcon fontSize='small' />
                </IconButton>
            </Box>
            <Typography variant='h5' component='div'>
                {activity.title}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color='text.secondary'>
                {activity.city} | {new Date(activity.date).toLocaleDateString()}
            </Typography>
            <Typography variant='body2'>{activity.description}</Typography>
        </Widget>
    );
};

export default ActivityWidget;