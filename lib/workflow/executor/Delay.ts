import { ExecutionEnvironment } from "@/types/executor";
import { DelayTask } from "../task/Delay";
import { waitFor } from "@/lib/helper/waitFor";

export async function DelayExecutor(
  environment: ExecutionEnvironment<typeof DelayTask>
): Promise<boolean> {
  try {
    const timeoutInMillesecond = environment.getInput("Time");
    if (!timeoutInMillesecond && Number(timeoutInMillesecond)) {
      environment.log.error("input->time not defined");
    }

    await waitFor(Number(timeoutInMillesecond));
    environment.log.info(
      `waiting for ${Number(timeoutInMillesecond) / 1000} sec`
    );
    return true;
  } catch (err: any) {
    environment.log.error(err.meesage);
    return false;
  }
}
