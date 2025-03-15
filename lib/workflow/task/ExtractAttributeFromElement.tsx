import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import { BlocksIcon } from "lucide-react";

export const ExtractAttributeFromElementTask = {
  type: TaskType.EXTRACT_ATTRIBUTE_FROM_ELEMENT,
  label: "Extract attr from element",
  icon: (props) => <BlocksIcon className="stoke-rose-400" {...props} />,
  isEntryPoint: false,
  inputs: [
    {
      name: "Html",
      type: TaskParamType.STRING,
      required: true,
      variant: "textarea"
    },
    {
      name: "Selector",
      type: TaskParamType.STRING,
      required: true
    },
    {
      name: "Attribute Name",
      type: TaskParamType.STRING,
      helperText: "e.g., href, src, title",
      required: true
    }
  ] as const,
  outputs: [
    {
      name: "Extracted data",
      type: TaskParamType.STRING
    }
  ] as const,
  credits: 1
} satisfies WorkflowTask;
