import Image from 'next/image';
import { useRouter } from 'next/router';
import Card from '@mui/material/Card';
import type { Activity } from '@/models/activity';
import getCategory from '@/utils/get-category';
import useSubscription from '@/utils/use-subscription';
import ChatWidget from '../widgets/chat-widget';

export interface ActivityPageProps {
    activity: Activity;
}

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
                <ChatWidget
                    title='Chat about this event'
                    onReplyToEvent={() => {}}
                    onReplyToComment={() => {}}
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
