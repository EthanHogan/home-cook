import "~/styles/globals.css";
import { type Metadata } from "next";

import { ClerkProvider } from "@clerk/nextjs";
import { GeistSans } from "geist/font/sans";

import { ThemeProvider } from "~/components/theme-provider";
import { TopNav } from "~/components/top-nav";
import TanstackProvider from "~/components/TanstackProvider";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "~/components/ui/sidebar";
import { AppSidebar } from "~/components/app-sidebar";
import { ScrollArea } from "~/components/ui/scroll-area";

export const metadata: Metadata = {
  title: "home-cook",
  description: "Personal project blueprint for user-centric applications.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const HEADER_HEIGHT = "4rem";

export default function RootLayout({
  children,
  breadcrumbs,
}: Readonly<{
  children: React.ReactNode;
  breadcrumbs: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${GeistSans.variable} overflow-hidden antialiased`}
        suppressHydrationWarning
      >
        <body
          style={
            {
              "--header-height": HEADER_HEIGHT,
            } as React.CSSProperties
          }
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TanstackProvider>
              <TopNav />
              <SidebarProvider>
                <AppSidebar />
                <SidebarInset className="h-full peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4)-var(--header-height))]">
                  <header className="flex h-10 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger />
                    {breadcrumbs}
                  </header>
                  <ScrollArea className="h-[calc(100svh+theme(spacing.2)-(var(--header-height)*2))] px-3">
                    {children}
                  </ScrollArea>
                </SidebarInset>
              </SidebarProvider>
            </TanstackProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
