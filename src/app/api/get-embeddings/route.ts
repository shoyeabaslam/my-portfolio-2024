import axios from "axios";
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
            input: [body.input],
            model: "voyage-3-lite"
        };

        const response = await axios.post(url, data, { headers });
        return NextResponse.json(response.data);
    } catch (error) {
        console.error('Error fetching embeddings:', error);
        return NextResponse.error();
    }
}

/*
To request this endpoint from Postman:

1. Set the request type to POST.
2. Set the URL to http://localhost:3000/api/get-embeddings (adjust the port if necessary).
3. In the Headers tab, add:
   - Key: Content-Type, Value: application/json
   - Key: Authorization, Value: Bearer YOUR_VOYAGE_API_TOKEN
4. In the Body tab, select raw and JSON format, then add the following JSON:
   {
       "input": "your input text here"
   }
5. Send the request.
*/