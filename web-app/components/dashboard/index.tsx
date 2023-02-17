import Box, { type BoxProps } from '@mui/material/Box';
import Grid, { type GridProps } from '@mui/material/Grid';

export interface DashboardProps<T> {
    data: T[];
    renderItem: (item: T) => React.ReactNode;
    itemKey: (item: T) => string;
    boxProps?: BoxProps;
    containerProps?: GridProps;
    itemProps?: GridProps;
}

const Dashboard = <T extends unknown>({
    data,
    boxProps,
    containerProps,
    itemProps,
    itemKey,
    renderItem,
}: DashboardProps<T>) => {
    return (
        <Box component='section' flexGrow={1} {...boxProps}>
            <Grid container spacing={6} justifyContent='center' {...containerProps}>
                {data.map((e) => {
                    return (
                        <Grid item key={itemKey(e)} xs={0} sm={6} lg={4} {...itemProps}>
                            {renderItem(e)}
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
};

export default Dashboard;
