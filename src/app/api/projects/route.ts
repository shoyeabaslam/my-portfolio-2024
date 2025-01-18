import supabase from '@/lib/supabase';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';

// Handler for POST requests
export async function POST(req: Request) {
    const cookieStore = await cookies();
    const token = cookieStore.get('supabase_session');

    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: { user }, error } = await supabase.auth.getUser(token.value);

    if (error || !user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const {
            image,
            project_title,
            project_description,
            technologies_used,
            repo_link,
            site_link,
            tags
        } = await req.json();

        if (!image || !project_title || !project_description || !technologies_used || !repo_link || !site_link || !tags) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        const imageName = `${uuidv4()}.jpeg`;
        const imageBuffer = Buffer.from(image, 'base64');

        const { error: uploadError } = await supabase.storage
            .from('portfolio-assets')
            .upload(imageName, imageBuffer, {
                contentType: 'image/jpeg',
                cacheControl: '3600',
                upsert: false
            });

        if (uploadError) {
            return NextResponse.json({ error: uploadError.message }, { status: 500 });
        }

        const { data: publicUrlData } = supabase.storage
            .from('portfolio-assets')
            .getPublicUrl(imageName);

        if (!publicUrlData) {
            return NextResponse.json({ error: 'Failed to get public URL' }, { status: 500 });
        }

        const publicUrl = publicUrlData.publicUrl;

        const { data, error } = await supabase
            .from('Projects')
            .insert({
                project_title,
                project_description,
                technologies_used,
                repo_link,
                site_link,
                project_image_url: publicUrl,
                tags
            })
            .select('id');

        if (error) {
            await supabase.storage
                .from('portfolio-assets')
                .remove([imageName]);

            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ message: 'Project added successfully', project: data });
    } catch (error) {
        return NextResponse.json({ error: error || 'Internal Server Error' }, { status: 500 });
    }
}

// Handler for GET requests
export async function GET() {
    try {
        const { data, error } = await supabase
            .from('Projects')
            .select('*');

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ projects: data });
    } catch (error) {
        return NextResponse.json({ error: error || 'Internal Server Error' }, { status: 500 });
    }
}

// Handler for PUT requests
export async function PUT(req: Request) {
    const cookieStore = await cookies();
    const token = cookieStore.get('supabase_session');

    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: { user }, error } = await supabase.auth.getUser(token.value);

    if (error || !user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const {
            id,
            image,
            project_title,
            project_description,
            technologies_used,
            repo_link,
            site_link,
            tags
        } = await req.json();

        if (!id || !project_title || !project_description || !technologies_used || !repo_link || !site_link || !tags) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        let publicUrl;
        if (image) {
            const imageName = `${uuidv4()}.jpeg`;
            const imageBuffer = Buffer.from(image, 'base64');

            const { error: uploadError } = await supabase.storage
                .from('portfolio-assets')
                .upload(imageName, imageBuffer, {
                    contentType: 'image/jpeg',
                    cacheControl: '3600',
                    upsert: false
                });

            if (uploadError) {
                return NextResponse.json({ error: uploadError.message }, { status: 500 });
            }

            const { data: publicUrlData } = supabase.storage
                .from('portfolio-assets')
                .getPublicUrl(imageName);

            if (!publicUrlData) {
                return NextResponse.json({ error: 'Failed to get public URL' }, { status: 500 });
            }

            publicUrl = publicUrlData.publicUrl;
        }

        const { data, error } = await supabase
            .from('Projects')
            .update({
                project_title,
                project_description,
                technologies_used,
                repo_link,
                site_link,
                project_image_url: publicUrl,
                tags
            })
            .eq('id', id)
            .select('id');

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ message: 'Project updated successfully', project: data });
    } catch (error) {
        return NextResponse.json({ error: error || 'Internal Server Error' }, { status: 500 });
    }
}

// Handler for DELETE requests
export async function DELETE(req: Request) {
    const cookieStore = await cookies();
    const token = cookieStore.get('supabase_session');

    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: { user }, error } = await supabase.auth.getUser(token.value);

    if (error || !user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { id } = await req.json();

        if (!id) {
            return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
        }

        const { data: projectData, error: fetchError } = await supabase
            .from('Projects')
            .select('project_image_url')
            .eq('id', id)
            .single();

        if (fetchError) {
            return NextResponse.json({ error: fetchError.message }, { status: 500 });
        }

        const imageUrl = projectData.project_image_url;
        const imageName = imageUrl.split('/').pop();

        const { error: deleteError } = await supabase
            .from('Projects')
            .delete()
            .eq('id', id);

        if (deleteError) {
            return NextResponse.json({ error: deleteError.message }, { status: 500 });
        }

        if (imageName) {
            await supabase.storage
                .from('portfolio-assets')
                .remove([imageName]);
        }

        return NextResponse.json({ message: 'Project deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: error || 'Internal Server Error' }, { status: 500 });
    }
}