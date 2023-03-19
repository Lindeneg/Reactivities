import { useSnackbar } from 'notistack';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Footer from '@/components/footer';
import GlobalSpinner from '@/components/global-spinner';
import Header from '@/components/header';
import MetaHeader, { type MetaHeaderProps } from '@/components/meta-header';
import Navigation from '@/components/navigation';
import navItems from '@/data/navigation';
import useSubscription from '@/utils/use-subscription';
import Modals from '../modals';

export interface LayoutProps {
    meta?: MetaHeaderProps;
    children: React.ReactNode;
}

const Layout = ({ children, meta }: LayoutProps) => {
    const [navOpen, setNavOpen] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const toggleNavHandler = () => {
        setNavOpen((prev) => !prev);
    };

    useSubscription('enqueue-snackbar', ({ detail }) => {
        const { msg, ...props } = detail;
        enqueueSnackbar(msg, props);
    });

    useSubscription('set-global-spinner-state', ({ detail }) => setShowSpinner(detail.open));

    return (
        <>
            <Modals />
            {showSpinner && <GlobalSpinner />}
            <MetaHeader {...meta} />
            <Box display='flex' flexDirection='column' minHeight='100vh'>
                <Header name='Reactivities' logoPath='/next.svg' to='/' onOpenNavigation={toggleNavHandler} />
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
