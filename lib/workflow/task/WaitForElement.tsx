import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import { EyeIcon } from "lucide-react";

export const WaitForElementTask = {
  type: TaskType.WAIT_FOR_ELEMENT,
  label: "Wait for element",
  icon: (props) => <EyeIcon className="stoke-amber-400" {...props} />,
  isEntryPoint: false,
  inputs: [
    {
      name: "Web page",
      type: TaskParamType.BROWSER_INSTANCE,
      required: true
    },
    {
      name: "Selector",
      type: TaskParamType.STRING,
      required: true
    },
    {
      name: "Visibility",
      type: TaskParamType.SELECT,
      hideHandle: true,
      options: [
        { label: "Visible", value: "visible" },
        { label: "Hidden", value: "hidden" }
      ],
      required: true
    }
  ] as const,
  outputs: [
    {
      name: "Web Page",
      type: TaskParamType.BROWSER_INSTANCE
    }
  ] as const,
  credits: 1
} satisfies WorkflowTask;
