import Dashboard from "@/components/Dashboard";
import Menu from "@/components/Menu";
import Navigation from "@/components/Navigation";

export default function Page() {
  return (
    <>
      <Navigation />
      <div className="container-fluid">
        <div className="row">
          <Menu />
          <Dashboard />
        </div>
      </div>
    </>
  );
}
