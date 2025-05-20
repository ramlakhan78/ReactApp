import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from "./Components/Sidebar/Sidebar";
import '../src/App.css';
import Dashboard from './Components/Dashboard/Dashboard'
import Header from './Components/Header/Header';
import { MyContextProvider } from './global/MyContext';

function App() {

    return (
        <MyContextProvider>
            <Header />
            <div className="d-flex main">
                <Sidebar />
                <Dashboard />
            </div>
        </MyContextProvider>
    );

}

export default App;