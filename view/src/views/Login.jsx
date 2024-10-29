import { useState } from "react";
import { loginUser } from "../apis/auth";
import { redirect } from "react-router-dom";

function Login() {
    const [userLogin, setUserLogin] = useState({
        email: "",
        password: "",
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        
        // Simulate API login call (add actual login functionality here)
        try {
            // Example of login logic - replace with real API call
            const res = await loginUser(userLogin);
            if (!res.ok) {
                setError(res.message);
            } else {
                // Redirect to home or dashboard on successful login
                localStorage.setItem("successMessage", res.message);
                return redirect("/");
            }
        } catch (err) {
            setError("Login failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-6 md:gap-20 w-max mx-auto">  
            <div className="flex flex-col justify-center items-center gap-2 mt-10">
                <h1 className="font-bold text-xl">Welcome Back</h1>
                <p className="text-sm">Access your account now. Enjoy your journey in our store!</p> 
            </div>

            <form 
                onSubmit={handleSubmit}
                className="bg-white mx-auto w-full p-4 rounded-md space-y-5"
            >
                <h2 className="text-center text-lg font-semibold">Login</h2>
                <hr />

                {error && <p className="text-sm font-medium text-red-600">{error}</p>}
                
                <div className="flex flex-col justify-center items-start gap-2 w-full text-sm">
                    <label className="ml-1">Email</label>
                    <input 
                        className="w-full px-2 bg-neutral-100 border border-neutral-200 rounded-md h-9" 
                        type="email" 
                        name="email" 
                        required 
                        onChange={(e) => setUserLogin(prev => ({...prev, email: e.target.value}))}
                    />
                </div>
                
                <div className="flex flex-col justify-center items-start gap-2 w-full text-sm">
                    <label className="ml-1">Password</label>
                    <input
                        className="w-full px-2 bg-neutral-100 border border-neutral-200 rounded-md h-9" 
                        type="password"
                        name="password"
                        required 
                        onChange={(e) => setUserLogin(prev => ({...prev, password: e.target.value}))}
                    />
                </div>

                <input 
                    className="w-full bg-neutral-950 py-2 text-white rounded-md cursor-pointer hover:bg-neutral-100 hover:text-neutral-900 hover:border hover:border-neutral-800 transition-all delay-120"
                    disabled={isLoading}
                    type="submit" 
                    value={isLoading ? "Logging in..." : "Login"}
                />
            </form>    
        </div>
    );
}

export default Login;