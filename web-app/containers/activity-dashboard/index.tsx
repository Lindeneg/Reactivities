import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import DashboardWidget from '@/components/widget/dashboard-widget';
import type Activity from '@/models/activity';

export interface ActivityDashboardProps {
    activities: Activity[];
}

const ActivityDashboard = ({ activities }: ActivityDashboardProps) => {
    return (
        <Box component='section' sx={{ flexGrow: 1 }}>
            <Grid container spacing={6} justifyContent='center'>
                {activities.map((e) => (
                    <Grid item key={e.id} xs={0} sm={6} lg={4}>
                        <DashboardWidget activity={e} onClick={() => console.log(e.id + ' clicked')} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default ActivityDashboard;
