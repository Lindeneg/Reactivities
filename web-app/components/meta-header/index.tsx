import Head from 'next/head';
import constants from '@/constants';

export interface MetaHeaderProps {
    title?: string;
    description?: string;
}

const MetaHeader = ({ title, description }: MetaHeaderProps) => {
    const nonNullableTitle = title || constants.META_HEADER.TITLE;
    return (
        <Head key={nonNullableTitle}>
            <title>{nonNullableTitle}</title>
            <meta name='description' content={description || constants.META_HEADER.DESCRIPTION} />
            <meta name='viewport' content='width=device-width, initial-scale=1' />
            <link rel='icon' href='/favicon.ico' />
        </Head>
    );
};

export default MetaHeader;
