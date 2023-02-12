import Footer from '@/components/footer';
import Header from '@/components/header';
import MetaHeader, { type MetaHeaderProps } from '@/components/meta-header';
import Navigation from '@/components/navigation';
import navItems from '@/data/navigation';
import Container from '@mui/material/Container';

export interface LayoutProps {
    meta?: MetaHeaderProps;
    children: React.ReactNode;
}

const Layout = ({ children, meta }: LayoutProps) => {
    // control drawer
    // control profile
    return (
        <>
            <MetaHeader {...meta} />
            <Header name='Reactivities' logoPath='/logo.png' onOpenNavigation={() => null} />
            <Navigation name='Reactivities' open={true} items={navItems} onClose={() => null} />
            <Container maxWidth='xl' component='main'>
                {children}
            </Container>
            <Footer>asd</Footer>
        </>
    );
};

export default Layout;
