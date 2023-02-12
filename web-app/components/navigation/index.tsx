import Link from 'next/link';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

interface NavBarItemProps {
    label?: string;
    path?: string;
    onClick?: () => void;
    divider?: boolean;
    Icon?: React.ComponentType;
}

interface CustomListItemButtonProps {
    LinkComponent?: typeof Link;
    href?: string;
    onClick?: () => void;
}

const NavBarItem = ({ divider, label, Icon, path, onClick }: NavBarItemProps) => {
    if (divider) {
        return <Divider />;
    }

    const listItemButtonProps: CustomListItemButtonProps = {};

    if (typeof path !== 'undefined' && typeof onClick === 'undefined') {
        listItemButtonProps.LinkComponent = Link;
        listItemButtonProps.href = path;
    } else if (typeof onClick === 'function') {
        listItemButtonProps.onClick = onClick;
    } else {
        console.debug("NavbarItem is missing either a 'path' or a 'onClick' handler", {
            label,
            path,
        });
        return null;
    }

    return (
        <ListItem disablePadding>
            <ListItemButton {...listItemButtonProps}>
                {Icon && <ListItemIcon>{<Icon />}</ListItemIcon>}
                {label && <ListItemText primary={label} />}
            </ListItemButton>
        </ListItem>
    );
};

interface NavigationListProps {
    items: NavBarItemProps[];
}

const NavigationList = ({ items }: NavigationListProps) => {
    const createKey = (item: NavBarItemProps, idx: number): string => {
        return (item.path || '') + (item.label || '') + String(item.divider) + idx;
    };

    return (
        <Box sx={{ width: 250 }} role='navigation'>
            <List>
                {items.map((item, idx) => (
                    <NavBarItem key={createKey(item, idx)} {...item} />
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
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 20px' }}>
                <Typography variant='h6'>{name}</Typography>
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <Divider />
            <NavigationList items={items} />
        </Drawer>
    );
};

export default Navigation;
