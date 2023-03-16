import { useEffect } from 'react';
import communicator, { type ReactivityEvent, ReactivityEventListener } from '../communicator';

const useCommunicator = <TEvent extends ReactivityEvent>(event: TEvent, listener: ReactivityEventListener<TEvent>) => {
    useEffect(() => {
        communicator.subscribe(event, listener);

        return () => {
            communicator.unsubscribe(event, listener);
        };
    }, [event, listener]);
};

export default useCommunicator;
