import { ChatGroq } from "@langchain/groq";

export const model = new ChatGroq({
  model: "openai/gpt-oss-120b",
  temperature: 0.2,
  apiKey: process.env.GROQ_API_KEY,
  maxRetries: 6,
  maxTokens: 800,
});
