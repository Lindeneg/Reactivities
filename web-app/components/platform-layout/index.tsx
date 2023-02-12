import Container from '@mui/material/Container';
import PlatformMetaHeader, { type PlatFormMetaHeaderProps } from './platform-meta-header';
import PlatformHeader from './platform-header';
import PlatformDrawer from './platform-drawer';
import PlatformFooter from './platform-footer';

export interface PlatformLayout extends PlatFormMetaHeaderProps {
    children: React.ReactNode;
}

const PlatformLayout = ({ children, ...metaProps }: PlatformLayout) => {
    // control drawer
    // control profile
    return (
        <>
            <PlatformMetaHeader {...metaProps} />
            <PlatformHeader />
            <PlatformDrawer open={true} items={[]} onClose={() => null} />
            <Container maxWidth="xl" component="main">
                {children}
            </Container>
            <PlatformFooter />
        </>
    );
};

export default PlatformLayout;
