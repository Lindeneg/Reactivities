import { useState } from 'react';
import GlobalSpinner from '@/components/global-spinner';
import useSubscription from '@/utils/use-subscription';

const Spinner = () => {
    const [show, setShow] = useState(false);

    useSubscription('set-global-spinner-state', ({ detail }) => setShow(detail.open));

    if (!show) return null;

    return <GlobalSpinner />;
};

export default Spinner;
