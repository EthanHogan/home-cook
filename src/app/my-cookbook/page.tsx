import { auth } from "@clerk/nextjs/server";

export default async function MyCookbookPage() {
  // redirects to sign in if not authenticated
  const { userId } = await auth.protect();

  console.log("userId", userId);

  return (
    <div className="container">
      <h1 className="text-5xl font-bold">My Cookbook</h1>
      <em>List of personal recipes</em>
    </div>
  );
}
