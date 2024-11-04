import { Outlet } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Toaster } from 'sonner';

function App() {
    return (
        <div className="min-h-screen flex flex-col justify-between">
            <Toaster position="top-right" expand={false} />
            <header>
                <Navbar />
            </header>
            <main className="flex-grow">
                <Outlet />
            </main>
            <footer>
                <p className="text-center p-2">2024 &#169; All Rights Reserved</p>
            </footer>
        
        </div>
    );
}

export default App