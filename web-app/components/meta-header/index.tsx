import Head from 'next/head';
import { META_HEADER_DESCRIPTION, META_HEADER_TITLE } from '@/data/defaults';

export interface MetaHeaderProps {
    title?: string;
    description?: string;
}

const MetaHeader = ({ title, description }: MetaHeaderProps) => {
    const nonNullableTitle = title || META_HEADER_TITLE;
    return (
        <Head key={nonNullableTitle}>
            <title>{nonNullableTitle}</title>
            <meta name='description' content={description || META_HEADER_DESCRIPTION} />
            <meta name='viewport' content='width=device-width, initial-scale=1' />
            <link rel='icon' href='/favicon.ico' />
        </Head>
    );
};

export default MetaHeader;
