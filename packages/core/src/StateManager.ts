// packages/core/src/StateManager.ts
import { CanvasState, Node, Link, ID, CanvasEvent } from './types';

export class StateManager {
  private state: CanvasState;
  private subscribers: Set<(event: CanvasEvent) => void> = new Set();

  constructor(initialState?: CanvasState) {
    this.state = initialState || { nodes: [], links: [] };
  }

  // Core Methods
  getState(): CanvasState {
    return this.state;
  }

  addNode(node: Node): void {
    this.state.nodes.push(node);
    this.emit({ type: 'node:created', node });
  }

  getNode(id: ID): Node | undefined {
    return this.state.nodes.find(node => node.id === id);
  }

  updateNode(id: ID, updates: Partial<Omit<Node, 'id'>>): void {
    const index = this.state.nodes.findIndex(node => node.id === id);
    if (index !== -1) {
      this.state.nodes[index] = { ...this.state.nodes[index], ...updates };
      this.emit({ type: 'node:updated', node: this.state.nodes[index] });
    }
  }

  addLink(link: Link): void {
    // Basic validation: check if source and target nodes exist
    if (this.getNode(link.sourceNodeId) && this.getNode(link.targetNodeId)) {
      this.state.links.push(link);
      this.emit({ type: 'link:created', link });
    }
  }

  // Event System: So other parts of the app can react to changes
  subscribe(callback: (event: CanvasEvent) => void): () => void {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback); // Return an unsubscribe function
  }

  private emit(event: CanvasEvent): void {
    this.subscribers.forEach(callback => callback(event));
  }

  // Serialization (to be implemented next)
  toJSON(): string {
    return JSON.stringify(this.state);
  }

  loadFromJSON(json: string): void {
    this.state = JSON.parse(json);
    // TODO: Emit events for the entire loaded state?
  }
}
