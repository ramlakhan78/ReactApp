/*import { useState } from "react";*/
import { Menu } from "lucide-react";
import ListSection from "./ListSection";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/Css/sidebar.css'

export default function Sidebar() {
    /*const [collapsed, setCollapsed] = useState(false);*/

    return (
        <aside className="flex justify-content-start sidebar">
            <button><Menu/></button>
        </aside>
    );
}

function SidebarItem({ label, selected }) {
    return (
        <div className={`flex items-center px-3 py-2 rounded cursor-pointer ${selected ? "bg-blue-700" : "hover:bg-gray-700"}`}>
            <span>{label}</span>
        </div>
    );
}
