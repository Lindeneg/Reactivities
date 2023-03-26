import { useSnackbar } from 'notistack';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CloseSnackbar from '@/components/close-snackbar';
import Footer from '@/components/footer';
import GlobalSpinner from '@/components/global-spinner';
import Header from '@/components/header';
import MetaHeader, { type MetaHeaderProps } from '@/components/meta-header';
import Navigation from '@/components/navigation';
import navItems from '@/constants/navigation';
import useListener from '@/hooks/use-listener';
import type { User } from '@/models';
import Modals from '../modals';

export interface LayoutProps {
    meta?: MetaHeaderProps;
    user: User | null;
    children: React.ReactNode;
}

const Layout = ({ children, meta, user }: LayoutProps) => {
    const [navOpen, setNavOpen] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const toggleNavHandler = () => {
        setNavOpen((prev) => !prev);
    };

    useListener('enqueue-snackbar', ({ detail }) => {
        const { msg, ...props } = detail;
        enqueueSnackbar(msg, {
            action: (key) => CloseSnackbar({ key }),
            ...props,
        });
    });

    useListener('set-global-spinner-state', ({ detail }) => setShowSpinner(detail.open));

    return (
        <>
            {showSpinner && <GlobalSpinner />}
            <Modals />
            <MetaHeader {...meta} />
            <Box display='flex' flexDirection='column' minHeight='100vh'>
                <Header
                    name='Reactivities'
                    logoPath='/next.svg'
                    to='/'
                    user={user}
                    onOpenNavigation={toggleNavHandler}
                />
                <Navigation name='Reactivities' open={navOpen} items={navItems} onClose={toggleNavHandler} />
                <Container maxWidth='xl' component='main' sx={{ marginBottom: '3rem' }}>
                    {children}
                </Container>
                <Footer>Reactivities @ Christian Lindeneg - 2023</Footer>
            </Box>
        </>
    );
};

export default Layout;
