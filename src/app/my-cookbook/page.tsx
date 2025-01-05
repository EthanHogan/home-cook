import { Suspense } from "react";
import RecipeList from "./_components/RecipeList";

export default function MyCookbookPage() {
  return (
    <div className="flex flex-col gap-2">
      <div className="container">
        <h1 className="text-5xl font-bold">My Cookbook</h1>
        <em>List of personal recipes</em>
      </div>

      <div className="container">
        <Suspense fallback={<div>Loading...</div>}>
          <RecipeList />
        </Suspense>
      </div>
    </div>
  );
}
