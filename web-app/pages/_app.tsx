import type { AppProps } from 'next/app';
import { SnackbarProvider } from 'notistack';
import 'react-calendar/dist/Calendar.css';
import 'react-datepicker/dist/react-datepicker.css';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ErrorBoundary from '@/components/error/error-boundary';
import '@/styles/index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// mui theme switcher
// https://mui.com/material-ui/experimental-api/css-theme-variables/usage/#toggle-between-light-and-dark-mode

const theme = createTheme({
    palette: {
        mode: 'light',
    },
});

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ErrorBoundary>
            <ThemeProvider theme={theme}>
                <SnackbarProvider maxSnack={10}>
                    <CssBaseline />
                    <Component {...pageProps} />
                </SnackbarProvider>
            </ThemeProvider>
        </ErrorBoundary>
    );
}
