import type { AppProps } from 'next/app';
import { SnackbarProvider } from 'notistack';
import 'react-calendar/dist/Calendar.css';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ErrorBoundary from '@/components/error/error-boundary';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// dashboard example
// https://github.com/mui/material-ui/blob/v5.11.8/docs/data/material/getting-started/templates/dashboard/Dashboard.tsx

// mui theme switcher
// https://mui.com/material-ui/experimental-api/css-theme-variables/usage/#toggle-between-light-and-dark-mode

// CQRS https://blog.christian-schou.dk/how-to-implement-cqrs-with-mediatr-in-asp-net/

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
