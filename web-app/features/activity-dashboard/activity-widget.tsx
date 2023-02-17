import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Widget from '@/components/widget';
import type Activity from '@/models/activity';

export interface ActivityWidgetProps {
    activity: Activity;
    onClick: () => void;
}

const ActivityWidget = ({ activity, onClick }: ActivityWidgetProps) => {
    return (
        <Widget
            action={
                <Button onClick={onClick} size='small'>
                    More Details
                </Button>
            }
        >
            <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
                {activity.category.toUpperCase()}
            </Typography>
            <Typography variant='h5' component='div'>
                {activity.title}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color='text.secondary'>
                {activity.city} | {activity.date.split('T')[0]}
            </Typography>
            <Typography variant='body2'>{activity.description}</Typography>
        </Widget>
    );
};

export default ActivityWidget;
