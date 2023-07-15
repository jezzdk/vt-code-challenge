import { useState } from "react";
import { useNodes } from "@/Hooks";
import { CreateNodeRequest, Node } from "@/types";
import { NodeType } from "@/types/enums";
import PrimaryButton from "./PrimaryButton";
import AddNodeForm from "./AddNodeForm";

interface Props {
    node: Node;
}

const TreeItem = (props: Props) => {
    const [children, setChildren] = useState<Node[]>();
    const [showForm, setShowForm] = useState<boolean>();
    const {fetchNode, addNode} = useNodes();

    const fetchChildren = () => {
      fetchNode(props.node.id).then((node: Node) => {
        setChildren(node.children);
      });
    };

    const createChild = (data: CreateNodeRequest) => {
      addNode(props.node, data).then(() => {
        fetchChildren();
      });
    }

    return (
      <li className="border-l-2 border-gray-400 p-4 space-y-4">
        <div>
          <div>Name: {props.node.name}</div>
          {props.node.type === NodeType.Manager && <div>Department: {props.node.info}</div>}
          {props.node.type === NodeType.Developer && <div>Preferred programming language: {props.node.info}</div>}
        </div>

        {props.node.children_count > 0 ? (
          <div>
            {children ? (
              <ul>
                {children.map((child: Node) => (
                    <TreeItem key={child.id} node={child} />
                ))}
              </ul>
            ) : (
              <div className="text-gray-700 italic text-sm">This node has {props.node.children_count} children. <button className="font-semibold hover:text-gray-500 cursor-pointer" onClick={() => fetchChildren()}>Show</button>.</div>
            )}
          </div>
        ) : (
          <div className="text-gray-500 italic text-sm">This node has no children</div>
        )}
        <div>
          {showForm ? (
            <AddNodeForm onSubmit={(data: CreateNodeRequest) => createChild(data)} onCancel={() => setShowForm(false)} />
          ) : (
            <PrimaryButton onClick={() => setShowForm(true)}>Add node here</PrimaryButton>
          )}
        </div>
      </li>
    );
};

export default TreeItem;
