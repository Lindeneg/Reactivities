import Box from '@mui/material/Box';
import Card, { type CardProps } from '@mui/material/Card';
import CardActions, { type CardActionsProps } from '@mui/material/CardActions';
import CardContent, { type CardContentProps } from '@mui/material/CardContent';

export interface WidgetProps {
    children: React.ReactNode;
    action: React.ReactNode;
    minWidth?: number;
    cardProps?: CardProps;
    cardContentProps?: CardContentProps;
    cardActionProps?: CardActionsProps;
}

const Widget = ({ action, children, cardContentProps, cardActionProps, cardProps, minWidth = 275 }: WidgetProps) => {
    return (
        <Box sx={{ minWidth }}>
            <Card variant='outlined' {...cardProps}>
                <>
                    <CardContent {...cardContentProps}>{children}</CardContent>
                    <CardActions {...cardActionProps}>{action}</CardActions>
                </>
            </Card>
        </Box>
    );
};

export default Widget;
