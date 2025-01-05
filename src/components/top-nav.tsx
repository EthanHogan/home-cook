import Link from "next/link";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

import { ModeToggle } from "./mode-toggle";

export function TopNav() {
  return (
    <nav className="w-full border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[--header-height] justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <Link href="/" className="text-2xl font-bold text-primary">
                home cook
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/static"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-primary"
              >
                Static
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ModeToggle />
            {/* <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn> */}
          </div>
        </div>
      </div>
    </nav>
  );
}
