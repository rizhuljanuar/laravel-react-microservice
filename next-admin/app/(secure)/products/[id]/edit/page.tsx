import ProductEdit from "@/components/ProductEdit";

export const instant = false;

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <ProductEdit id={parseInt(id, 10)} />;
}
