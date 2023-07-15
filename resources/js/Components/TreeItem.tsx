import { useNodes } from "@/Hooks";
import { Node } from "@/types";
import { useState } from "react";
import PrimaryButton from "./PrimaryButton";

interface Props {
    node: Node;
}

const TreeItem = (props: Props) => {
    const [children, setChildren] = useState<Node[]>();

    const {fetchChildren} = useNodes();

    return (
        <li className="border border-gray-400 p-4">
            <div>
                Name: {props.node.name}
            </div>
            <div>
              {props.node.children_count > 0 && (
                <PrimaryButton
                    onClick={() =>
                        fetchChildren(props.node.id).then((node) =>
                            setChildren(node.children)
                        )
                    }
                >
                    Show child nodes
                </PrimaryButton>
              )}
              {children && (
                <ul>
                  {children.map((child: Node) => (
                      <TreeItem key={child.id} node={child} />
                  ))}
                </ul>
              )}
            </div>
        </li>
    );
};

export default TreeItem;
