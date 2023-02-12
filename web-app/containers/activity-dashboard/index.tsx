import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import type Activity from '@/models/activity';

export interface ActivityDashboardProps {
    activities: Activity[];
}

const ActivityDashboard = ({ activities }: ActivityDashboardProps) => {
    return (
        <Box component='section' sx={{ marginTop: '2rem', flexGrow: 1 }}>
            <Grid container spacing={8}>
                {activities.map((e) => (
                    <Grid item key={e.id} xs={6}>
                        <Paper>{e.title}</Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default ActivityDashboard;
