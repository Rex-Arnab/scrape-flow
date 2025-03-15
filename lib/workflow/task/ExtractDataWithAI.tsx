import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import { BrainIcon } from "lucide-react";

export const ExtractDataWithAITask = {
  type: TaskType.EXTRACT_DATA_WITH_AI,
  label: "Extract data with AI",
  icon: (props) => <BrainIcon className="stoke-rose-400" {...props} />,
  isEntryPoint: false,
  inputs: [
    {
      name: "Content",
      type: TaskParamType.STRING,
      required: true
    },
    {
      name: "Credentials",
      type: TaskParamType.CREDENTIAL,
      required: true
    },
    {
      name: "Prompt",
      type: TaskParamType.STRING,
      required: true,
      variant: "textarea",
      helperText: "We are using openai"
    }
  ] as const,
  outputs: [
    {
      name: "Extracted data",
      type: TaskParamType.STRING
    }
  ] as const,
  credits: 4
} satisfies WorkflowTask;
