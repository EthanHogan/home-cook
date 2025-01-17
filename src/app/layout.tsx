import { ClerkProvider } from "@clerk/nextjs";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import TanstackProvider from "~/components/TanstackProvider";
import { AppSidebar } from "~/components/app-sidebar";
import { ThemeProvider } from "~/components/theme-provider";
import { TopNav } from "~/components/top-nav";
import { ScrollArea } from "~/components/ui/scroll-area";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "~/components/ui/sidebar";
import "~/styles/globals.css";

export const metadata: Metadata = {
  title: "home cook",
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
        <head>
          {process.env.NODE_ENV === "development" && (
            <script
              src="https://unpkg.com/react-scan/dist/auto.global.js"
              async
            />
          )}
        </head>
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

/*
 DO NOT DELETE or dynamic tw classes will break
 tag colors

 bg-red-200
 border-red-300
 text-red-500

 bg-slate-200
 border-slate-300
 text-slate-500

 bg-yellow-200
 border-yellow-300
 text-yellow-500
 */
