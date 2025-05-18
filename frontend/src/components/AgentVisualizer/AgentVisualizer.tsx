import React, { useState, useRef } from "react";
import ReactFlow, { 
  MiniMap, 
  Controls, 
  Background,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";
import { 
  Button, 
  Slider, 
  FormControlLabel, 
  Switch,
  IconButton,
  Tooltip,
  TextField,
  InputAdornment,
  Snackbar,
  Alert,
  Paper,
  Box,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
} from '@mui/material';
import {
  PlayArrow,
  Pause,
  RestartAlt,
  Search,
  Undo,
  Redo,
  Download,
  CenterFocusStrong,
  Settings,
} from '@mui/icons-material';
import { useHotkeys } from 'react-hotkeys-hook';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import CustomNode from "./CustomNode";
import { agentNodes, agentEdges } from "../../data/agentReasoning";

interface AgentVisualizerProps {
  setSelectedNodeId: (id: string | null) => void;
}

const nodeTypes = { custom: CustomNode };

const AgentVisualizer: React.FC<AgentVisualizerProps> = ({ setSelectedNodeId }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [showAll, setShowAll] = useState<boolean>(false);
  const [confidenceFilter, setConfidenceFilter] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [history, setHistory] = useState<number[]>([0]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);
  const [snackbar, setSnackbar] = useState<{open: boolean, message: string, severity: 'success' | 'error'}>({
    open: false,
    message: '',
    severity: 'success'
  });

  const flowRef = useRef<HTMLDivElement>(null);

  const visibleNodes = agentNodes.filter(n => {
    const matchesSearch = n.data.label.toLowerCase().includes(searchTerm.toLowerCase());
    return (showAll || parseInt(n.id) <= currentStep + 1) && 
           n.data.confidence >= confidenceFilter &&
           matchesSearch;
  });

  const visibleEdges = agentEdges.filter(e => 
    visibleNodes.some(n => n.id === e.source) && 
    visibleNodes.some(n => n.id === e.target)
  );

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && currentStep < agentNodes.length - 1) {
      interval = setInterval(() => {
        setCurrentStep(prev => {
          const newStep = prev + 1;
          setHistory(h => [...h.slice(0, historyIndex + 1), newStep]);
          setHistoryIndex(i => i + 1);
          return newStep;
        });
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentStep, historyIndex]);

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    setHistory([0]);
    setHistoryIndex(0);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(i => i - 1);
      setCurrentStep(history[historyIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(i => i + 1);
      setCurrentStep(history[historyIndex + 1]);
    }
  };

  const handleExport = async () => {
    if (flowRef.current) {
      try {
        const canvas = await html2canvas(flowRef.current);
        canvas.toBlob((blob) => {
          if (blob) {
            saveAs(blob, 'agent-visualization.png');
            setSnackbar({
              open: true,
              message: 'Visualization exported successfully!',
              severity: 'success'
            });
          }
        });
      } catch (error) {
        setSnackbar({
          open: true,
          message: 'Failed to export visualization',
          severity: 'error'
        });
      }
    }
  };

  useHotkeys('space', () => setIsPlaying(!isPlaying));
  useHotkeys('r', handleReset);
  useHotkeys('ctrl+z', handleUndo);
  useHotkeys('ctrl+shift+z', handleRedo);
  useHotkeys('ctrl+s', handleExport);

  return (
    <div style={{ width: '100%', height: '70vh' }} ref={flowRef}>
      <Paper 
        elevation={2}
        sx={{
          padding: 2,
          background: '#f8fafc',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          gap: 2,
          alignItems: 'center',
          flexWrap: 'wrap'
        }}
      >
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="contained"
            color={isPlaying ? "secondary" : "primary"}
            onClick={() => setIsPlaying(!isPlaying)}
            startIcon={isPlaying ? <Pause /> : <PlayArrow />}
            sx={{ 
              borderRadius: 2,
              textTransform: 'none',
              boxShadow: 2
            }}
          >
            {isPlaying ? 'Pause' : 'Play'}
          </Button>
          <Button
            variant="outlined"
            onClick={handleReset}
            startIcon={<RestartAlt />}
            sx={{ 
              borderRadius: 2,
              textTransform: 'none'
            }}
          >
            Reset
          </Button>
          <IconButton onClick={handleUndo} disabled={historyIndex === 0}>
            <Undo />
          </IconButton>
          <IconButton onClick={handleRedo} disabled={historyIndex === history.length - 1}>
            <Redo />
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
          <span>Step: {currentStep + 1}</span>
          <Slider
            value={currentStep}
            onChange={(_, value) => {
              setCurrentStep(value as number);
              setHistory(h => [...h.slice(0, historyIndex + 1), value as number]);
              setHistoryIndex(i => i + 1);
            }}
            min={0}
            max={agentNodes.length - 1}
            step={1}
            sx={{ width: '200px' }}
          />
        </Box>

        <TextField
          size="small"
          placeholder="Search nodes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <span>Confidence Filter:</span>
            <Slider
              value={confidenceFilter}
              onChange={(_, value) => setConfidenceFilter(value as number)}
              min={0}
              max={1}
              step={0.1}
              sx={{ width: '100px' }}
            />
          </Box>

          <FormControlLabel
            control={
              <Switch
                checked={showAll}
                onChange={(e) => setShowAll(e.target.checked)}
              />
            }
            label="Show All Steps"
          />

          <Tooltip title="Export Visualization">
            <IconButton onClick={handleExport}>
              <Download />
            </IconButton>
          </Tooltip>
        </Box>
      </Paper>

      <ReactFlowProvider>
        <div style={{ height: 'calc(100% - 80px)' }}>
          <ReactFlow
            nodes={visibleNodes}
            edges={visibleEdges}
            nodeTypes={nodeTypes}
            onNodeClick={(_, node) => setSelectedNodeId(node.id)}
            fitView
          >
            <Controls 
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                padding: '8px',
                background: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            />
            <MiniMap 
              style={{
                background: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            />
            <Background gap={16} color="#f1f5f9" />
          </ReactFlow>
        </div>
      </ReactFlowProvider>

      <SpeedDial
        ariaLabel="Visualization Controls"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        <SpeedDialAction
          icon={<Download />}
          tooltipTitle="Export"
          onClick={handleExport}
        />
        <SpeedDialAction
          icon={<CenterFocusStrong />}
          tooltipTitle="Fit View"
          onClick={() => {/* Add fit view logic */}}
        />
        <SpeedDialAction
          icon={<Settings />}
          tooltipTitle="Settings"
          onClick={() => {/* Add settings dialog */}}
        />
      </SpeedDial>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert 
          severity={snackbar.severity} 
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AgentVisualizer;
