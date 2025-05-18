import React, { useState } from 'react';
import AgentVisualizer from './components/AgentVisualizer/AgentVisualizer';
import Sidebar from './components/Sidebar/Sidebar';
import Legend from './components/Legend/Legend';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4f46e5',
      light: '#6366f1',
      dark: '#4338ca',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '1.5rem',
      fontWeight: 600,
      letterSpacing: '-0.025em',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
  },
});

const App: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 320px',
          height: '100vh',
          background: theme.palette.background.default,
        }}
      >
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
          <header
            style={{
              padding: '16px 24px',
              background: theme.palette.primary.main,
              color: '#ffffff',
              boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
            }}
          >
            <h1 style={{ 
              margin: 0,
              fontSize: '1.5rem',
              fontWeight: 600,
              letterSpacing: '-0.025em',
            }}>
              Pathwise Agent Visualizer
            </h1>
          </header>
          <div style={{ position: 'relative', flex: 1 }}>
            <AgentVisualizer setSelectedNodeId={setSelectedNodeId} />
            <Legend />
          </div>
        </div>
        <Sidebar selectedNodeId={selectedNodeId} />
      </div>
    </ThemeProvider>
  );
};

export default App;