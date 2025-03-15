import { ExecutionEnvironment } from "@/types/executor";
import { ExtractDataWithAITask } from "../task/ExtractDataWithAI";
import prisma from "@/lib/primsa";
import { symmetricDecrypt } from "@/lib/encryption";
import OpenAI from "openai";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";

// Keys in JavaScript objects are always strings. This schema validates that every key has a value of type string.
const JsonDataSchema = z.record(z.string());
const DEV_MODE = process.env.DEV_MODE === "true";
const BASE_URL = DEV_MODE
  ? process.env.DEV_MODE_API_URL
  : "https://api.openai.com/v1";
const BASE_MODEL = DEV_MODE ? process.env.DEV_MODE_MODEL! : "gpt-4o-mini";

export async function ExtractDataWithAiExecutor(
  environment: ExecutionEnvironment<typeof ExtractDataWithAITask>
): Promise<boolean> {
  try {
    const userContent = environment.getInput("Content");
    if (!userContent) {
      environment.log.error("input->content not defined");
    }

    const credentials = environment.getInput("Credentials");
    if (!credentials) {
      environment.log.error("input->credentials not defined");
    }

    const prompt = environment.getInput("Prompt");
    if (!prompt) {
      environment.log.error("input->prompt not defined");
    }

    // Get credentials from DB
    const credential = await prisma.credential.findUnique({
      where: { id: credentials }
    });

    if (!credential) {
      environment.log.error("credential not found");
      return false;
    }

    const plainCredentialValue = symmetricDecrypt(credential.value);
    if (!plainCredentialValue) {
      environment.log.error("cannot decrypt credentials");
      return false;
    }

    const openai = new OpenAI({
      apiKey: plainCredentialValue,
      baseURL: BASE_URL
    });

    let response;
    try {
      response = await openai.chat.completions.create({
        model: BASE_MODEL,
        messages: [
          {
            role: "system",
            content:
              "You are a webscraper helper that extracts data from HTML or text. You will be given a piece of text or HTML content as input and also the prompt with the data you have to extract. The response should always be only the extracted data as a JSON object, without any additional words or explanations. Analyze the input carefully and extract data precisely based on the prompt. If no data is found, return an empty JSON array. Work only with the provided content and ensure the output is always a valid JSON array without any surrounding text. do not return markdown just return json. do not assume anything"
          },
          {
            role: "user",
            content: userContent
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 1,
        response_format: zodResponseFormat(JsonDataSchema, "json_data")
      });
    } catch (error: any) {
      console.error(error.message);
      environment.log.error(error.message);
      return false;
    }

    environment.log.info(`Prompt tokens: ${response.usage?.prompt_tokens}`);
    environment.log.info(
      `Completion tokens: ${response.usage?.completion_tokens}`
    );

    const result = response.choices[0].message?.content;

    if (!result) {
      environment.log.error("empty response from AI");
      return false;
    }

    environment.setOutput("Extracted data", result);

    return true;
  } catch (err: any) {
    environment.log.error(err.meesage);
    return false;
  }
}
