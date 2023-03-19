import React from 'react';
import List from '@mui/material/List';
import AttendeeItem, { type AttendeeItemProps } from '@/components/attendee-item';
import Widget from '@/components/widget';

export interface ActivityAttendanceWidgetProps {
    attendees: AttendeeItemProps[];
}

const ActivityAttendanceWidget = ({ attendees }: ActivityAttendanceWidgetProps) => {
    return (
        <Widget title={`${attendees.length} attendees going`} minWidth={375}>
            <List>
                {attendees.map((attendee, idx) => (
                    <AttendeeItem {...attendee} key={`${attendee.name}-${idx}`} />
                ))}
            </List>
        </Widget>
    );
};

export default ActivityAttendanceWidget;
