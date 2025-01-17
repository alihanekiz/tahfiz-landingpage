import type { Metadata } from "next";
import { Merriweather } from "next/font/google";
import "./globals.css";
import './custom-bootstrap.scss';
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import ClientWrapper from "@/components/component-wrapper";

const merri = Merriweather({ subsets: ['latin'], weight: ["300", "400", "700", "900"]})

export const metadata: Metadata = {
  title: "Tahfiz",
  description: "Hafızlık Merasimi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={merri.className}>
        <ClientWrapper>
          <Nav/>
          <main>
            {children}
          </main>
          <Footer/>
        </ClientWrapper>
      </body>
    </html>
  );
}
