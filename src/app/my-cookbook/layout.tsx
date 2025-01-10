import { type Metadata } from "next";
import "~/styles/globals.css";

export const metadata: Metadata = {
  title: "My Cookbook",
  description: "List of personal recipes",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function MyCookbookLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="p-2">{children}</div>;
}
