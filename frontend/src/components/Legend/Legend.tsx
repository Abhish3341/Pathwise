import React from "react";
import BuildIcon from "@mui/icons-material/Build";

const Legend: React.FC = () => (
  <div style={{
    position: 'absolute',
    bottom: '20px',
    left: '20px',
    background: 'rgba(255,255,255,0.9)',
    padding: '12px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    zIndex: 1000
  }}>
    <h4 style={{ margin: '0 0 8px 0' }}>Legend</h4>
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
      <div style={{
        width: '16px',
        height: '16px',
        background: '#4caf50',
        marginRight: '8px',
        borderRadius: '4px'
      }} />
      High Confidence (&gt;80%)
    </div>
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
      <div style={{
        width: '16px',
        height: '16px',
        background: '#ffeb3b',
        marginRight: '8px',
        borderRadius: '4px'
      }} />
      Medium Confidence (60-80%)
    </div>
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
      <div style={{
        width: '16px',
        height: '16px',
        background: '#f44336',
        marginRight: '8px',
        borderRadius: '4px'
      }} />
      Low Confidence (&lt;60%)
    </div>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <BuildIcon fontSize="small" style={{ marginRight: '8px' }} />
      Tool Usage
    </div>
  </div>
);

export default Legend;
