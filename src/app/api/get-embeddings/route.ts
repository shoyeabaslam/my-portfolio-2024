import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const url = 'https://api.voyageai.com/v1/embeddings';
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_VOYAGE_API_TOKEN}`
    };

    try {
        const body = await req.json();
        const data = {
            input: body.input,
            model: "voyage-3-lite"
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error fetching embeddings:', errorData);
            return NextResponse.json({ error: errorData }, { status: response.status });
        }

        const responseData = await response.json();
        return NextResponse.json(responseData);
    } catch (error) {
        console.error('Unexpected error:', error);
        return NextResponse.json({ error: 'Unexpected error occurred' }, { status: 500 });
    }
}
