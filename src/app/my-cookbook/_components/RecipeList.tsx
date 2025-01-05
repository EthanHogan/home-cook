import Link from "next/link";
import { getRecipes } from "~/actions/getRecipes";
import RecipeCard from "./RecipeCard";
import { auth } from "@clerk/nextjs/server";
import { connection } from "next/server";

export default async function RecipeList() {
  await connection();
  // redirects to sign in if not authenticated
  await auth.protect();

  const recipes = await getRecipes();

  return (
    <ul className={`flex flex-row flex-wrap gap-5`}>
      {[
        ...recipes,
        ...recipes,
        ...recipes,
        ...recipes,
        ...recipes,
        ...recipes,
        ...recipes,
        ...recipes,
        ...recipes,
        ...recipes,
        ...recipes,
        ...recipes,
        ...recipes,
        ...recipes,
        ...recipes,
      ].map((recipe, i) => (
        <li key={recipe.id + i + recipe.title} className="w-64">
          <Link href={`#`}>
            <RecipeCard recipe={recipe} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
