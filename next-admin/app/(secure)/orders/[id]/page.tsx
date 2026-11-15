import OrderItems from "@/components/OrderItems";

export const instant = false;

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <OrderItems id={parseInt(id, 10)} />;
}
