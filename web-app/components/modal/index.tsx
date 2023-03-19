import Box, { type BoxProps } from '@mui/material/Box';
import MuiModal from '@mui/material/Modal';

export interface ModalProps {
    children: React.ReactNode;
    open: boolean;
    onClose?: () => void;
    labelledBy?: string;
    describedBy?: string;
    boxProps?: BoxProps;
}

const Modal = ({
    children,
    boxProps,
    open,
    onClose,
    labelledBy = 'modal-modal-title',
    describedBy = 'modal-modal-description',
}: ModalProps) => {
    return (
        <MuiModal
            open={open}
            onClose={onClose}
            aria-labelledby={labelledBy}
            aria-describedby={describedBy}
        >
            <Box
                sx={{
                    transform: 'translate(-50%, -50%)',
                }}
                position='absolute'
                top='50%'
                left='50%'
                minWidth={400}
                minHeight={400}
                bgcolor='background.paper'
                border='2px solid #000'
                boxShadow={24}
                p={4}
                {...boxProps}
            >
                {children}
            </Box>
        </MuiModal>
    );
};

export default Modal;
