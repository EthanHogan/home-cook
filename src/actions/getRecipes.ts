"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "~/server/db";
import type { Recipe, Tag } from "~/server/db/schema";

export type RecipeWithTags = Recipe & {
  tags: Tag[];
};

export async function getRecipes(): Promise<RecipeWithTags[]> {
  // check if user is authenticated
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Not authorized");
  }
  const recipes = await db.query.recipes.findMany({
    with: {
      recipe_tags: {
        with: {
          tag: true,
        },
      },
    },
    orderBy: (model, { asc }) => asc(model.title),
  });

  const result = recipes.map((recipe) => ({
    ...recipe,
    tags: recipe.recipe_tags
      .map((recipeTag) => recipeTag.tag)
      // sort tags alphabetically
      .sort((a, b) => a.tag_value.localeCompare(b.tag_value)),
  }));

  return result;
}
