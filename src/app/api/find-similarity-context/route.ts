import axios from "axios";
import { NextResponse } from "next/server";
import supabase from "@/lib/supabase";

export async function POST(req: Request) {
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
    const getEmbeddingsUrl = `${baseURL}/api/get-embeddings`;
    const getEmbeddingsHeaders = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_VOYAGE_API_TOKEN}`
    };
    try {
        const body = await req.json();
        const inputText = body.input;

        let embeddings;
        try {
            const getEmbeddingsResponse = await axios.post(getEmbeddingsUrl, {
                input: inputText
            }, { headers: getEmbeddingsHeaders });

            embeddings = getEmbeddingsResponse.data.data.map((d: { embedding: number[] }) => d.embedding);

        } catch (getEmbeddingsError) {
            console.error('Error fetching embeddings from get-embeddings API:', getEmbeddingsError);
            return NextResponse.json({ error: 'Error fetching embeddings from get-embeddings API' }, { status: 500 });
        }

        if (!embeddings || embeddings.length === 0) {
            return NextResponse.json({ error: 'No embeddings found' }, { status: 404 });
        }

        const { data, error } = await supabase.rpc('find_similar_contexts', {
            embedding: embeddings[0],
            match_threshold: 0.3
        });

        if (error) {
            console.error('Error calling Supabase function:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
