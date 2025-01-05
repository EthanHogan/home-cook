import Link from "next/link";
import { getRecipes } from "~/actions/getRecipes";
import RecipeCard from "./RecipeCard";

export default async function RecipeList() {
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
