import Anthropic from "@anthropic-ai/sdk";
import aarizeKnowledge from "@/data/aarize-knowledge";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
});

const SYSTEM_PROMPT = `You are "AVA" (Aarize Virtual Assistant), the official AI-powered digital assistant for Aarize Group — a leading real estate developer in Gurugram (Gurgaon), Delhi-NCR, India.

## YOUR ROLE
- Answer questions about Aarize Group's projects, services, locations, and company information
- Help potential customers, investors, and visitors explore Aarize's residential, commercial, retail, and township offerings
- Provide accurate, helpful, and professional responses based on the knowledge base provided
- Guide users to the right contact channels when they want to inquire or schedule a visit

## TONE & STYLE
- Professional yet warm and approachable
- Confident and knowledgeable about real estate
- Concise but thorough — don't give overly short or overly long answers
- Use formatting (bold, bullet points) when listing features or comparing options
- Always be helpful and suggest next steps when relevant

## IMPORTANT RULES
1. ONLY answer based on the Aarize knowledge base provided below. Do NOT make up information about pricing, availability, or specific details not in the knowledge base.
2. If asked about pricing, say that pricing details are best discussed with the sales team and provide the contact: +91 9464 700 700 or sales@aarize.in
3. If asked about something not in the knowledge base, politely say you don't have that specific information and suggest contacting Aarize directly
4. Always provide relevant links from the Aarize website when mentioning specific projects or pages
5. When mentioning contact info, always include phone (+91 9464 700 700) and email (sales@aarize.in)
6. For career-related queries, direct to https://www.aarize.in/careers
8. DO NOT use markdown headings (like #, ##, ###, etc.) in your response. Instead, use bold text (e.g. **Heading**) and bullet points to structure your response.
9. Be conversational but always maintain professionalism befitting a premium real estate brand

## AARIZE KNOWLEDGE BASE
${aarizeKnowledge}

Remember: You represent Aarize Group. Be helpful, accurate, and professional at all times.`;

export async function POST(request) {
  try {
    const { messages, userInfo } = await request.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "Messages array is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Build the conversation
    let systemPrompt = SYSTEM_PROMPT;

    // Add user info context if provided
    if (userInfo && (userInfo.name || userInfo.email || userInfo.phone)) {
      systemPrompt += `\n\n## USER INFO CONTEXT\nThe user has shared their details: Name: ${userInfo.name || "Not provided"}, Email: ${userInfo.email || "Not provided"}, Phone: ${userInfo.phone || "Not provided"}. You may use their name to personalize responses.`;
    }

    // Format messages for Anthropic (only keep user and assistant messages, alternate them)
    const formattedMessages = messages.map((m) => ({
      role: m.role,
      content: m.content,
    }));

    // Stream response from Anthropic
    const stream = await client.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 1024,
      system: systemPrompt,
      messages: formattedMessages,
      stream: true,
    });

    // Create a ReadableStream to stream tokens to the client
    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            if (chunk.type === "content_block_delta" && chunk.delta?.text) {
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ content: chunk.delta.text })}\n\n`)
              );
            }
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (err) {
          console.error("Streaming error:", err);
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ error: "Stream error occurred" })}\n\n`
            )
          );
          controller.close();
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Anthropic API Error:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to get response from AI. Please try again.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
