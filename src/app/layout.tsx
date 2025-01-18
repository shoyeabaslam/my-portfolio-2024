import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Shoyeab's Portfolio - Full Stack Developer & Designer",
  description: "Welcome to Shoyeab's professional portfolio. Explore projects, skills, and experience in full stack development and design. Let's build something amazing together!",
  keywords: "Shoyeab, Portfolio, Full Stack Developer, Designer, Projects, Skills, Experience",
  authors: [{ name: "shoyeab" }],
  openGraph: {
    title: "Shoyeab's Portfolio - Full Stack Developer & Designer",
    description: "Welcome to Shoyeab's professional portfolio. Explore projects, skills, and experience in full stack development and design. Let's build something amazing together!",
    type: "website",
    url: "https://shoyeab.vercel.app/",
    images: [
      {
        url: "https://shoyeab.vercel.app/og-image.jpg",
        width: 800,
        height: 600,
        alt: "Shoyeab's Portfolio",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
