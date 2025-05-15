import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from "./components/Sidebar";

function App() {

    useEffect(() => {
        populateWeatherData();
    }, []);


    return (

        <div className="flex">
            <Sidebar />
            <main className="justify-content-end ">
                {/* You can render task lists/cards here */}
                <h1>My Tasks</h1>
            </main>
        </div>
    );
    
    async function populateWeatherData() {
        const response = await fetch('weatherforecast');
        if (response.ok) {
            const data = await response.json();
            console.log(data);
        }
    }
}

export default App;