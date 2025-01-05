"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "~/server/db";

export async function getRecipes() {
  // check if user is authenticated
  // const { userId } = await auth();

  // if (!userId) {
  //   throw new Error("Not authorized");
  // }
  const recipes = await db.query.recipes.findMany({
    orderBy: (model, { asc }) => asc(model.title),
  });

  return recipes;
}
