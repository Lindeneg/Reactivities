import type { OptionsObject } from 'notistack';
import type { Activity, ActivityFormValues } from '@/models';

type ReactivityEventPayloadMap = {
    'set-create-activity-modal-state': { open: boolean; activity?: Activity };

    'created-activity': { activity: Activity };

    'updated-activity': { activity: ActivityFormValues };

    'updated-activity-state': { activityId: string; isCancelled: boolean };

    'deleted-activity': { activityId: string };

    'updated-activity-attendance': { activityId: string };

    'set-global-spinner-state': { open: boolean };

    'set-confirmation-modal-state': { open: boolean; description?: string; onAccept?: () => Promise<void> | void };

    'enqueue-snackbar': { msg: string } & OptionsObject;
};

export type ReactivityEvent = keyof ReactivityEventPayloadMap;

export type ReactivityEventPayload<TEvent extends ReactivityEvent> = ReactivityEventPayloadMap[TEvent];

export type ReactivityEventListener<TEvent extends ReactivityEvent> = (
    event: CustomEvent<ReactivityEventPayload<TEvent>>
) => Promise<void> | void;

const eventTarget = new EventTarget();

const createEvent = <TEvent extends ReactivityEvent>(
    event: TEvent,
    payload: ReactivityEventPayload<TEvent>
): CustomEvent<ReactivityEventPayload<TEvent>> => {
    return new CustomEvent(event, { detail: payload });
};

const subscribe = <TEvent extends ReactivityEvent>(event: TEvent, listener: ReactivityEventListener<TEvent>) => {
    eventTarget.addEventListener(event, listener as EventListenerOrEventListenerObject | null);
};

const unsubscribe = <TEvent extends ReactivityEvent>(event: TEvent, listener: ReactivityEventListener<TEvent>) => {
    eventTarget.removeEventListener(event, listener as EventListenerOrEventListenerObject | null);
};

const publish = <TEvent extends ReactivityEvent>(event: TEvent, payload: ReactivityEventPayload<TEvent>) => {
    eventTarget.dispatchEvent(createEvent(event, payload));
};

const communicator = {
    subscribe,
    unsubscribe,
    publish,
};

export default communicator;
