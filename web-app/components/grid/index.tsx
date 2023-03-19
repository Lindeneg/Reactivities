import Box, { type BoxProps } from '@mui/material/Box';
import MuiGrid, { type GridProps as MuiGridProps } from '@mui/material/Grid';

export interface GridProps<T> {
    data: T[];
    renderItem: (item: T) => React.ReactNode;
    itemKey: (item: T) => string;
    boxProps?: BoxProps;
    containerProps?: MuiGridProps;
    itemProps?: MuiGridProps;
}

const Grid = <T extends unknown>({ data, boxProps, containerProps, itemProps, itemKey, renderItem }: GridProps<T>) => {
    return (
        <Box component='section' flexGrow={1} {...boxProps}>
            <MuiGrid container spacing={6} {...containerProps}>
                {data.map((e) => {
                    return (
                        <MuiGrid item key={itemKey(e)} xs={12} md={10} lg={5} {...itemProps}>
                            {renderItem(e)}
                        </MuiGrid>
                    );
                })}
            </MuiGrid>
        </Box>
    );
};

export default Grid;
