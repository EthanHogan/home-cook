import { Breadcrumbs } from "~/components/breadcrumbs";

type Props = {
  params: {
    catchAll: string[];
  };
};
export default async function BreadcrumbSlot({ params }: Props) {
  const { catchAll } = await params;
  return <Breadcrumbs routes={catchAll} />;
}
