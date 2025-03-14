import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import { FileJson2Icon } from "lucide-react";

export const ReadPropertyFromJsonTask = {
  type: TaskType.READ_PROPERTY_FROM_JSON,
  label: "Read property from JSON",
  icon: (props) => <FileJson2Icon className="stoke-orange-400" {...props} />,
  isEntryPoint: false,
  inputs: [
    {
      name: "JSON",
      type: TaskParamType.STRING,
      required: true
    },
    {
      name: "Property name",
      type: TaskParamType.STRING,
      hideHandle: true,
      required: true
    }
  ] as const,
  outputs: [
    {
      name: "Property value",
      type: TaskParamType.STRING
    }
  ] as const,
  credits: 1
} satisfies WorkflowTask;
