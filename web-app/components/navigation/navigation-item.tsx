import Link from 'next/link';
import { useRouter } from 'next/router';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

export interface NavigationItemProps {
    label?: string;
    path?: string;
    onClick?: () => void;
    onClose?: () => void;
    closeOnClick?: boolean;
    divider?: boolean;
    Icon?: React.ComponentType;
}

interface CustomListItemButtonProps {
    LinkComponent?: typeof Link;
    href?: string;
    onClick?: () => void;
}

const NavigationItem = ({
    divider,
    label,
    Icon,
    path,
    onClick,
    onClose,
    closeOnClick = false,
}: NavigationItemProps) => {
    const router = useRouter();

    if (divider) {
        return <Divider />;
    }

    const closeAndClickHandler = () => {
        onClose && onClose();
        onClick && onClick();
    };

    const navClickHandler = () => {
        if (!path || router.route === path) return;
        router.push(path);
    };

    const listItemButtonProps: CustomListItemButtonProps = {};

    if (typeof path !== 'undefined' && typeof onClick === 'undefined') {
        listItemButtonProps.onClick = navClickHandler;
    } else if (typeof onClick === 'function') {
        listItemButtonProps.onClick = closeOnClick ? closeAndClickHandler : onClick;
    } else {
        console.debug("NavbarItem is missing either a 'path' or a 'onClick' handler", {
            label,
            path,
        });
        return null;
    }

    return (
        <ListItem disablePadding>
            <ListItemButton {...listItemButtonProps} selected={router.route === path}>
                {Icon && <ListItemIcon>{<Icon />}</ListItemIcon>}
                {label && <ListItemText primary={label} />}
            </ListItemButton>
        </ListItem>
    );
};

export default NavigationItem;
