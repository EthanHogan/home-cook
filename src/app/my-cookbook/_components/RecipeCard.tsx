import { Trash } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import type { Recipe } from "~/server/db/schema";

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
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
}
