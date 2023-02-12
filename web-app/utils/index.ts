import type { SxProps, Theme } from '@mui/material';

export const withColorContrast = (sx: SxProps<Theme>): SxProps<Theme> => {
    return {
        ...sx,
        bgcolor: (theme) => {
            return theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[200];
        },
    };
};
