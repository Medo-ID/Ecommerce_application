import { Outlet } from "react-router-dom";
import { Navbar } from "./components/Nav-Bar";
import { Toaster } from 'sonner';
import { MainFooter } from "./components/Main-Footer";

function App() {
    return (
        <div className="min-h-screen flex flex-col justify-between">
            <Toaster position="top-right" expand={false} richColors closeButton />         
            <header>
                <Navbar />
            </header>
            <main className="flex-grow">
                <Outlet />
            </main>
            <footer className="bg-mainTeal/90 border border-mainTeal/25 h-fit">
                <MainFooter />
                <p className="text-center p-4 text-xs text-neutral-200 border-t border-neutral-200 container mx-auto">
                    &#169; 2024 Studios . All Rights Reserved . 
                    <a href="https://medo7id.com" className="text-neutral-900 ml-1">Mohamed Idaghdour</a>
                </p>
            </footer>
        </div>
    );
}

export default App