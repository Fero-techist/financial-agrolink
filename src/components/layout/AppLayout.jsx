import { Outlet } from "react-router-dom";
import Sidebar from "../shared/Sidebar";
import Navbar from "../shared/Navbar";
import MobileNavigation from "../shared/MobileNavigation";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-transparent">
      <Sidebar />

      <div className="min-h-screen md:pl-64">
        <Navbar />

        <main className="w-full px-4 pb-28 pt-6 sm:px-7 sm:pb-10 sm:pt-8 md:py-8 lg:px-10">
          <div className="mx-auto w-full max-w-[90rem]">
            <div className="page-shell">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
      <MobileNavigation />
    </div>
  );
}
