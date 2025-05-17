import React from "react";
import { NodeProps } from "reactflow";
import BuildIcon from "@mui/icons-material/Build";

interface NodeData {
  label: string;
  confidence: number;
  details?: string;
  alternatives?: string[];
  tool?: {
    name: string;
    type: string;
    metrics: Record<string, string | number>;
  };
}

const getConfidenceColor = (confidence: number) => {
  if (confidence > 0.8) return "#4caf50";
  if (confidence > 0.6) return "#ffeb3b";
  return "#f44336";
};

const CustomNode: React.FC<NodeProps<NodeData>> = ({ data }) => (
  <div style={{
    background: "#fff",
    border: `2px solid ${getConfidenceColor(data.confidence)}`,
    borderRadius: "8px",
    padding: "12px",
    minWidth: "140px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    position: "relative"
  }}>
    <div style={{ fontWeight: "bold" }}>{data.label}</div>
    <div style={{ fontSize: "0.8em", margin: "6px 0" }}>
      Confidence: {(data.confidence * 100).toFixed(1)}%
    </div>
    {data.tool && (
      <div style={{ display: "flex", alignItems: "center", marginTop: 4 }}>
        <BuildIcon fontSize="small" style={{ marginRight: 4 }} />
        <span style={{ fontSize: "0.8em" }}>{data.tool.name}</span>
      </div>
    )}
  </div>
);

export default CustomNode;
