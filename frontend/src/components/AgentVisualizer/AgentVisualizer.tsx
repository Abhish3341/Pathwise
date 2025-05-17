import React from "react";
import ReactFlow, { Node, Edge } from "reactflow";
import "reactflow/dist/style.css";

// Example nodes and edges
const nodes: Node[] = [
  { id: "1", position: { x: 250, y: 0 }, data: { label: "Start (100%)" }, type: "input" },
  { id: "2", position: { x: 100, y: 100 }, data: { label: "Option A (70%)" } },
  { id: "3", position: { x: 400, y: 100 }, data: { label: "Option B (30%)" } },
  { id: "4", position: { x: 50, y: 200 }, data: { label: "A1 (60%)" } },
  { id: "5", position: { x: 150, y: 200 }, data: { label: "A2 (40%)" } },
];

const edges: Edge[] = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e1-3", source: "1", target: "3" },
  { id: "e2-4", source: "2", target: "4" },
  { id: "e2-5", source: "2", target: "5" },
];

const AgentVisualizer: React.FC = () => (
  <div style={{ width: "100%", height: 500 }}>
    <ReactFlow nodes={nodes} edges={edges} />
  </div>
);

export default AgentVisualizer;
