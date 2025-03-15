import { ExecutionEnvironment } from "@/types/executor";
import * as cheerio from "cheerio";
import { ExtractAttributeFromElementTask } from "../task/ExtractAttributeFromElement";

export async function ExtractAttributeFromElementExecutor(
  environment: ExecutionEnvironment<typeof ExtractAttributeFromElementTask>
): Promise<boolean> {
  try {
    const selector = environment.getInput("Selector");
    if (!selector) {
      environment.log.error("selector not defined");
      return false;
    }
    const html = environment.getInput("Html");
    if (!html) {
      environment.log.error("html not defined");
      return false;
    }
    const attributeToExtract = environment.getInput("Attribute Name");
    if (!attributeToExtract) {
      environment.log.error("attribute not defined");
      return false;
    }

    const $ = cheerio.load(html);
    const element = $(selector);

    if (!element) {
      environment.log.error("element not found");
      return false;
    }

    const extractedText =
      attributeToExtract.toLowerCase() === "text"
        ? element.text()
        : element.attr(attributeToExtract);
    if (!extractedText) {
      environment.log.error("element has no text");
      return false;
    }

    environment.setOutput("Extracted data", extractedText);

    return true;
  } catch (err: any) {
    environment.log.error(err.meesage);
    console.error(err);
    return false;
  }
}
