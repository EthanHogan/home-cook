import { type Metadata } from "next";
import "~/styles/globals.css";

export const metadata: Metadata = {
  title: "Static page",
  description: "List of personal recipes",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function StaticLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="p-2">{children}</div>;
}
