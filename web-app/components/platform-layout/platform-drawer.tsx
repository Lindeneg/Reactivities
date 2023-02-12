import { useRouter } from 'next/router';
import Drawer from '@mui/material/Drawer';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';

interface NavBarItemProps {
    label: string;
    path: string;
    Icon?: React.ComponentType;
}

const NavBarItem = ({ label, Icon, path }: NavBarItemProps) => {
    const router = useRouter();

    return (
        <ListItem disablePadding>
            <ListItemButton onClick={() => router.push(path)}>
                {Icon && <ListItemIcon>{<Icon />}</ListItemIcon>}
                <ListItemText primary={label} />
            </ListItemButton>
        </ListItem>
    );
};

interface NavBarListProps {
    items: NavBarItemProps[];
}

const NavBarList = ({ items }: NavBarListProps) => {
    return (
        <Box sx={{ width: 250 }} role="navigation">
            <List>
                {items.map((item, idx) => (
                    <NavBarItem key={idx} {...item} />
                ))}
            </List>
        </Box>
    );
};

export interface PlatformDrawerProps extends NavBarListProps {
    open: boolean;
    onClose: () => void;
}

const PlatformDrawer = ({ open, items, onClose }: PlatformDrawerProps) => {
    return (
        <Drawer anchor="left" open={open} onClose={onClose}>
            <div className={styles.header}>
                <Typography className={styles.name} variant="h6">
                    {name}
                </Typography>
                <IconButton className={styles.icon} onClick={onClose}>
                    <UndoIcon />
                </IconButton>
            </div>
            <NavBarList items={items} />
        </Drawer>
    );
};

export default PlatformDrawer;
