// import { getTitles } from "./apis"
// import { useState, useEffect } from "react"

import { Outlet } from "react-router-dom";
import { Navbar } from "./components/Navbar";

function App() {
    // const [titles, setTitles] = useState([]);

    // const getData = async () => {
    //     const data = await getTitles();
    //     setTitles(data); // Set the fetched titles directly to the state
    // };

    // useEffect(() => {
    //     getData(); // Fetch data and set titles on component mount
    // }, []);

    return (
        <div className="min-h-screen flex flex-col justify-between">
            <header>
                <Navbar />
            </header>
            <main className="flex-grow">
                <Outlet />
            </main>
            <footer>
                <p>2024 &#169; All Rights Reserved</p>
            </footer>
        
        </div>
    );
}

export default App