import { ExecutionEnvironment } from "@/types/executor";
import { ExtractTextFromElement } from "../task/ExtractTextFromElement";
import * as cheerio from "cheerio";

export async function ExtractTextFromElementExecutor(
  environment: ExecutionEnvironment<typeof ExtractTextFromElement>
): Promise<boolean> {
  try {
    const selector = environment.getInput("Selector");
    if (!selector) {
      return false;
    }
    const html = environment.getInput("Html");
    if (!html) {
      return false;
    }

    const $ = cheerio.load(html);
    const element = $(selector);

    if (!element) {
      console.error("Element not found");
      return false;
    }

    const extractedText = $.text(element);
    if (!extractedText) {
      console.error("Element has no text");
      return false;
    }

    environment.setOutput("Extracted text", extractedText);

    return true;
  } catch (err: any) {
    console.error(err);
    return false;
  }
}
