// packages/core/src/types.ts

// A unique identifier
export type ID = string;

// The fundamental building block placed on the canvas
export interface Node {
  id: ID;
  type: string; // e.g., 'component', 'ui_element', 'process_step', 'archimate_node'
  x: number;    // position on the infinite plane
  y: number;
  width?: number; // optional dimensions
  height?: number;
  data?: Record<string, any>; // This is the crucial part: any project-specific data
}

// A connection between two nodes
export interface Link {
  id: ID;
  sourceNodeId: ID; // The ID of the node where the link starts
  targetNodeId: ID; // The ID of the node where the link ends
  data?: Record<string, any>; // e.g., { semanticType: 'triggers', 'type': 'data_flow' }
}

// The entire state of the canvas
export interface CanvasState {
  nodes: Node[];
  links: Link[];
  // We can add viewport transformation later (panX, panY, zoom)
}

// The type for the event system we'll build
export type CanvasEvent =
  | { type: 'node:created'; node: Node }
  | { type: 'node:updated'; node: Node }
  | { type: 'node:deleted'; nodeId: ID }
  | { type: 'link:created'; link: Link }
  | { type: 'link:deleted'; linkId: ID };
