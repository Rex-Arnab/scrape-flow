import { ExecutionEnvironment } from "@/types/executor";
import { DeliverViaWebhookTask } from "../task/DeliverViaWebhook";

export async function DeliverViaWebhookExecutor(
  environment: ExecutionEnvironment<typeof DeliverViaWebhookTask>
): Promise<boolean> {
  try {
    const targetUrl = environment.getInput("Target URL");
    if (!targetUrl) {
      environment.log.error("targetUrl not defined");
    }
    const body = environment.getInput("Body");
    if (!body) {
      environment.log.error("body not defined");
    }

    const resp = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    const statusCode = resp.status;
    if (statusCode !== 200) {
      environment.log.error(`status code: ${statusCode}`);
      return false;
    }

    const responseBody = await resp.json();
    // environment.log.info(JSON.stringify(responseBody, null, 4));
    environment.log.info(responseBody.data);
    return true;

    return true;
  } catch (err: any) {
    environment.log.error(err.meesage);
    return false;
  }
}
