import React from 'react';
import List from '@mui/material/List';
import AttendeeItem, { type AttendeeItemProps } from '@/components/attendee-item';
import Widget from '@/components/widget';
import withColorContrast from '@/utils/with-color-contrast';

export interface ActivityAttendanceWidgetProps {
    attendees: AttendeeItemProps[];
}

const ActivityAttendanceWidget = ({ attendees }: ActivityAttendanceWidgetProps) => {
    return (
        <Widget
            minWidth={375}
            cardHeaderProps={{
                sx: withColorContrast({ width: '100%', textAlign: 'center' }),
                title: `${attendees.length} attendees going`,
            }}
        >
            <List>
                {attendees.map((attendee, idx) => (
                    <AttendeeItem {...attendee} key={`${attendee.name}-${idx}`} />
                ))}
            </List>
        </Widget>
    );
};

export default ActivityAttendanceWidget;
