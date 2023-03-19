import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import InfoIcon from '@mui/icons-material/Info';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Widget from '@/components/widget';
import prettyDateString from '@/utils/pretty-date/pretty-date';

export interface ActivityInformationWidgetProps {
    description: string;
    date: string;
    city: string;
    venue: string;
}

const ActivityInformationWidget = ({ description, date, city, venue }: ActivityInformationWidgetProps) => {
    return (
        <Widget withBox={false}>
            <List>
                <ListItem divider>
                    <ListItemIcon>
                        <InfoIcon />
                    </ListItemIcon>
                    <ListItemText primary={description} />
                </ListItem>
                <ListItem divider>
                    <ListItemIcon>
                        <CalendarMonthIcon />
                    </ListItemIcon>
                    <ListItemText primary={prettyDateString(date, true)} />
                </ListItem>
                <ListItem sx={{ paddingBottom: '0' }}>
                    <ListItemIcon>
                        <LocationOnIcon />
                    </ListItemIcon>
                    <ListItemText primary={`${city}, ${venue}`} />
                </ListItem>
            </List>
        </Widget>
    );
};

export default ActivityInformationWidget;
