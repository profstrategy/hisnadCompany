import type { Metadata } from "next";
import { Roboto_Serif } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import Navbar from "@/components/reusables/navbar";
import Footer from "@/components/reusables/footer";
import WhatsaapChat from "@/components/reusables/whatsaap-chat";


const roboto = Roboto_Serif({
  subsets: ['latin'],
  variable: '--font-roboto'
})

export const metadata: Metadata = {
  title: "Hisnad Home & Property LTD",
  description: "Invest effortlessly in land and agriculture for better future",
  icons: {
    icon: './logo.png'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <link rel="icon" href={metadata?.icons as string} />
      </head>
      <body
        className={` antialiased ${roboto.variable}`}
      >
        <NextTopLoader showSpinner={false} color="#0f68d8" />
        <Navbar />
        <div className="max-w-screen-2xl mx-auto suppressHydrationWarning={true}">
        {children}
        <Footer />
        <WhatsaapChat />
        </div>
      </body>
    </html>
  );
}
