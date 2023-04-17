import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Widget from '@/components/widget';

export interface ProfileFollowerWidgetProps {
    followers: number;
    following: number;
    btnText: string;
    btnVariant: 'contained' | 'outlined';
    btnColor: 'primary' | 'warning';
    onClick: () => void;
}

const ProfileFollowerWidget = ({
    followers,
    following,
    btnText,
    btnColor,
    btnVariant,
    onClick,
}: ProfileFollowerWidgetProps) => {
    return (
        <Widget boxProps={{ textAlign: 'center' }} cardProps={{ sx: { minHeight: '200px' } }}>
            <Typography variant='h6' color='HighlightText' bgcolor='Highlight' borderRadius='1rem'>
                {followers} FOLLOWERS
            </Typography>
            <Typography variant='h6' color='Highlight' bgcolor='HighlightText' marginTop='1rem'>
                {following} FOLLOWING
            </Typography>
            <Divider sx={{ marginTop: '1rem', marginBottom: '1rem' }} />
            <Button onClick={onClick} variant={btnVariant} color={btnColor}>
                {btnText}
            </Button>
        </Widget>
    );
};

export default ProfileFollowerWidget;
