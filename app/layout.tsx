import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono, Roboto } from "next/font/google";
import "./globals.css";
import { ThirdWebProviderWrapper } from "@/components/providers/thirdweb-provider";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Medichain - Your health record in the blockchain",
  description: "Secure medical records on blockchain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jakarta.variable} ${geistMono.variable} ${roboto.variable} antialiased `}
      >
        <ThirdWebProviderWrapper>{children}</ThirdWebProviderWrapper>
      </body>
    </html>
  );
}
