import Image from 'next/image';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export interface HeaderLogoProps {
    name: string;
    logoPath: string;
    to?: string;
}

const HeaderLogo = ({ name, logoPath, to = '/' }: HeaderLogoProps) => {
    return (
        <Link href={to}>
            <Box display='flex'>
                <Image src={logoPath} alt={`${name} logo image`} width={32} height={32} priority />
                <Typography sx={{ marginLeft: '0.5rem' }} variant='h6' component='h1' color='text.primary'>
                    {name}
                </Typography>
            </Box>
        </Link>
    );
};

export default HeaderLogo;
