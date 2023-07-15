import { useEffect, useState } from "react";
import { useNodes } from "@/Hooks";
import { Node } from "@/types";
import TreeItem from "./TreeItem";

export default function() {
  const { fetchRoots } = useNodes();
  const [roots, setRoots] = useState<Node[]>();

  useEffect(() => {
    fetchRoots().then((roots) => {
      setRoots(roots)
    });
  }, []);

  return roots && (
    <ul>
      {roots.map((node: Node) => <TreeItem key={node.id} node={node} />)}
    </ul>
  );
}
