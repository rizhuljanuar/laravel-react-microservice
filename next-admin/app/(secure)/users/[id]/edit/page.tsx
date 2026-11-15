import UserEdit from "@/components/UserEdit";

export const instant = false;

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <UserEdit id={parseInt(id, 10)} />;
}
