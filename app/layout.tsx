import type { Metadata } from "next";
import { Roboto_Serif } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { NextAuthProvider } from "@/providers/session-provider";
import { GlobalStoreProvider } from "@/providers/store-provider";
import { Toaster } from "sonner";


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
        <GlobalStoreProvider>
          <Toaster position="bottom-left" />
          <NextAuthProvider>
            <div className="max-w-screen-2xl mx-auto suppressHydrationWarning={true}">
              {children}
            </div>
          </NextAuthProvider>
        </GlobalStoreProvider>
      </body>
    </html>
  );
}
