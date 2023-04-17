import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Widget from '@/components/widget';
import getUserImageOrDefault from '@/logic/get-user-image-or-default';

export interface ProfileUserWidgetProps {
    displayName: string;
    image: string | null;
}

const ProfileUserWidget = ({ displayName, image }: ProfileUserWidgetProps) => {
    return (
        <Widget cardProps={{ sx: { minHeight: '200px' } }}>
            <Box display='flex' flexDirection='row' alignItems='center' padding='16px'>
                <Avatar
                    sx={{
                        width: '128px',
                        height: '128px',
                        marginRight: '1rem',
                    }}
                    alt={`${displayName}'s avatar`}
                    src={getUserImageOrDefault(image)}
                />
                <Typography variant='h4'>{displayName}</Typography>
            </Box>
        </Widget>
    );
};

export default ProfileUserWidget;
