import React, { useState } from 'react';
import AgentVisualizer from './components/AgentVisualizer/AgentVisualizer';
import Sidebar from './components/Sidebar/Sidebar';
import Legend from './components/Legend/Legend';

const App: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 300px',
        height: '100vh',
        background: '#f3f4f6'
      }}
    >
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
        <header
          style={{
            padding: '16px',
            background: '#4f46e5',
            color: 'white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          <h1 style={{ margin: 0 }}>Pathwise Agent Visualizer</h1>
        </header>
        {/* Pass setSelectedNodeId to AgentVisualizer */}
        <div style={{ position: 'relative', flex: 1 }}>
          <AgentVisualizer setSelectedNodeId={setSelectedNodeId} />
          {/* Legend overlays the bottom left of the visualization */}
          <Legend />
        </div>
      </div>
      <Sidebar selectedNodeId={selectedNodeId} />
    </div>
  );
};

export default App;
