import { getTitles } from "./apis"
import { useState, useEffect } from "react"

function App() {
    const [titles, setTitles] = useState([]);

    const getData = async () => {
        const data = await getTitles();
        setTitles(data); // Set the fetched titles directly to the state
    };

    useEffect(() => {
        getData(); // Fetch data and set titles on component mount
    }, []);

    return (
        <div className='flex flex-col justify-between items-center gap-8'>
            <h1 className='text-xl font-semibold text-neutral-950'>Titles</h1>
            <ul>
                {titles.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
}

export default App