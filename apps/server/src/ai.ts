import { TamboAI } from "@tambo-ai/typescript-sdk/index.js";
import { tools } from "./tools";

// Initialize Tambo client
// Note: This requires TAMBO_API_KEY environment variable
const client = new TamboAI({
  apiKey: process.env.TAMBO_API_KEY,
});

export const aiHandler = async ({ body, set }: any) => {
  const { messages } = body;

  // Simple validation to ensure we have messages
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    set.status = 400;
    return { error: "No messages provided" };
  }

  // Get the last message, assuming it's from the user
  const lastMessage = messages[messages.length - 1];

  // Create a new thread and run for this interaction
  // In a production app, you would likely reuse threadIds for persistence
  try {
    const stream = await client.threads.runs.create({
      message: {
        role: "user",
        // Extract content from the message object
        content: [
          {
            type: "text",
            text:
              typeof lastMessage.content === "string"
                ? lastMessage.content
                : JSON.stringify(lastMessage.content),
          },
        ],
      },
      model: "gemini-1.5-flash",
      tools: tools,
      toolChoice: "auto",
    });

    // Returns the stream directly to the client
    return new Response(stream.toReadableStream(), {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("AI Error:", error);
    set.status = 500;
    return { error: "Failed to process AI request" };
  }
};
