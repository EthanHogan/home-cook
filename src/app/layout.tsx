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

export const metadata: Metadata = {
  title: "home-cook",
  description: "Personal project blueprint for user-centric applications.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const HEADER_HEIGHT = "4rem";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${GeistSans.variable}`}
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
                <SidebarInset className="peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4)-var(--header-height)) h-full">
                  <main>
                    <SidebarTrigger />
                    <div className="p-3">{children}</div>
                  </main>
                </SidebarInset>
              </SidebarProvider>
            </TanstackProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

// return (
//   <SidebarProvider>
//       <AppSidebar />
//       <main>
//         <SidebarTrigger />
//         {children}
//       </main>
//     </SidebarProvider>
// )
