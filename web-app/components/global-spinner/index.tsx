import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export interface GlobalSpinnerProps {
    position?: 'absolute' | 'fixed';
    bottom?: number;
    right?: number;
}

const GlobalSpinner = ({ position = 'fixed', bottom = 20, right = 20 }: GlobalSpinnerProps) => {
    return (
        <Box position={position} bottom={bottom + 'px'} right={right + 'px'}>
            <CircularProgress />
        </Box>
    );
};

export default GlobalSpinner;
