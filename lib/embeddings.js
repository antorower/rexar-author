import { clientOpenAI } from "./openai";

export async function getEmbedding(text) {
  const response = await clientOpenAI.embeddings.create({
    model: "text-embedding-3-small",
    input: text,
  });

  return response.data[0].embedding;
}
