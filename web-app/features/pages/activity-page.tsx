import Image from 'next/image';
import { useRouter } from 'next/router';
import DashboardWidget from '@/features/widgets/activity-widget';
import type { Activity } from '@/models/activity';
import getCategory from '@/utils/get-category';
import useSubscription from '@/utils/use-subscription';

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
        <>
            <Image
                src={`/images/categoryImages/${getCategory.label(activity.category).toLowerCase()}.jpg`}
                alt='activity image'
                width={1024}
                height={1024}
                style={{ height: '300px', width: '100%', objectFit: 'cover' }}
            />
            <DashboardWidget activity={activity} onMoreDetails={() => null} />
        </>
    );
};

export default ActivityPage;
