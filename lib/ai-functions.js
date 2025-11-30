import { clientOpenAI } from "./openai";
import { zodTextFormat } from "openai/helpers/zod";

export const GetAiResponse = async ({ prompt, schema, model = "gpt-5.1" }) => {
  try {
    console.log("Starting...");
    const response = await clientOpenAI.responses.parse({
      model,
      input: [
        {
          role: "user",
          content: prompt,
        },
      ],
      text: {
        format: zodTextFormat(schema, "payload"),
      },
    });

    console.log("Response:", response);
    console.log("Structured Object:", response.output_parsed);

    return response.output_parsed;
  } catch (error) {
    console.error("getStructuredResponse error:", error);
    return {
      success: false,
      error: "AI parsing error",
      data: null,
    };
  }
};
