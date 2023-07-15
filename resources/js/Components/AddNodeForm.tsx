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
    <div className="space-y-2">
      <div>
        <InputLabel value="Name" />
        <TextInput name="name" value={name} onChange={(e) => setName(e.currentTarget.value)} />
      </div>
      <div>
        <InputLabel value="Type" />
        <ul className="flex gap-4">
          <li><input type="radio" name="type" value={0} checked={type === 0} onChange={(e) => setType(Number(e.currentTarget.value))} /> Other</li>
          <li><input type="radio" name="type" value={1} checked={type === 1} onChange={(e) => setType(Number(e.currentTarget.value))} /> Manager</li>
          <li><input type="radio" name="type" value={2} checked={type === 2} onChange={(e) => setType(Number(e.currentTarget.value))} /> Developer</li>
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
