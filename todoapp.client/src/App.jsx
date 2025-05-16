import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from "./components/Sidebar";
import '../src/App.css';

import { EllipsisVertical } from "lucide-react";

function App() {

    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    useEffect(() => {
        /*populateWeatherData();*/
    }, []);


    return (

        <div>
            <div className="menu-toggle w-100">
                <div className="row">
                    <div className="col-2">
                        {/*<button><Menu /></button>*/} <span>React App</span>
                    </div>
                    <div className="col-10">
                    </div>
                </div>
            </div>
            <div className="d-flex main">

                <div className="sidebarWrapper">
                    <Sidebar />
                </div>

                <div className="content">
                    {/* You can render task lists/cards here */}

                    <div className="task-scroll-container">
                        <div className="task-scroll">

                            <div className="task-card">
                                <div className="task-card-header">
                                    <h4>title</h4>
                                    <div className="task-menu" onClick={toggleMenu} tabIndex={0} role="button" aria-label="Open menu">
                                        <EllipsisVertical />
                                        {menuOpen && (
                                            <div className="submenu">
                                                <div className="submenu-section">
                                                    <div className="submenu-title">Sort by</div>
                                                    <div className="submenu-item">My order</div>
                                                    <div className="submenu-item">Date</div>
                                                    <div className="submenu-item">Starred recently</div>
                                                    <div className="submenu-item">Title</div>
                                                </div>
                                                <div className="submenu-divider" />
                                                <div className="submenu-item">Rename list</div>
                                                <div className="submenu-item">Delete list</div>
                                                <div className="submenu-item">Move list to first position</div>
                                                <div className="submenu-divider" />
                                                <div className="submenu-item">Print list</div>
                                                <div className="submenu-item disabled">Delete all completed tasks</div>
                                                <div className="submenu-item disabled">Clean up old tasks</div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <p>No tasks yet</p>
                                <p>No tasks yet</p>
                                {/* Add more tasks or empty states */}
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );

}

export default App;