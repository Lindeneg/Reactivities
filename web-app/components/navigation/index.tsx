import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import NavigationList, { type NavigationListProps } from './navigation-list';

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
            <NavigationList items={items} onClose={onClose} />
        </Drawer>
    );
};

export default Navigation;
