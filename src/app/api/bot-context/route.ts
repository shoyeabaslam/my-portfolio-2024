import axios from "axios";
import supabase from '@/lib/supabase';
import { NextResponse } from "next/server";
import { cookies } from 'next/headers';

interface EmbeddingResponse {
    embedding: number[];
}

// Handler for POST requests
export async function POST(req: Request) {
    // Retrieve cookies from the request
    const cookieStore = await cookies();
    // Get the 'supabase_session' token from cookies
    const token = cookieStore.get('supabase_session');

    // If no token is found, return an unauthorized response
    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify the token with Supabase to get the user
    const { data: { user }, error } = await supabase.auth.getUser(token.value);

    // If there's an error or no user is found, return an unauthorized response
    if (error || !user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Define the URL and headers for the external API request
    const url = 'https://api.voyageai.com/v1/embeddings';
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_VOYAGE_API_TOKEN}`
    };

    try {
        // Parse the request body to get context details
        const { context_type, context_name, context_description } = await req.json();

        // If any of the required fields are missing, return a bad request response
        if (!context_type || !context_name || !context_description) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        // Construct the full context string
        const fullContext = `${context_type}: ${context_name} - ${context_description}`;
        const data = {
            input: [fullContext],
            model: "voyage-3-lite"
        };

        // Make a POST request to the external API to get embeddings
        const response = await axios.post(url, data, { headers });


        const embeddings = response.data.data.map((d: EmbeddingResponse) => d.embedding);

        // If no embeddings are returned, return an error response
        if (!embeddings || embeddings.length === 0) {
            return NextResponse.json({ error: 'Failed to generate embeddings' }, { status: 500 });
        }

        // Insert the context and embeddings into the Supabase database
        const { data: supabaseData, error: supabaseError } = await supabase
            .from('Chatbot_Context')
            .insert({
                context_type,
                context_name,
                context_description,
                context_embeddings: embeddings[0]
            });

        // If there's an error inserting into the database, return an error response
        if (supabaseError) {
            return NextResponse.json({ error: supabaseError }, { status: 500 });
        }

        // Return a success response with the inserted context data
        return NextResponse.json({ message: 'Context added successfully', context: supabaseData });
    } catch (error) {
        // Log the error and return an internal server error response
        console.error('Error processing request:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
