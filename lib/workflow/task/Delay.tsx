import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import { ClockIcon } from "lucide-react";

export const DelayTask = {
  type: TaskType.DELAY,
  label: "Wait for seconds",
  icon: (props) => <ClockIcon className="stoke-amber-400" {...props} />,
  isEntryPoint: false,
  inputs: [
    {
      name: "Web page",
      type: TaskParamType.BROWSER_INSTANCE,
      required: true
    },
    {
      name: "Time",
      type: TaskParamType.NUMBER,
      hideHandle: true,
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
