const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ["cvfyonwmzwficojeslnn.supabase.co"],
    },
    env: {
        NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
        NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
        NEXT_PUBLIC_VOYAGE_API_TOKEN: process.env.NEXT_PUBLIC_VOYAGE_API_TOKEN,
        NEXT_PUBLIC_GEMINI_API_KEY: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
        NEXT_PUBLIC_GMAIL_USER: process.env.NEXT_PUBLIC_GMAIL_USER,
        NEXT_PUBLIC_GMAIL_PASS: process.env.NEXT_PUBLIC_GMAIL_PASS,
    },
};

module.exports = nextConfig;