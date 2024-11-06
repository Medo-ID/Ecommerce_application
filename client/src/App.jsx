import { Outlet } from "react-router-dom";
import { Navbar } from "./components/Nav-Bar";
import { Toaster } from 'sonner';
import { MainFooter } from "./components/Main-Footer";

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
            <footer className="bg-mainTeal text-neutral-100 h-fit">
                <MainFooter />
                <p className="text-center p-4 text-xs border-t border-neutral-200 container mx-auto">
                    &#169; 2024 Studios . All Rights Reserved . 
                    <a href="https://medo7id.com" className="text-neutral-950 ml-1">Mohamed Idaghdour</a>
                </p>
            </footer>
        </div>
    );
}

export default App