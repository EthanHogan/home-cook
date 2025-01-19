// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration
import {
  type InferInsertModel,
  type InferSelectModel,
  relations,
  sql,
} from "drizzle-orm";
import {
  decimal,
  index,
  integer,
  pgEnum,
  pgTableCreator,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
const tablePrefix = "home-cook";
export const createTable = pgTableCreator((name) => `${tablePrefix}_${name}`);

// Table recipes {
//   id integer [primary key]
//   title varchar
//   description varchar
//   servings_desc varchar
//   cooktime_minutes int
//   user_id integer
//   created_at timestamp
//   updated_at timestamp
// }

export const recipes = createTable(
  "recipes",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    uuid: uuid().defaultRandom(),
    title: varchar("title", { length: 256 }).notNull(),
    description: varchar("description", { length: 280 }).notNull(),
    servings_desc: varchar("servings_desc", { length: 280 }).notNull(),
    cooktime_minutes: integer("cooktime_minutes").notNull(),
    user_id: varchar("user_id", { length: 256 }).notNull(),
    created_at: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (recipe) => [index(`${tablePrefix}-recipes-user_id-idx`).on(recipe.user_id)],
);

export const recipesRelations = relations(recipes, ({ many }) => ({
  recipe_tags: many(recipe_tags),
  ingredient_category: many(ingredient_category),
}));

export const recipesSelectSchema = createSelectSchema(recipes);
export const recipesInsertSchema = createInsertSchema(recipes);
export type Recipe = InferSelectModel<typeof recipes>;
export type NewRecipe = InferInsertModel<typeof recipes>;

// Table recipe_tags {
//   id integer [primary key]
//   tag_id integer [ref: - tags.id]
//   recipe_id integer [ref: - recipes.id]
// }

export const recipe_tags = createTable(
  "recipe_tags",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    tag_id: integer("tag_id").notNull(),
    recipe_id: integer("recipe_id").notNull(),
  },
  (recipe_tag) => [
    index(`${tablePrefix}-recipe_tags-tag_id-idx`).on(recipe_tag.tag_id),
    index(`${tablePrefix}-recipe_tags-recipe_id-idx`).on(recipe_tag.recipe_id),
  ],
);

export const recipe_tagsRelations = relations(recipe_tags, ({ one }) => ({
  recipe: one(recipes, {
    fields: [recipe_tags.recipe_id],
    references: [recipes.id],
  }),
  tag: one(tags, {
    fields: [recipe_tags.tag_id],
    references: [tags.id],
  }),
}));

export const recipe_tagsSelectSchema = createSelectSchema(recipe_tags);
export const recipe_tagsInsertSchema = createInsertSchema(recipe_tags);
export type RecipeTag = InferSelectModel<typeof recipe_tags>;
export type NewRecipeTag = InferInsertModel<typeof recipe_tags>;

// Table ingredient_tags {
//   id integer [primary key]
//   tag_id integer [ref: - tags.id]
//   ingredient_id integer [ref: - ingredients.id]
// }

export const ingredient_tags = createTable(
  "ingredient_tags",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    tag_id: integer("tag_id").notNull(),
    ingredient_id: integer("ingredient_id").notNull(),
  },
  (ingredient_tag) => [
    index(`${tablePrefix}-ingredient_tags-tag_id-idx`).on(
      ingredient_tag.tag_id,
    ),
    index(`${tablePrefix}-ingredient_tags-ingredient_id-idx`).on(
      ingredient_tag.ingredient_id,
    ),
  ],
);

export const ingredient_tagsRelations = relations(
  ingredient_tags,
  ({ one }) => ({
    ingredient: one(ingredients, {
      fields: [ingredient_tags.ingredient_id],
      references: [ingredients.id],
    }),
    tag: one(tags, {
      fields: [ingredient_tags.tag_id],
      references: [tags.id],
    }),
  }),
);

export const ingredient_tagsSelectSchema = createSelectSchema(ingredient_tags);
export const ingredient_tagsInsertSchema = createInsertSchema(ingredient_tags);
export type IngredientTag = InferSelectModel<typeof ingredient_tags>;
export type NewIngredientTag = InferInsertModel<typeof ingredient_tags>;

// Table tags {
//   id integer [primary key]
//   tag_type enum [note: '"Recipe" | "Ingredient"']
//   tag_color enum [note: '"slate" | "red" | etc..']
// }
export const tag_typeEnum = pgEnum(`${tablePrefix}-tag_type`, [
  "Recipe",
  "Ingredient",
]);
export const tag_colorEnum = pgEnum(`${tablePrefix}-tag_color`, [
  "slate",
  "red",
  "yellow",
]);

export const tags = createTable("tags", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  tag_type: tag_typeEnum().notNull(),
  tag_color: tag_colorEnum().notNull(),
  tag_value: varchar("tag_value", { length: 30 }).notNull(),
  user_id: varchar("user_id", { length: 256 }).notNull(),
});

export const tagsRelations = relations(tags, ({ many }) => ({
  recipe_tags: many(recipe_tags),
  ingredient_tags: many(ingredient_tags),
}));

export const tagsSelectSchema = createSelectSchema(tags);
export const tagsInsertSchema = createInsertSchema(tags);
export type Tag = InferSelectModel<typeof tags>;
export type NewTag = InferInsertModel<typeof tags>;

// Table ingredient_category {
//   id integer [primary key]
//   name varchar
//   recipe_id integer
// }

export const ingredient_category = createTable(
  "ingredient_category",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    name: varchar("name", { length: 256 }).notNull(),
    recipe_id: integer("recipe_id").notNull(),
  },
  (category) => [
    index(`${tablePrefix}-ingredient_category-recipe_id-idx`).on(
      category.recipe_id,
    ),
  ],
);

export const ingredient_categoryRelations = relations(
  ingredient_category,
  ({ one }) => ({
    recipe: one(recipes, {
      fields: [ingredient_category.recipe_id],
      references: [recipes.id],
    }),
  }),
);

export const ingredient_categorySelectSchema =
  createSelectSchema(ingredient_category);
export const ingredient_categoryInsertSchema =
  createInsertSchema(ingredient_category);
export type IngredientCategory = InferSelectModel<typeof ingredient_category>;
export type NewIngredientCategory = InferInsertModel<
  typeof ingredient_category
>;

// Table ingredients {
//   id integer [primary key]
//   name varchar
//   measurement decimal [null]
//   unit enum [null, note: '"g" | "cup" | "lb" | "oz" | "tbs" | "tbps" | "clove"']
//   custom_unit varchar [null]
//   // measurement, unit, or custom_unit required
//   // cant have unit and custom_unit both not null
//   category_id integer
// }

export const unitEnum = pgEnum(`${tablePrefix}-unit`, [
  "g",
  "cup",
  "lb",
  "oz",
  "tbs",
  "tbps",
  "clove",
  "slice",
]);

export const ingredients = createTable(
  "ingredients",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    name: varchar("name", { length: 256 }).notNull(),
    measurement: decimal("measurement"),
    unit: unitEnum(),
    custom_unit: varchar("custom_unit", { length: 256 }),
    category_id: integer("category_id").notNull(),
  },
  (ingredient) => [
    index(`${tablePrefix}-ingredients-category_id-idx`).on(
      ingredient.category_id,
    ),
  ],
);

export const ingredientsRelations = relations(ingredients, ({ one, many }) => ({
  category: one(ingredient_category, {
    fields: [ingredients.category_id],
    references: [ingredient_category.id],
  }),
  tags: many(ingredient_tags),
}));

export const ingredientsSelectSchema = createSelectSchema(ingredients);
export const ingredientsInsertSchema = createInsertSchema(ingredients);
export type Ingredient = InferSelectModel<typeof ingredients>;
export type NewIngredient = InferInsertModel<typeof ingredients>;
