import { auth } from "@clerk/nextjs/server";
import { Trash } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { getRecipes } from "~/actions/getRecipes";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Recipe } from "~/server/db/schema";

export default async function MyCookbookPage() {
  // redirects to sign in if not authenticated
  const { userId } = await auth.protect();

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

export async function RecipeList() {
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

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  const { title, description, servings_desc, cooktime_minutes } = recipe;
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex items-center justify-between">
            <div>{title}</div>
            <div>
              <Trash size={16} />
            </div>
          </div>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div>{servings_desc} servings</div>
        <div>Time: {cooktime_minutes} minutes</div>
      </CardContent>
    </Card>
  );
};
