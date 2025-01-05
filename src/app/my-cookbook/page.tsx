import { auth } from "@clerk/nextjs/server";
import { Suspense } from "react";
import RecipeList from "./_components/RecipeList";

export default async function MyCookbookPage() {
  // redirects to sign in if not authenticated
  await auth.protect();

  return (
    <div className="flex flex-col gap-2">
      <div className="container">
        <h1 className="text-5xl font-bold">My Cookbook</h1>
        <em>List of personal recipes</em>
      </div>

      <div className="container">
        <Suspense key={"recipe-list"} fallback={<div>Loading...</div>}>
          <RecipeList />
        </Suspense>
      </div>
    </div>
  );
}
