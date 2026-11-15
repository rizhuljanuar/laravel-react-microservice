import RoleEdit from "@/components/RoleEdit";

export const instant = false;

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <RoleEdit id={parseInt(id, 10)} />;
}
