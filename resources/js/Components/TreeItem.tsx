import { useState } from "react";
import { useNodes } from "@/Hooks";
import { CreateNodeRequest, Node, UpdateNodeRequest } from "@/types";
import { NodeType } from "@/types/enums";
import AddNodeForm from "./AddNodeForm";

interface Props {
    node: Node;
}

const TreeItem = (props: Props) => {
    const [children, setChildren] = useState<Node[]>();
    const [showMoveForm, setShowMoveForm] = useState<boolean>();
    const [showAddForm, setShowAddForm] = useState<boolean>();
    const {fetchNode, addNode, updateNode} = useNodes();

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

    const moveNode = (data: UpdateNodeRequest) => {
      updateNode(props.node, data).then(() => top?.location.reload);
    }

    return (
      <li className="border-l-2 border-gray-400 my-4 px-4 space-y-4">
        <div>
          <div>Name: {props.node.name} {props.node.type !== NodeType.Other && `(${NodeType[props.node.type]})`}</div>
          {props.node.type === NodeType.Manager && <div>Department: {props.node.info}</div>}
          {props.node.type === NodeType.Developer && <div>Preferred programming language: {props.node.info}</div>}
        </div>

        <div>
          {props.node.depth > 0 && (
            <div>
              {showMoveForm ? (
                <div>Ran out of time :(</div>
              ) : (
                <button className="font-semibold hover:text-gray-500 cursor-pointer text-sm" onClick={() => setShowMoveForm(true)}>&rarr; Move node</button>
              )}
            </div>
          )}
          <div>
            {showAddForm ? (
              <AddNodeForm onSubmit={(data: CreateNodeRequest) => createChild(data)} onCancel={() => setShowAddForm(false)} />
            ) : (
              <button className="font-semibold hover:text-gray-500 cursor-pointer text-sm" onClick={() => setShowAddForm(true)}>&rarr; Add child node to "{props.node.name}"</button>
            )}
          </div>
          <div>
            {children ? (
              <ul>
                {children.map((child: Node) => (
                    <TreeItem key={child.id} node={child} />
                ))}
              </ul>
            ) : (
              <button className="font-semibold hover:text-gray-500 cursor-pointer text-sm" onClick={() => fetchChildren()}>&rarr; Show child nodes</button>
            )}
          </div>
        </div>
      </li>
    );
};

export default TreeItem;
