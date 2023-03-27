import Widget from '@/components/widget';

export interface ProfileContentWidgetProps {}

const ProfileContentWidget = ({}: ProfileContentWidgetProps) => {
    return (
        <Widget boxProps={{ textAlign: 'center' }} cardProps={{ sx: { minHeight: '200px' } }}>
            Hello
        </Widget>
    );
};

export default ProfileContentWidget;
