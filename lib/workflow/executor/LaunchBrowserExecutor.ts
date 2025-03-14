import { ExecutionEnvironment } from "@/types/executor";
import pupeeteer from "puppeteer";
import { LaunchBrowserTask } from "../task/LaunchBrowser";

export async function LaunchBrowserExecutor(
  environment: ExecutionEnvironment<typeof LaunchBrowserTask>
): Promise<boolean> {
  try {
    const websiteUrl = environment.getInput("Website Url");
    const browser = await pupeeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });
    environment.setBrowser(browser);
    environment.log.info("Browser started successfully");
    const page = await browser.newPage();
    page.setViewport({
      width: 2560,
      height: 1440
    });
    page.setUserAgent(
      "Mozilla/5.0 (X11; CrOS x86_64 8172.45.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.64 Safari/537.36"
    );
    await page.goto(websiteUrl);
    environment.setPage(page);
    environment.log.info(`Opened page at: ${websiteUrl}`);
    return true;
  } catch (err: any) {
    environment.log.error(err.meesage);
    console.error(err);
    return false;
  }
}
