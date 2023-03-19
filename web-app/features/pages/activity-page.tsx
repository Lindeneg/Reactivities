import Image from 'next/image';
import { useRouter } from 'next/router';
import ReplyIcon from '@mui/icons-material/Reply';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Textarea from '@mui/material/TextareaAutosize';
import type { Activity } from '@/models/activity';
import getCategory from '@/utils/get-category';
import useSubscription from '@/utils/use-subscription';
import withColorContrast from '@/utils/with-color-contrast';

export interface ActivityPageProps {
    activity: Activity;
}
type Comment = {
    id: string;
    name: string;
    image: string;
    date: string;
    comment: string;
    replies?: Comment[];
};

interface ChatWidgetProps {
    onReplyToComment?: (commentId: string) => void;
    onReplyToEvent?: () => void;
    title: string;
    comments: Comment[];
}

interface ChatCommentProps extends Comment {
    onReply?: (commentId: string) => void;
}

const ChatComment = ({}: ChatCommentProps) => {
    return (
        <div>
            {/* IMAGE - NAME - TIMESTAMP */}
            {/* COMMENT */}
            {/* REPLY */}
        </div>
    );
};

const ChatWidget = ({ title, comments, onReplyToComment, onReplyToEvent }: ChatWidgetProps) => {
    return (
        <Card>
            <CardHeader
                sx={withColorContrast({ width: '100%', textAlign: 'center', marginBottom: '1rem' })}
                title={title}
            />
            <CardContent>
                {comments.map((e) => (
                    <ChatComment {...e} onReply={onReplyToComment} key={e.id} />
                ))}
                <Textarea minRows={3} style={{ width: '100%' }} />
            </CardContent>
            <CardActions sx={{ paddingLeft: '1rem' }}>
                <Button onClick={onReplyToEvent} type='button' variant='contained' startIcon={<ReplyIcon />}>
                    Reply
                </Button>
            </CardActions>
        </Card>
    );
};

const ActivityPage = ({ activity }: ActivityPageProps) => {
    const router = useRouter();

    useSubscription('deleted-activity', ({ detail }) => {
        if (activity.id !== detail.activityId) return;

        router.push('/activities');
    });

    return (
        <div style={{ width: '100%' }}>
            <div style={{ width: '50%' }}>
                <Image
                    src={`/images/categoryImages/${getCategory.label(activity.category).toLowerCase()}.jpg`}
                    alt='activity image'
                    width={1024}
                    height={1024}
                    style={{ height: '300px', width: '100%', objectFit: 'cover', marginBottom: '1rem' }}
                />
                {/* CONTROL (JOIN, CANCEL, MANAGE) */}
                <Card sx={{ marginBottom: '1rem' }}>
                    <h1>Control</h1>
                </Card>

                {/* INFORMATION */}
                <Card sx={{ marginBottom: '1rem' }}>
                    <h1>Information</h1>
                </Card>

                {/* CHAT */}
                <ChatWidget
                    title='Chat about this event'
                    comments={[
                        {
                            id: '1',
                            image: '/images/user.png',
                            name: 'Matt',
                            date: '2021-01-01',
                            comment: 'This is a comment',
                        },
                        {
                            id: '2',
                            image: '/images/user.png',
                            name: 'Joe Henderson',
                            date: '2021-05-01',
                            comment: 'Dude, this is awesome!',
                        },
                    ]}
                />
            </div>
            <div>{/* SIDE BAR */}</div>
        </div>
    );
};

export default ActivityPage;
