import { NextResponse } from "next/server";

export const POST = async function (request: Request) {
  try {
    const { seriesTitle } = await request.json();

    const res = await fetch("https://api.edenai.run/v2/text/generation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${process.env.EDENAI_KEY}`,
      },
      body: JSON.stringify({
        providers: "cohere",
        text: `Give me a very short review about ${seriesTitle}`,
        temperature: 0.2,
        max_tokens: 250,
      }),
    });

    const data = await res.json();
    const success = data.cohere.status === "success";
    if (!success) {
      throw new Error("Can't retrieve the generated review");
    }
    const reply = data?.cohere?.generated_text;
    return NextResponse.json({ reply });
  } catch (err: unknown) {
    if (err instanceof Error) return NextResponse.json({ error: err.message });
  }
};
