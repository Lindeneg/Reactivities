import { type SnackbarKey, closeSnackbar } from 'notistack';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

export interface CloseSnackbarProps {
    key: SnackbarKey;
}

const CloseSnackbar = ({ key }: CloseSnackbarProps) => {
    return (
        <IconButton
            aria-label='close snackbar'
            onClick={() => {
                closeSnackbar(key);
            }}
        >
            <CloseIcon />
        </IconButton>
    );
};

export default CloseSnackbar;
