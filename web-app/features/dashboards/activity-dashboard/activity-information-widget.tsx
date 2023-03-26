import BadgeIcon from '@mui/icons-material/Badge';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import InfoIcon from '@mui/icons-material/Info';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WarningIcon from '@mui/icons-material/Warning';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Widget from '@/components/widget';
import prettyDateString from '@/logic/pretty-date-string';
import type { Activity } from '@/models';

export interface ActivityInformationWidgetProps extends Activity {}

const ActivityInformationWidget = ({
    title,
    hostUsername,
    description,
    date,
    city,
    venue,
    isCancelled,
}: ActivityInformationWidgetProps) => {
    const sx = isCancelled ? { textDecoration: 'line-through' } : {};

    return (
        <Widget withBox={false}>
            <List>
                {isCancelled && (
                    <ListItem divider>
                        <ListItemIcon>
                            <WarningIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary='Event is cancelled'
                            sx={{
                                color: 'error.main',
                            }}
                        />
                    </ListItem>
                )}
                <ListItem divider>
                    <ListItemIcon>
                        <BadgeIcon />
                    </ListItemIcon>
                    <ListItemText sx={sx} primary={`${title} | Hosted by ${hostUsername}`} />
                </ListItem>
                <ListItem divider>
                    <ListItemIcon>
                        <InfoIcon />
                    </ListItemIcon>
                    <ListItemText sx={sx} primary={description} />
                </ListItem>
                <ListItem divider>
                    <ListItemIcon>
                        <CalendarMonthIcon />
                    </ListItemIcon>
                    <ListItemText sx={sx} primary={prettyDateString(date, true)} />
                </ListItem>
                <ListItem sx={{ paddingBottom: '0' }}>
                    <ListItemIcon>
                        <LocationOnIcon />
                    </ListItemIcon>
                    <ListItemText sx={sx} primary={`${city}, ${venue}`} />
                </ListItem>
            </List>
        </Widget>
    );
};

export default ActivityInformationWidget;
