import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export type ChatCommentProps = {
    id: string;
    name: string;
    image: string;
    date: string;
    comment: string;
    //replies?: Comment[];
};

export interface ChatAvatarCommentProps extends ChatCommentProps {
    onReply?: (commentId: string) => void;
    firstItem?: boolean;
}

const ChatAvatarComment = ({ id, name, image, date, comment, onReply, firstItem = false }: ChatAvatarCommentProps) => {
    return (
        <>
            <Box display='flex' margin={!firstItem ? '1rem 0' : '0 0 1rem 0'}>
                <Avatar sx={{ width: '32px', height: '32px' }} alt={`${name}'s avatar`} src={image} />
                <Box marginLeft='1rem'>
                    <Typography variant='subtitle1' fontWeight='bold' component='small'>
                        {name}
                    </Typography>
                    <Typography variant='subtitle1' component='small'>
                        {' '}
                        | {date}
                    </Typography>
                    <Typography variant='body1'>{comment}</Typography>
                    {onReply && (
                        <Button
                            onClick={() => onReply(id)}
                            type='button'
                            size='small'
                            variant='outlined'
                            sx={{ marginTop: '0.3rem' }}
                        >
                            <Typography variant='button' component='small'>
                                Reply
                            </Typography>
                        </Button>
                    )}
                </Box>
            </Box>
        </>
    );
};

export default ChatAvatarComment;
