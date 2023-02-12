import { useState } from 'react';
import Container from '@mui/material/Container';
import Footer from '@/components/footer';
import Header from '@/components/header';
import MetaHeader, { type MetaHeaderProps } from '@/components/meta-header';
import Navigation from '@/components/navigation';
import navItems from '@/data/navigation';

export interface LayoutProps {
    meta?: MetaHeaderProps;
    children: React.ReactNode;
}

const Layout = ({ children, meta }: LayoutProps) => {
    const [navOpen, setNavOpen] = useState(false);

    const toggleNavHandler = () => {
        setNavOpen((prev) => !prev);
    };

    return (
        <>
            <MetaHeader {...meta} />
            <Header name='Reactivities' logoPath='/next.svg' onOpenNavigation={toggleNavHandler} />
            <Navigation name='Reactivities' open={navOpen} items={navItems} onClose={toggleNavHandler} />
            <Container maxWidth='xl' component='main' sx={{ minHeight: '100vh' }}>
                {children}
            </Container>
            <Footer>asd</Footer>
        </>
    );
};

export default Layout;
