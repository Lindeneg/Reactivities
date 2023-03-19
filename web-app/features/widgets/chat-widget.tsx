import ReplyIcon from '@mui/icons-material/Reply';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Textarea from '@mui/material/TextareaAutosize';
import Typography from '@mui/material/Typography';
import withColorContrast from '@/utils/with-color-contrast';
import ChatComment, { type ChatCommentProps, type ChatCommentWidgetProps } from './chat-comment-widget';

export interface ChatWidgetProps {
    onReplyToComment: ChatCommentWidgetProps['onReply'];
    onReplyToEvent: () => void;
    title: string;
    comments: ChatCommentProps[];
}

const ChatWidget = ({ title, comments, onReplyToComment, onReplyToEvent }: ChatWidgetProps) => {
    return (
        <Card>
            <CardHeader
                sx={withColorContrast({ width: '100%', textAlign: 'center', marginBottom: '1rem' })}
                title={title}
            />
            <CardContent>
                {comments.map((e, i) => (
                    <ChatComment {...e} onReply={onReplyToComment} key={e.id} firstItem={i === 0} />
                ))}
                <Textarea minRows={3} style={{ width: '100%', marginTop: '1rem' }} />
            </CardContent>
            <CardActions sx={{ paddingLeft: '1rem' }}>
                <Button onClick={onReplyToEvent} type='button' variant='contained' startIcon={<ReplyIcon />}>
                    <Typography variant='button'>Reply</Typography>
                </Button>
            </CardActions>
        </Card>
    );
};

export default ChatWidget;
