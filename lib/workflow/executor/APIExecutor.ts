import { ExecutionEnvironment } from "@/types/executor";
import { APITask } from "../task/API";

export async function APIExecutor(
  environment: ExecutionEnvironment<typeof APITask>
): Promise<boolean> {
  try {
    const targetUrl = environment.getInput("Target URL");
    if (!targetUrl) {
      environment.log.error("targetUrl not defined");
    }
    const method = environment.getInput("Method");
    if (!method) {
      environment.log.error("method not defined");
    }
    const body = environment.getInput("Body");
    if (!body) {
      environment.log.error("body not defined");
    }
    const bodyType = environment.getInput("Body Type");
    if (!bodyType) {
      environment.log.error("bodyType not defined");
    }

    const reqBody =
      bodyType.toUpperCase() === "TEXT" ? body : JSON.stringify(body);
    const resp = await fetch(targetUrl, {
      method,
      headers: {
        "Content-Type": "application/json"
      },
      body: reqBody
    });

    const statusCode = resp.status;
    if (statusCode !== 200) {
      environment.log.error(`status code: ${statusCode}`);
      return false;
    }

    const responseBody = await resp.json();
    environment.log.info(responseBody.data);
    return true;
  } catch (err: any) {
    environment.log.error(err.meesage);
    return false;
  }
}
