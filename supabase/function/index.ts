import "https://deno.land/x/xhr@0.3.0/mod.ts";
//@ts-ignore
import { GoogleGenerativeAI } from "npm:@google/generative-ai";
import { Buffer } from "node:buffer";
//@ts-ignore
Deno.serve(async (req) => {
  const body = await req.json();
  if (!body?.query) return new Response("No query provided", { status: 400 });

  const prompt = body?.query;
  //@ts-ignore
  const apiKey = Deno.env.get("API_KEY");

  const genAI = new GoogleGenerativeAI(
    apiKey,
  );

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  let result;

  if (body?.image) {
    let assets = await fetch(
      body?.image,
    ).then((res) => res.arrayBuffer());

    const image = {
      inlineData: {
        data: Buffer.from(assets).toString("base64"),
        mimeType: "image/png",
      },
    };

    result = await model.generateContent([prompt, image]);
  } else {
    result = await model.generateContent([prompt]);
  }

  return new Response(result.response.text(), {
    headers: { "Content-Type": "text/plain" },
  });
});
