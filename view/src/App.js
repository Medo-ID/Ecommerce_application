import { Outlet } from "react-router-dom";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <div className="w-full min-h-screen flex flex-col justify-between mx-auto">
      <header className="App-header">
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <p className="text-center">2024 &#169; All Rights Riserved</p>
      </footer>
    </div>
  );
}

export default App;
