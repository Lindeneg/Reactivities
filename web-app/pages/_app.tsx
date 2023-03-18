import type { AppProps } from 'next/app';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ErrorBoundary from '@/components/error/error-boundary';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// react redux toolkit ts
// https://github.com/reduxjs/cra-template-redux-typescript/tree/master/template/src/features/counter

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
                <CssBaseline />
                <Component {...pageProps} />
            </ThemeProvider>
        </ErrorBoundary>
    );
}
