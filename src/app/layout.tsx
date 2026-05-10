import "@/styles/globals.css";
import { Space_Grotesk } from "next/font/google";
import { Providers } from "@/lib/providers";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className={`${spaceGrotesk.className} min-h-full flex flex-col`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
