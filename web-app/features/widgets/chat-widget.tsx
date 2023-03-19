import ReplyIcon from '@mui/icons-material/Reply';
import Button from '@mui/material/Button';
import Textarea from '@mui/material/TextareaAutosize';
import Typography from '@mui/material/Typography';
import ChatAvatarComment, {
    type ChatAvatarCommentProps,
    type ChatCommentProps,
} from '@/components/chat-avatar-comment';
import Widget from '@/components/widget';

export interface ChatWidgetProps {
    onReplyToComment: ChatAvatarCommentProps['onReply'];
    onReplyToEvent: () => void;
    title: string;
    comments: ChatCommentProps[];
}

const ChatWidget = ({ title, comments, onReplyToComment, onReplyToEvent }: ChatWidgetProps) => {
    return (
        <Widget
            title={title}
            withBox={false}
            cardActionProps={{ sx: { paddingLeft: '1rem' } }}
            action={
                <Button onClick={onReplyToEvent} type='button' variant='contained' startIcon={<ReplyIcon />}>
                    <Typography variant='button'>Reply</Typography>
                </Button>
            }
        >
            {comments.map((e, i) => (
                <ChatAvatarComment {...e} onReply={onReplyToComment} key={e.id} firstItem={i === 0} />
            ))}
            <Textarea minRows={3} style={{ width: '100%', marginTop: '1rem' }} />
        </Widget>
    );
};

export default ChatWidget;
