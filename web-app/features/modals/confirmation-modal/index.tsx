import { useRef, useState } from 'react';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import communicator from '@/communicator';
import Modal from '@/components/modal';
import useListener from '@/hooks/use-listener';

const defaultDescription = 'Are you sure you want to continue?';

const ConfirmationModal = () => {
    const [showModal, setShowModal] = useState(false);
    const [description, setDescription] = useState<string>('');
    const callback = useRef<() => Promise<void> | void>(() => {});

    useListener('set-confirmation-modal-state', ({ detail }) => {
        if (detail.open) {
            callback.current = detail.onAccept || (() => {});
            setDescription(detail.description || '');
        } else {
            callback.current = () => {};
            setDescription('');
        }
        setShowModal(detail.open);
    });

    const handleClose = () => communicator.publish('set-confirmation-modal-state', { open: false });

    const onClick = async () => {
        await callback.current();
        handleClose();
    };

    return (
        <Modal
            open={showModal}
            onClose={handleClose}
            labelledBy='confirmation modal'
            describedBy='confirm an action'
            boxProps={{ minHeight: 200 }}
        >
            <Typography id='confirmation-modal-title' variant='h6' component='h2'>
                Confirm Action
            </Typography>
            <Divider sx={{ margin: '15px 0px' }} />
            <Typography id='confirmation-modal-title' variant='body1'>
                {description || defaultDescription}
            </Typography>
            <Button type='button' fullWidth variant='contained' sx={{ mt: 3 }} onClick={onClick}>
                Continue
            </Button>
            <Button type='button' fullWidth variant='outlined' sx={{ mt: 1 }} onClick={handleClose}>
                Cancel
            </Button>
        </Modal>
    );
};

export default ConfirmationModal;
