import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Design is a voice",
  description: "Red line for Palestine",
  openGraph: {
    title: "Design is a voice",
    description: "Red line for Palestine",
    images: [
      {
        url: "/share.png",
        width: 1200,
        height: 630,
        alt: "Design is a voice - Red line for Palestine",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Design is a voice",
    description: "Red line for Palestine",
    images: ["/share.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
