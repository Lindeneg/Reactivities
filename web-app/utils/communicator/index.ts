export type ReactivityEvent = 'set-create-activity-modal-state';

export type ReactivityEventPayload<TEvent extends ReactivityEvent> = TEvent extends 'set-create-activity-modal-state'
    ? { open: boolean }
    : never;

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

const autoCast = <T>(arg: unknown) => arg as T;

const subscribe = <TEvent extends ReactivityEvent>(event: TEvent, listener: ReactivityEventListener<TEvent>) => {
    eventTarget.addEventListener(event, autoCast(listener));
};

const unsubscribe = <TEvent extends ReactivityEvent>(event: TEvent, listener: ReactivityEventListener<TEvent>) => {
    eventTarget.removeEventListener(event, autoCast(listener));
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
