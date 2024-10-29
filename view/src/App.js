import { Outlet } from "react-router-dom";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <div className="w-full min-h-screen flex flex-col justify-between mx-auto">
      <header className="flex-none">
        <Navbar />
      </header>
      <main className="grow">
        <Outlet />
      </main>
      <footer>
        <p className="flex-none bg-neutral-900 text-white py-2 font-light text-sm text-center">2024 &#169; All Rights Riserved</p>
      </footer>
    </div>
  );
}

export default App;
