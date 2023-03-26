import ConfirmationModal from './confirmation-modal';
import CreateActivityModal, { type CreateActivityModalProps } from './create-activity-modal';

export interface ModalsProps {
    user: CreateActivityModalProps['user'] | null;
}

const Modals = ({ user }: ModalsProps) => {
    return (
        <>
            {user && <CreateActivityModal user={user} />}
            <ConfirmationModal />
        </>
    );
};

export default Modals;
