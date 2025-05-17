import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from "./Components/Sidebar/Sidebar";
import '../src/App.css';
import Dashboard from './Components/Dashboard/Dashboard'

function App() {

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
                    <Dashboard />
                </div>

            </div>
        </div>
    );

}

export default App;