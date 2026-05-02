import {Outlet} from "react-router";
import {Header} from "@/components/layout/Header.tsx";

export function Layout() {
  return (
    <div className="min-h-screen bg-background">
      <Header/>
      <main className="mx-auto px-16">
        <Outlet/>
      </main>
    </div>
  );
}
