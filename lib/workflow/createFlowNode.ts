import { AppNode } from "@/types/appNode";
import { TaskType } from "@/types/task";
import { v4 as uuid_v4 } from "uuid";

export function CreateFlowNode(
  nodeType: TaskType,
  position?: { x: number; y: number }
): AppNode {
  return {
    id: uuid_v4(),
    type: "FlowScrapeNode",
    dragHandle: ".drag-handle",
    data: {
      type: nodeType,
      inputs: {}
    },
    position: position ?? { x: 0, y: 0 }
  };
}
