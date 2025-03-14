import { ExecutionEnvironment } from "@/types/executor";
import { NavigateUrlTask } from "../task/NavigateUrl";

export async function NavigateUrlExecutor(
  environment: ExecutionEnvironment<typeof NavigateUrlTask>
): Promise<boolean> {
  try {
    const url = environment.getInput("URL");
    if (!url) {
      environment.log.error("input->url not defined");
    }

    await environment.getPage()!.goto(url);
    environment.log.info(`visited ${url}`);

    return true;
  } catch (err: any) {
    environment.log.error(err.meesage);
    return false;
  }
}
