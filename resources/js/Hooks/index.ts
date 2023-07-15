import axios from "axios";
import { CreateNodeRequest, Node } from "@/types";

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

  return {
    fetchRoots,
    fetchNode,
    addNode,
  };
}
