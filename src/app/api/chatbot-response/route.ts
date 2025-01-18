import { NextResponse } from "next/server";
import { SystemInstruction } from '@/lib/systemInstruction';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: Request) {
    try {
        const { inputText, data } = await req.json();

        const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: 'API key is missing' }, { status: 500 });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: SystemInstruction,
        });

        const generationConfig = {
            temperature: 1,
            topP: 0.95,
            topK: 40,
            maxOutputTokens: 8192,
            responseMimeType: "text/plain",
        };

        const chatSession = model.startChat({
            generationConfig,
            history: [],
        });

        const context = data.map((item: unknown) => JSON.stringify(item));
        const prompt = `Please take into account the following context: "${context}" which is in array format, Based on this context, answer the user's query: "${inputText}" Make sure your response is relevant, concise, and based solely on the provided context. Do not introduce information that is not included in the context.`

        const result = await chatSession.sendMessage(prompt);
        return NextResponse.json(result.response.text());
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}