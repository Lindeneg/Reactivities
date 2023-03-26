import Box, { type BoxProps } from '@mui/material/Box';
import Card, { type CardProps } from '@mui/material/Card';
import CardActions, { type CardActionsProps } from '@mui/material/CardActions';
import CardContent, { type CardContentProps } from '@mui/material/CardContent';
import CardHeader, { type CardHeaderProps } from '@mui/material/CardHeader';
import withColorContrast from '@/logic/with-color-contrast';

export interface WidgetProps {
    children: React.ReactNode;
    action?: React.ReactNode;
    minWidth?: number;
    minHeight?: number;
    withBox?: boolean;
    boxProps?: BoxProps;
    cardProps?: CardProps;
    cardContentProps?: CardContentProps;
    cardActionProps?: CardActionsProps;
    cardHeaderProps?: CardHeaderProps;
    title?: string;
}

const Widget = ({
    action,
    children,
    cardContentProps,
    cardActionProps,
    cardHeaderProps,
    cardProps,
    boxProps,
    title,
    withBox = true,
    minWidth = 275,
    minHeight = 275,
}: WidgetProps) => {
    const content = (
        <Card variant='elevation' {...cardProps}>
            <>
                {(title || cardHeaderProps) && (
                    <CardHeader
                        title={title}
                        sx={withColorContrast({ width: '100%', textAlign: 'center' })}
                        {...cardHeaderProps}
                    />
                )}
                <CardContent {...cardContentProps}>{children}</CardContent>
                {action && <CardActions {...cardActionProps}>{action}</CardActions>}
            </>
        </Card>
    );

    return (
        <>
            {withBox ? (
                <Box sx={{ minWidth, minHeight }} {...boxProps}>
                    {content}
                </Box>
            ) : (
                content
            )}
        </>
    );
};

export default Widget;
