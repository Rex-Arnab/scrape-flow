import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import { SendIcon } from "lucide-react";

export const DeliverViaWebhookTask = {
  type: TaskType.DELIVER_VIA_WEBHOOK,
  label: "Deliver via Webhook",
  icon: (props) => <SendIcon className="stoke-blue-400" {...props} />,
  isEntryPoint: false,
  inputs: [
    {
      name: "Target URL",
      type: TaskParamType.STRING,
      hideHandle: true,
      required: true
    },
    {
      name: "Body",
      type: TaskParamType.STRING,
      required: true
    }
  ] as const,
  outputs: [] as const,
  credits: 1
} satisfies WorkflowTask;
