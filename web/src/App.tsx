import React from 'react';
import { Router } from './routes/Router';
import { Header } from './components/Header';
import { AuthContextProvider } from './context/AuthContextProvider';
import {
    createTheme,
    CssBaseline,
    PaletteMode,
    ThemeProvider,
    useMediaQuery,
} from '@mui/material';

export const App: React.FC = () => {
    const preferDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [paletteMode, setPaletteMode] = React.useState<PaletteMode>(
        preferDarkMode ? 'dark' : 'light'
    );

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: { mode: paletteMode },
            }),
        [paletteMode]
    );

    const togglePaletteMode = () => {
        setPaletteMode(paletteMode === 'dark' ? 'light' : 'dark');
    };

    return (
        <React.StrictMode>
            <ThemeProvider theme={theme}>
                <CssBaseline enableColorScheme>
                    <AuthContextProvider>
                        <Router>
                            <Header
                                paletteMode={paletteMode}
                                togglePaletteMode={togglePaletteMode}
                            />
                        </Router>
                    </AuthContextProvider>
                </CssBaseline>
            </ThemeProvider>
        </React.StrictMode>
    );
};
