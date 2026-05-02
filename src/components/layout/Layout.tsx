import {Outlet} from "react-router";
import {Header} from "@/components/layout/Header.tsx";
import {Footer} from "@/components/layout/Footer.tsx";

export function Layout() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header/>
      <main className="flex flex-col grow">
        <Outlet/>
      </main>
      <Footer/>
    </div>
  );
}
