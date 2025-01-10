import type { RecipeWithTags } from "~/actions/getRecipes";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import type { Tag } from "~/server/db/schema";

export default function RecipeCard({ recipe }: { recipe: RecipeWithTags }) {
  const { title, description, servings_desc, cooktime_minutes } = recipe;
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center justify-between">
            <div>{title}</div>
          </div>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div>
          <div>{servings_desc} servings</div>
          <div>Time: {cooktime_minutes} minutes</div>
        </div>
        <div>
          <RecipeTags tags={recipe.tags} />
        </div>
      </CardContent>
    </Card>
  );
}

const RecipeTags = ({ tags }: { tags: Tag[] }) => {
  return (
    <div className="flex flex-row flex-wrap gap-2">
      {tags.map((tag) => (
        <div
          key={tag.id}
          className={`rounded-md bg-${tag.tag_color}-200 px-2 py-0.5 text-${tag.tag_color}-500 border border-${tag.tag_color}-300`}
        >
          {tag.tag_value}
        </div>
      ))}
    </div>
  );
};
