import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import { ArrowLeftRightIcon } from "lucide-react";

export const APITask = {
  type: TaskType.API_TASK,
  label: "Api Request",
  icon: (props) => <ArrowLeftRightIcon className="stoke-blue-400" {...props} />,
  isEntryPoint: false,
  inputs: [
    {
      name: "Target URL",
      type: TaskParamType.STRING,
      hideHandle: true,
      required: true
    },
    {
      name: "Method",
      type: TaskParamType.SELECT,
      options: [
        { label: "GET", value: "GET" },
        { label: "POST", value: "POST" },
        { label: "PUT", value: "PUT" },
        { label: "PATCH", value: "PATCH" },
        { label: "DELETE", value: "DELETE" }
      ],
      hideHandle: true,
      required: true
    },
    {
      name: "Body",
      type: TaskParamType.STRING,
      variant: "textarea",
      required: true
    },
    {
      name: "Body Type",
      type: TaskParamType.SELECT,
      hideHandle: true,
      options: [
        { label: "JSON", value: "JSON" },
        { label: "TEXT", value: "TEXT" }
      ],
      required: true
    }
  ] as const,
  outputs: [] as const,
  credits: 1
} satisfies WorkflowTask;
