import Link from "next/link";
import { connection } from "next/server";
import { getRecipes } from "~/actions/getRecipes";
import RecipeCard from "./RecipeCard";

export default async function RecipeList() {
  await connection();

  const recipes = await getRecipes();

  return (
    <ul className={`flex flex-row flex-wrap items-stretch gap-5`}>
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
