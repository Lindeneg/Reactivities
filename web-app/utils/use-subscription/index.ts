import { useEffect } from 'react';
import communicator, { type ReactivityEvent, type ReactivityEventListener } from '../communicator';

const useSubscription = <TEvent extends ReactivityEvent>(event: TEvent, listener: ReactivityEventListener<TEvent>) => {
    useEffect(() => {
        communicator.subscribe(event, listener);

        return () => {
            communicator.unsubscribe(event, listener);
        };
    }, [event, listener]);
};

export default useSubscription;
