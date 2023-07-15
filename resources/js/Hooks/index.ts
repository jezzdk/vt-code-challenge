import axios from "axios";
import { CreateNodeRequest, Node, UpdateNodeRequest } from "@/types";

export function useNodes() {
  const fetchRoots = async (): Promise<Node[]> => {
    const response = await axios.get('/api/nodes');
    return response.data;
  }

  const fetchNode = async (id: number): Promise<Node> => {
    const response = await axios.get(`/api/nodes/${id}`);
    return response.data;
  }

  const addNode = async (parent: Node, data: CreateNodeRequest): Promise<Node> => {
    const response = await axios.post(`/api/nodes`, {
      ...data,
      parent_id: parent.id,
      depth: parent.depth + 1,
    });
    return response.data;
  }

  const updateNode = async (node: Node, data: UpdateNodeRequest): Promise<Node> => {
    const response = await axios.patch(`/api/nodes/${node.id}`, data);
    return response.data;
  }

  return {
    fetchRoots,
    fetchNode,
    addNode,
    updateNode,
  };
}
