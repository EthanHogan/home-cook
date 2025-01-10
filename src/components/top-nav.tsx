import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Suspense } from "react";
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
              <Link
                href="/my-cookbook"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-primary"
              >
                My Cookbook
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ModeToggle />
            {/* THIS IS CAUSING EVERY PAGE TO BE DYNAMIC, may need to enable PPR */}
            <Suspense>
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </Suspense>
          </div>
        </div>
      </div>
    </nav>
  );
}
