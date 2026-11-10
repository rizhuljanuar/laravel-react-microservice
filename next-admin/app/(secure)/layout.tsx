import Menu from "@/components/Menu";
import Navigation from "@/components/Navigation";

export default function SecureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navigation />

      <div className="container-fluid">
        <div className="row">
          <Menu />
          {children}
        </div>
      </div>
    </>
  );
}
