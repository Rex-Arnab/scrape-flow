import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import { CodeIcon, LucideProps } from "lucide-react";

export const PageToHtmlTask = {
  type: TaskType.PAGE_TO_HTML,
  label: "Get Html from Page",
  icon: (props: LucideProps) => (
    <CodeIcon className="stoke-rose-400" {...props} />
  ),
  isEntryPoint: false,
  inputs: [
    {
      name: "Website Page",
      type: TaskParamType.BROWSER_INSTANCE,
      required: true
    }
  ] as const,
  outputs: [
    {
      name: "Html",
      type: TaskParamType.STRING
    },
    {
      name: "Web page",
      type: TaskParamType.BROWSER_INSTANCE
    }
  ] as const,
  credits: 2
} satisfies WorkflowTask;
