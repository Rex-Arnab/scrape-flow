import { AppNode, AppNodeMissingInputs } from "@/types/appNode";
import { WorkflowExecutionPlan, WorkflowExecutionPlanPhase } from "@/types/workflow";
import { Edge } from "@xyflow/react";
import { TaskRegistry } from "./task/registry";

export enum FlowToExecutionPlanValidationError {
    "NO_ENTRY_POINT",
    "INVALID_INPUTS"
}

type FlowToExecutionPlanType = {
    executionPlan?: WorkflowExecutionPlan;
    error?: {
        type: FlowToExecutionPlanValidationError;
        invalidElements?: AppNodeMissingInputs[]
    }
}
export function FlowToExecutionPlan(
  nodes: AppNode[],
  edges: Edge[]
): FlowToExecutionPlanType {
    const entryPoint = nodes.find(node => TaskRegistry[node.data.type].isEntryPoint)

    if (!entryPoint) {
        return {
            error: {
                type: FlowToExecutionPlanValidationError.NO_ENTRY_POINT
            }
        }
    }

    const inputsWithErrors: AppNodeMissingInputs[] = [];
    const planned = new Set<string>();

    const executionPlan: WorkflowExecutionPlan = [{
        phase: 1,
        nodes: [entryPoint]
    }];

    planned.add(entryPoint.id);
    const enpInvalidInput = getInvalidInputs(entryPoint, edges, planned);
    console.log("ENTRY POINT CHECK: ", enpInvalidInput);
    if (enpInvalidInput.length > 0) {
      inputsWithErrors.push({
        nodeId: entryPoint.id,
        inputs: enpInvalidInput
      });
    }

    for (let phase = 2; phase <= nodes.length &&     planned.size < nodes.length; phase++){
        const nextPhase: WorkflowExecutionPlanPhase = { phase, nodes: [] };
        for (const currentNode of nodes) {
            if (planned.has(currentNode.id)) {
                // already in execution plan
                continue;
            }

             const invalidInputs = getInvalidInputs(
               currentNode,
               edges,
               planned
             );
            if (invalidInputs.length > 0) {
                // find dependencies
                const incomers = getIncomers(currentNode, nodes, edges);
                if (incomers.every(incomer => planned.has(incomer.id))) {
                    console.error("invalid inputs", currentNode.id, invalidInputs);
                    inputsWithErrors.push({
                      nodeId: currentNode.id,
                      inputs: invalidInputs
                    });
                } else {
                    // let's skip this node for now
                    continue;
                }
            }

            nextPhase.nodes.push(currentNode);
        }

        for (const node of nextPhase.nodes) {
            planned.add(node.id);
        }

        executionPlan.push(nextPhase);
    }

    if (inputsWithErrors.length > 0) {
        return {
            error: {
                type: FlowToExecutionPlanValidationError.INVALID_INPUTS,
                invalidElements: inputsWithErrors
            }
        }
    }

    return { executionPlan };
}

function getInvalidInputs(node: AppNode, edges: Edge[], planned: Set<string>) {
    const invalidInputs = [];

    const inputs = TaskRegistry[node.data.type].inputs;

    for (const input of inputs) {
    const inputValue = node.data.inputs[input.name];
    const inputValueProvided = inputValue?.length > 0;

    if (inputValueProvided) {
      // This input has value entered by user
      continue;
    }

    // If value is not provided by user, then check if there is ouput link i.e. this input incoming data from other node

    // Checking all the incoming connections to the node
    const incomingEdges = edges.filter((edge) => edge.target === node.id);

    // Checking if input of the incomign node is connected to the current input
    const inputLinkedToOutput = incomingEdges.find(
      (edge) => edge.targetHandle === input.name
    );

    const requiredInputProvidedbyVisitedOutput =
      input.required &&
      inputLinkedToOutput &&
      planned.has(inputLinkedToOutput.source);

    if (requiredInputProvidedbyVisitedOutput) {
      // The input is required and value is provided by the task that is already planned
      continue;
    } else if (!input.required) {
      // If the input is not required but there is output linked to it.

      // Then checking the output is already planned i.e the output doesn't depends on this input
      if (!inputLinkedToOutput) continue;

      if (inputLinkedToOutput && planned.has(inputLinkedToOutput.source)) {
        // The output is providing a value to input.
        continue;
      }
    }
    invalidInputs.push(input.name);
  }
  return invalidInputs;
}

function getIncomers(node: AppNode, nodes: AppNode[], edges: Edge[]) {
  if (!node.id) {
    return [];
  }

  const incomersIds = new Set();
  edges.forEach((edge) => {
    if (edge.target === node.id) {
      incomersIds.add(edge.source);
    }
  });

  return nodes.filter((n) => incomersIds.has(n.id));
}