import AssessmentIcon from '@mui/icons-material/Assessment';
import Dashboard from '@mui/icons-material/Dashboard';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import InfoIcon from '@mui/icons-material/Info';
import Logout from '@mui/icons-material/Logout';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SchoolIcon from '@mui/icons-material/School';
import TuneIcon from '@mui/icons-material/Tune';
import Mail from '@mui/icons-material/VerifiedUser';
import communicator from '@/communicator';
import type { NavigationProps } from '@/components/navigation';

const navEntries: NavigationProps['items'] = [
    {
        label: 'Dashboard',
        path: '/activities',
        Icon: Dashboard,
    },
    { divider: true },
    {
        label: 'Create Activity',
        onClick: () => {
            communicator.publish('set-create-activity-modal-state', { open: true });
        },
        closeOnClick: true,
        Icon: InfoIcon,
    },
    /*
    {
        label: 'Engagement', // engagement breakdown per department
        path: '/engagement',
        Icon: EmojiPeopleIcon,
    },
    { divider: true },
    {
        label: 'Reports',
        path: '/reports',
        Icon: AssessmentIcon,
    },
    {
        label: 'Knowledge Base',
        path: '/knowledge-base',
        Icon: SchoolIcon,
    },
    { divider: true },
    {
        label: 'Billing',
        path: '/billing',
        Icon: ReceiptIcon,
    },
    {
        label: 'Support',
        path: '/support',
        Icon: InfoIcon,
    },
    {
        label: 'Settings',
        path: '/settings',
        Icon: TuneIcon,
    },
    { divider: true },
    {
        label: 'Sign Out',
        path: '/sign-out',
        Icon: Logout,
    },
    */
];

export default navEntries;
