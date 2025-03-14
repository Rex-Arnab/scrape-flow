import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import { DatabaseIcon } from "lucide-react";

export const AddPropertyToJsonTask = {
  type: TaskType.ADD_PROPERTY_TO_JSON,
  label: "Add property to JSON",
  icon: (props) => <DatabaseIcon className="stoke-orange-400" {...props} />,
  isEntryPoint: false,
  inputs: [
    {
      name: "JSON",
      type: TaskParamType.STRING,
      required: true,
      variant: "textarea"
    },
    {
      name: "Property name",
      type: TaskParamType.STRING,
      required: true
    },
    {
      name: "Property value",
      type: TaskParamType.STRING,
      required: true
    }
  ] as const,
  outputs: [
    {
      name: "Updated JSON",
      type: TaskParamType.STRING
    }
  ] as const,
  credits: 1
} satisfies WorkflowTask;
