import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();

    // Safely extract JSON content
    let jsonString = text;
    if (text.startsWith("```json")) {
      jsonString = text.replace(/^```json/, "").replace(/```$/, "").trim();
    } else if (text.startsWith("```")) {
      jsonString = text.replace(/^```/, "").replace(/```$/, "").trim();
    }

    const parsed = JSON.parse(jsonString);

    // Ensure we always return a bullets array, even if empty
    const bullets = Array.isArray(parsed) ? parsed : 
                   parsed.bullets ? parsed.bullets : 
                   parsed.summary ? [parsed.summary] : 
                   [];

    return NextResponse.json({ bullets });
  } catch (error: any) {
    console.error("Gemini Error:", error.message || error);
    return NextResponse.json(
      { error: "Failed to generate content", details: error.message },
      { status: 500 }
    );
  }
}