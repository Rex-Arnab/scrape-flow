import { TaskParamType } from "@/types/task";

export const ColorForHandle: Record<TaskParamType, string> = {
  [TaskParamType.BROWSER_INSTANCE]: "!bg-sky-400",
  [TaskParamType.STRING]: "!bg-amber-400",
  [TaskParamType.NUMBER]: "!bg-blue-400",
  [TaskParamType.SELECT]: "!bg-rose-400",
  [TaskParamType.CREDENTIAL]: "!bg-teal-400"
};
