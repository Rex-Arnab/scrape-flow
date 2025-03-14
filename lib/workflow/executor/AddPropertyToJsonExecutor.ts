import { ExecutionEnvironment } from "@/types/executor";
import { AddPropertyToJsonTask } from "../task/AddPropertyToJson";

export async function AddPropertyToJsonExecutor(
  environment: ExecutionEnvironment<typeof AddPropertyToJsonTask>
): Promise<boolean> {
  try {
    const jsonData = environment.getInput("JSON");
    if (!jsonData) {
      environment.log.error("input->JSON not defined");
    }
    const propertyName = environment.getInput("Property name");
    if (!propertyName) {
      environment.log.error("input->propertyName not defined");
    }
    const propertyValue = environment.getInput("Property value");
    if (!propertyValue) {
      environment.log.error("input->propertyValue not defined");
    }

    let json = JSON.parse(jsonData);
    json[propertyName] = propertyValue;

    environment.setOutput("Updated JSON", JSON.stringify(json));
    return true;
  } catch (err: any) {
    environment.log.error(err.meesage);
    return false;
  }
}
