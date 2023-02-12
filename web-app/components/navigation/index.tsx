import Link from 'next/link';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

interface NavBarItemProps {
    label?: string;
    path?: string;
    divider?: boolean;
    Icon?: React.ComponentType;
}

const NavBarItem = ({ divider, label, Icon, path }: NavBarItemProps) => {
    if (divider) {
        return <Divider />;
    }

    if (!path || !label) {
        console.debug("NavbarItem is missing either a 'path' or a 'label'", {
            label,
            path,
        });
        return null;
    }

    return (
        <ListItem disablePadding>
            <ListItemButton LinkComponent={Link} href={path}>
                {Icon && <ListItemIcon>{<Icon />}</ListItemIcon>}
                <ListItemText primary={label} />
            </ListItemButton>
        </ListItem>
    );
};

interface NavigationListProps {
    items: NavBarItemProps[];
}

const NavigationList = ({ items }: NavigationListProps) => {
    return (
        <Box sx={{ width: 250 }} role='navigation'>
            <List>
                {items.map((item) => (
                    <NavBarItem key={item.path} {...item} />
                ))}
            </List>
        </Box>
    );
};

export interface NavigationProps extends NavigationListProps {
    open: boolean;
    name: string;
    onClose: () => void;
}

const Navigation = ({ open, name, items, onClose }: NavigationProps) => {
    return (
        <Drawer anchor='left' open={open} onClose={onClose}>
            <Box>
                <Typography sx={{ padding: '10px 20px' }} variant='h6'>
                    {name}
                </Typography>
            </Box>
            <Divider />
            <NavigationList items={items} />
        </Drawer>
    );
};

export default Navigation;
