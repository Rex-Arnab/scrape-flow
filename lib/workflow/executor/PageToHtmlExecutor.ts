import { ExecutionEnvironment } from "@/types/executor";
import { PageToHtmlTask } from "../task/PageToHtml";

export async function PageToHtmlExecutor(
  environment: ExecutionEnvironment<typeof PageToHtmlTask>
): Promise<boolean> {
  try {
    const html = await environment.getPage()!.content();
    const bodyContent = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] || "";
    const wrappedHtml = `<html><body>${bodyContent}</body></html>`;
    environment.setOutput("Html", wrappedHtml);
    // environment.setOutput("Html", html);
    return true;
  } catch (err: any) {
    environment.log.error(err.meesage);
    return false;
  }
}
