import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const MainLayout = () => {
    return (
        <>
            <Navbar />
            <main className="min-h-screen flex">
                <aside className="flex-shrink-0">
                    <Sidebar />
                </aside>
                <Outlet />
            </main>
        </>
    )
}

export default MainLayout;