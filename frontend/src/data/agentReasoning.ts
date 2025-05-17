import { Node, Edge } from "reactflow";

export interface AgentNodeData {
  label: string;
  confidence: number;
  details?: string;
  alternatives?: string[];
  tool?: {
    name: string;
    type: 'API' | 'LLM' | 'Calculator' | 'Database';
    metrics: Record<string, string | number>;
  };
}

export const agentNodes: Node<AgentNodeData>[] = [
  {
    id: '1',
    position: { x: 250, y: 0 },
    data: { 
      label: 'Start Analysis',
      confidence: 1.0,
      details: 'Initializing problem analysis...',
      alternatives: ['Direct user query', 'Historical data lookup']
    },
    type: 'custom'
  },
  {
    id: '2',
    position: { x: 100, y: 150 },
    data: { 
      label: 'ML Model Selection',
      confidence: 0.85,
      details: 'Evaluating machine learning models',
      alternatives: ['Neural Network', 'Random Forest'],
      tool: {
        name: 'Model Registry',
        type: 'API',
        metrics: { duration: '120ms', calls: 1 }
      }
    },
    type: 'custom'
  },
  {
    id: '3',
    position: { x: 400, y: 150 },
    data: { 
      label: 'Data Preprocessing',
      confidence: 0.7,
      details: 'Cleaning and normalizing input data',
      alternatives: ['Skip preprocessing'],
      tool: {
        name: 'Data Cleaner',
        type: 'LLM',
        metrics: { duration: '80ms', records: 500 }
      }
    },
    type: 'custom'
  },
  {
    id: '4',
    position: { x: 100, y: 300 },
    data: { 
      label: 'Prediction',
      confidence: 0.9,
      details: 'Running model inference',
      alternatives: ['Manual estimation'],
      tool: {
        name: 'ML Inference Engine',
        type: 'API',
        metrics: {
          duration: '200ms',
          accuracy: '92%'
        }
      }
    },
    type: 'custom'
  },
  {
    id: '5',
    position: { x: 400, y: 300 },
    data: { 
      label: 'Postprocessing',
      confidence: 0.8,
      details: 'Formatting results for output',
      alternatives: ['Raw output'],
      tool: {
        name: 'Formatter',
        type: 'Calculator',
        metrics: {
          duration: '50ms'
        }
      }
    },
    type: 'custom'
  },
  {
    id: '6',
    position: { x: 250, y: 450 },
    data: { 
      label: 'Final Output',
      confidence: 1.0,
      details: 'Returning final response to user',
      alternatives: ['Intermediate output']
    },
    type: 'custom'
  }
];

export const agentEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3', animated: true },
  { id: 'e2-4', source: '2', target: '4', animated: true },
  { id: 'e3-5', source: '3', target: '5', animated: true },
  { id: 'e4-6', source: '4', target: '6', animated: true },
  { id: 'e5-6', source: '5', target: '6', animated: true }
];

export {};
