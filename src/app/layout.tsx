import type { Metadata } from "next";
import Header from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "そっけなさプレビュー",
  description:
    "送信前30秒のコミュニケーション改善ツール。あなたの返信が相手の画面でどう見えるかをプレビューします。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ja" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Header title="そっけなさプレビュー" />
        {children}
      </body>
    </html>
  );
}
