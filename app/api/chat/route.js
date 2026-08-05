import { Mistral } from "@mistralai/mistralai";
import aarizeKnowledge from "@/data/aarize-knowledge";

const client = new Mistral({
  apiKey: "UDJCZkHTW74vmpEbbQrjqNjeOAv86IA3",
});

const SYSTEM_PROMPT = `You are "Aarize Assistant", the official AI-powered digital assistant for Aarize Group — a leading real estate developer in Gurugram (Gurgaon), Delhi-NCR, India.

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
7. Be conversational but always maintain professionalism befitting a premium real estate brand

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

    // Build the conversation with system prompt
    const conversationMessages = [
      { role: "system", content: SYSTEM_PROMPT },
    ];

    // Add user info context if provided
    if (userInfo && (userInfo.name || userInfo.email || userInfo.phone)) {
      conversationMessages.push({
        role: "system",
        content: `The user has shared their details: Name: ${userInfo.name || "Not provided"}, Email: ${userInfo.email || "Not provided"}, Phone: ${userInfo.phone || "Not provided"}. You may use their name to personalize responses.`,
      });
    }

    // Add conversation history
    conversationMessages.push(...messages);

    // Stream response from Mistral
    const stream = await client.chat.stream({
      model: "mistral-medium-latest",
      messages: conversationMessages,
      temperature: 0.7,
      maxTokens: 1024,
    });

    // Create a ReadableStream to stream tokens to the client
    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            const content = event.data?.choices?.[0]?.delta?.content;
            if (content) {
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ content })}\n\n`)
              );
            }
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (err) {
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
    console.error("Mistral API Error:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to get response from AI. Please try again.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
