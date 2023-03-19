import AccountCircleIcon from '@mui/icons-material/AccountCircleOutlined';
import { IconButton } from '@mui/material';

export interface HeaderProfileProps {}

const HeaderProfile = ({}: HeaderProfileProps) => {
    return (
        <IconButton sx={{ marginRight: '0.5rem' }} aria-label='open account toolbox'>
            <AccountCircleIcon fontSize='large' />
        </IconButton>
    );
};

export default HeaderProfile;
