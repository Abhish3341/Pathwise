import React, { useState } from "react";
import ReactFlow, { 
  MiniMap, 
  Controls, 
  Background,
  ReactFlowProvider
} from "reactflow";
import "reactflow/dist/style.css";
import CustomNode from "./CustomNode";
import { agentNodes, agentEdges } from "../../data/agentReasoning";

interface AgentVisualizerProps {
  setSelectedNodeId: (id: string | null) => void;
}

const nodeTypes = { custom: CustomNode };

const AgentVisualizer: React.FC<AgentVisualizerProps> = ({ setSelectedNodeId }) => {
  const [currentStep] = useState<number>(0);
  const [showAll] = useState<boolean>(false);
  const [confidenceFilter] = useState<number>(0);

  const visibleNodes = agentNodes.filter(n => 
    (showAll || parseInt(n.id) <= currentStep + 1) && 
    n.data.confidence >= confidenceFilter
  );

  const visibleEdges = agentEdges.filter(e => 
    visibleNodes.some(n => n.id === e.source) && 
    visibleNodes.some(n => n.id === e.target)
  );

  return (
    <div style={{ width: '100%', height: '70vh' }}>
      <div style={{ 
        padding: '16px', 
        background: '#f5f5f5',
        display: 'flex',
        gap: '8px',
        alignItems: 'center'
      }}>
        {/* ... existing control buttons ... */}
      </div>
      <ReactFlowProvider>
        <ReactFlow
          nodes={visibleNodes}
          edges={visibleEdges}
          nodeTypes={nodeTypes}
          onNodeClick={(_, node) => setSelectedNodeId(node.id)}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background gap={16} />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
};

export default AgentVisualizer;
