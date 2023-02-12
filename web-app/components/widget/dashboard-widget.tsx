import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import type Activity from '@/models/activity';

export interface DashboardWidgetProps {
    activity: Activity;
    onClick: () => void;
}

const DashboardWidget = ({ activity, onClick }: DashboardWidgetProps) => {
    return (
        <Box sx={{ minWidth: 275 }}>
            <Card variant='outlined'>
                <React.Fragment>
                    <CardContent>
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
                    </CardContent>
                    <CardActions>
                        <Button onClick={onClick} size='small'>
                            More Details
                        </Button>
                    </CardActions>
                </React.Fragment>
            </Card>
        </Box>
    );
};

export default DashboardWidget;
