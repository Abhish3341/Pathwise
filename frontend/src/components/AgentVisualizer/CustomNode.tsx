import React from "react";
import { NodeProps } from "reactflow";
import BuildIcon from "@mui/icons-material/Build";
import { Paper, Typography, LinearProgress, Tooltip, Zoom } from "@mui/material";
import { motion } from "framer-motion";

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
  <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.3 }}
    whileHover={{ scale: 1.02 }}
  >
    <Tooltip
      title={data.details || ""}
      TransitionComponent={Zoom}
      arrow
      placement="top"
    >
      <Paper
        elevation={3}
        sx={{
          border: `2px solid ${getConfidenceColor(data.confidence)}`,
          borderRadius: 2,
          padding: 2,
          minWidth: 200,
          background: "#fff",
          backdropFilter: "blur(10px)",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
          }
        }}
      >
        <Typography 
          variant="subtitle1" 
          fontWeight="bold" 
          gutterBottom
          sx={{ 
            color: "#1a237e",
            fontSize: "1rem",
            letterSpacing: "0.5px"
          }}
        >
          {data.label}
        </Typography>
        
        <div style={{ marginBottom: 12 }}>
          <Typography 
            variant="caption" 
            color="textSecondary"
            sx={{ display: "block", marginBottom: 1 }}
          >
            Confidence
          </Typography>
          <LinearProgress
            variant="determinate"
            value={data.confidence * 100}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: 'rgba(0,0,0,0.1)',
              '& .MuiLinearProgress-bar': {
                backgroundColor: getConfidenceColor(data.confidence),
                transition: 'transform 0.4s ease-in-out'
              }
            }}
          />
          <Typography 
            variant="caption" 
            color="textSecondary"
            sx={{ 
              display: "block", 
              textAlign: "right",
              marginTop: 0.5
            }}
          >
            {(data.confidence * 100).toFixed(1)}%
          </Typography>
        </div>

        {data.tool && (
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Paper
              elevation={1}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                padding: "6px 12px",
                borderRadius: 2,
                background: "rgba(0,0,0,0.04)",
                border: "1px solid rgba(0,0,0,0.08)"
              }}
            >
              <BuildIcon 
                fontSize="small" 
                sx={{ color: "primary.main" }}
              />
              <Typography 
                variant="caption"
                sx={{ 
                  fontWeight: 500,
                  color: "text.secondary"
                }}
              >
                {data.tool.name}
              </Typography>
            </Paper>
          </motion.div>
        )}
      </Paper>
    </Tooltip>
  </motion.div>
);

export default CustomNode;