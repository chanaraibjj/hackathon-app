import type { Metadata } from "next";
import Header from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hackathon Starter",
  description: "120分ハッカソン用スターター",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ja" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Header title="Hackathon Starter" />
        {children}
      </body>
    </html>
  );
}
