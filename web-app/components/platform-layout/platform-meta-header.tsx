import Head from 'next/head';

const DEFAULT_TITLE = 'Reactivities';
const DEFAULT_DESCRIPTION = 'Create and organize events';

export interface PlatFormMetaHeaderProps {
    title?: string;
    description?: string;
}

const PlatformMetaHeader = ({ title, description }: PlatFormMetaHeaderProps) => {
    return (
        <Head>
            <title>{title || DEFAULT_TITLE}</title>
            <meta name="description" content={description || DEFAULT_DESCRIPTION} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    );
};

export default PlatformMetaHeader;
