import React from "react";
import { agentNodes } from "../../data/agentReasoning";

interface SidebarProps {
  selectedNodeId: string | null;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedNodeId }) => {
  const node = agentNodes.find(n => n.id === selectedNodeId)?.data;

  if (!node) return (
    <div style={{ padding: 16, color: '#666' }}>
      Select a node to view details
    </div>
  );

  return (
    <div style={{
      width: '300px',
      background: '#fff',
      padding: '16px',
      borderLeft: '1px solid #eee',
      height: '100vh',
      overflowY: 'auto'
    }}>
      <h3 style={{ marginTop: 0 }}>{node.label}</h3>
      <div style={{ margin: '12px 0' }}>
        <strong>Confidence:</strong> {(node.confidence * 100).toFixed(1)}%
      </div>
      
      {node.details && (
        <div style={{ margin: '12px 0' }}>
          <strong>Reasoning:</strong>
          <p>{node.details}</p>
        </div>
      )}

      {node.tool && (
        <div style={{ margin: '12px 0' }}>
          <strong>Tool Used:</strong>
          <div style={{ marginLeft: '8px' }}>
            <div>Name: {node.tool.name}</div>
            <div>Type: {node.tool.type}</div>
            <div>Metrics:</div>
            <ul>
              {Object.entries(node.tool.metrics).map(([key, value]) => (
                <li key={key}>{key}: {value}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {node.alternatives && node.alternatives.length > 0 && (
        <div style={{ margin: '12px 0' }}>
          <strong>Alternatives Considered:</strong>
          <ul>
            {node.alternatives.map((alt, index) => (
              <li key={index}>{alt}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
