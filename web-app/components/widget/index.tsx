import Box from '@mui/material/Box';
import Card, { type CardProps } from '@mui/material/Card';
import CardActions, { type CardActionsProps } from '@mui/material/CardActions';
import CardContent, { type CardContentProps } from '@mui/material/CardContent';
import CardHeader, { type CardHeaderProps } from '@mui/material/CardHeader';

export interface WidgetProps {
    children: React.ReactNode;
    action?: React.ReactNode;
    minWidth?: number;
    withBox?: boolean;
    cardProps?: CardProps;
    cardContentProps?: CardContentProps;
    cardActionProps?: CardActionsProps;
    cardHeaderProps?: CardHeaderProps;
}

const Widget = ({
    action,
    children,
    cardContentProps,
    cardActionProps,
    cardHeaderProps,
    cardProps,
    withBox = true,
    minWidth = 275,
}: WidgetProps) => {
    const content = (
        <Card variant='elevation' {...cardProps}>
            <>
                {cardHeaderProps && <CardHeader {...cardHeaderProps} />}
                <CardContent {...cardContentProps}>{children}</CardContent>
                {action && <CardActions {...cardActionProps}>{action}</CardActions>}
            </>
        </Card>
    );

    return <>{withBox ? <Box sx={{ minWidth }}>{content}</Box> : content}</>;
};

export default Widget;
