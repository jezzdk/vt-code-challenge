import { useState } from "react";
import { CreateNodeRequest } from "@/types";
import { NodeType } from "@/types/enums";
import InputLabel from "./InputLabel";
import PrimaryButton from "./PrimaryButton";
import TextInput from "./TextInput";
import SecondaryButton from "./SecondaryButton";

interface Props {
  onSubmit: (data: CreateNodeRequest) => void;
  onCancel: () => void;
}

export default function(props: Props) {
  const [name, setName] = useState<string>('');
  const [type, setType] = useState<NodeType>(0);
  const [info, setInfo] = useState<string>('');

  return (
    <div className="p-2 bg-gray-200 space-y-2">
      <div>
        <InputLabel value="Name" />
        <TextInput name="name" value={name} onChange={(e) => setName(e.currentTarget.value)} />
      </div>
      <div>
        <InputLabel value="Type" />
        <ul className="flex gap-4">
          <li><label><input type="radio" name="type" value={NodeType.Other} checked={type === NodeType.Other} onChange={(e) => setType(Number(e.currentTarget.value))} /> Other</label></li>
          <li><label><input type="radio" name="type" value={NodeType.Manager} checked={type === NodeType.Manager} onChange={(e) => setType(Number(e.currentTarget.value))} /> Manager</label></li>
          <li><label><input type="radio" name="type" value={NodeType.Developer} checked={type === NodeType.Developer} onChange={(e) => setType(Number(e.currentTarget.value))} /> Developer</label></li>
        </ul>
      </div>
      {type !== 0 && (
        <div>
          {type === 1 && <InputLabel value="Department" />}
          {type === 2 && <InputLabel value="Preferred programming language" />}
          <TextInput name="info" value={info} onChange={(e) => setInfo(e.currentTarget.value)} />
        </div>
      )}
      <div className="space-x-4">
        <PrimaryButton onClick={() => props.onSubmit({
          name,
          type,
          info,
        })}>Submit</PrimaryButton>
        <SecondaryButton onClick={() => props.onCancel()}>Cancel</SecondaryButton>
      </div>
    </div>
  );
}
