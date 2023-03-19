import Box from '@mui/material/Box';
import List from '@mui/material/List';
import NavigationItem, { type NavigationItemProps } from './navigation-item';

export interface NavigationListProps {
    items: NavigationItemProps[];
    onClose: () => void;
}

const NavigationList = ({ items, onClose }: NavigationListProps) => {
    const createKey = (item: NavigationItemProps, idx: number): string => {
        return (item.path || '') + (item.label || '') + String(item.divider) + idx;
    };

    return (
        <Box sx={{ width: 250 }} role='navigation'>
            <List>
                {items.map((item, idx) => (
                    <NavigationItem key={createKey(item, idx)} {...item} onClose={onClose} />
                ))}
            </List>
        </Box>
    );
};

export default NavigationList;
