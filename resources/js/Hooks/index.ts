import axios from "axios";

export function useNodes() {

  const fetchRoots = async () => {
    const response = await axios.get('/api/nodes');
    return response.data;
  }

  const fetchChildren = async (id: number) => {
    const response = await axios.get(`/api/nodes/${id}`);
    return response.data;
  }

  return {
    fetchRoots,
    fetchChildren,
  };
}
