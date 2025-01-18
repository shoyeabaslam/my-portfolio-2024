import supabase from '@/lib/supabase';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';

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
            name,
            designation,
            feedback,
            image
        } = await req.json();

        if (!name || !designation || !feedback || !image) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        const imageName = `${uuidv4()}.jpeg`;
        const imageBuffer = Buffer.from(image, 'base64');

        const { error: uploadError } = await supabase.storage
            .from('portfolio-assets/testimonial-assets')
            .upload(imageName, imageBuffer, {
                contentType: 'image/jpeg',
                cacheControl: '3600',
                upsert: false
            });

        if (uploadError) {
            return NextResponse.json({ error: uploadError.message }, { status: 500 });
        }

        const { data: publicUrlData } = supabase.storage
            .from('portfolio-assets/testimonial-assets')
            .getPublicUrl(imageName);

        if (!publicUrlData) {
            return NextResponse.json({ error: 'Failed to get public URL' }, { status: 500 });
        }

        const publicUrl = publicUrlData.publicUrl;

        const { data, error } = await supabase
            .from('Testimonials')
            .insert({
                name,
                designation,
                feedback,
                image_url: publicUrl
            })
            .select('id');

        if (error) {
            await supabase.storage
                .from('portfolio-assets/testimonial-assets')
                .remove([imageName]);

            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ message: 'Testimonial added successfully', testimonial: data });
    } catch (error) {
        return NextResponse.json({ error: error || 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const { data, error } = await supabase
            .from('Testimonials')
            .select('*');

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ testimonials: data });
    } catch (error) {
        return NextResponse.json({ error: error || 'Internal Server Error' }, { status: 500 });
    }
}

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
            name,
            designation,
            feedback,
            image
        } = await req.json();

        if (!id || !name || !designation || !feedback) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        let publicUrl;
        if (image) {
            const imageName = `${uuidv4()}.jpeg`;
            const imageBuffer = Buffer.from(image, 'base64');

            const { error: uploadError } = await supabase.storage
                .from('portfolio-assets/testimonial-assets')
                .upload(imageName, imageBuffer, {
                    contentType: 'image/jpeg',
                    cacheControl: '3600',
                    upsert: false
                });

            if (uploadError) {
                return NextResponse.json({ error: uploadError.message }, { status: 500 });
            }

            const { data: publicUrlData } = supabase.storage
                .from('portfolio-assets/testimonial-assets')
                .getPublicUrl(imageName);

            if (!publicUrlData) {
                return NextResponse.json({ error: 'Failed to get public URL' }, { status: 500 });
            }

            publicUrl = publicUrlData.publicUrl;
        }

        const { data, error } = await supabase
            .from('Testimonials')
            .update({
                name,
                designation,
                feedback,
                image_url: publicUrl
            })
            .eq('id', id)
            .select('id');

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ message: 'Testimonial updated successfully', testimonial: data });
    } catch (error) {
        return NextResponse.json({ error: error || 'Internal Server Error' }, { status: 500 });
    }
}

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
            return NextResponse.json({ error: 'Testimonial ID is required' }, { status: 400 });
        }

        const { data: testimonialData, error: fetchError } = await supabase
            .from('Testimonials')
            .select('image_url')
            .eq('id', id)
            .single();

        if (fetchError) {
            return NextResponse.json({ error: fetchError.message }, { status: 500 });
        }

        const imageUrl = testimonialData.image_url;
        const imageName = imageUrl.split('/').pop();

        const { error: deleteError } = await supabase
            .from('Testimonials')
            .delete()
            .eq('id', id);

        if (deleteError) {
            return NextResponse.json({ error: deleteError.message }, { status: 500 });
        }

        if (imageName) {
            await supabase.storage
                .from('portfolio-assets/testimonial-assets')
                .remove([imageName]);
        }

        return NextResponse.json({ message: 'Testimonial deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: error || 'Internal Server Error' }, { status: 500 });
    }
}