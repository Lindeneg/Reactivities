import Calender from 'react-calendar';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';
import Widget from '@/components/widget';

export interface ActivityFilterWidgetProps {}

const ActivityFilterWidget = ({}: ActivityFilterWidgetProps) => {
    return (
        <Box>
            <Widget title='Activity Filters' minWidth={375}>
                <List>
                    <ListItem divider>
                        <ListItemButton selected>
                            <Typography variant='button'>All Activities</Typography>
                        </ListItemButton>
                    </ListItem>
                    <ListItem divider>
                        <ListItemButton>
                            <Typography variant='button'>I&apos;m Going</Typography>
                        </ListItemButton>
                    </ListItem>
                    <ListItem divider>
                        <ListItemButton>
                            <Typography variant='button'>I&apos;m Hosting</Typography>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Widget>
            <Widget cardProps={{ sx: { margin: '1rem 0' } }}>
                <Calender />
            </Widget>
        </Box>
    );
};

export default ActivityFilterWidget;
