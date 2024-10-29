import { useState } from "react";
import { redirect } from "react-router-dom";
import { registerUser } from "../apis/auth";

function SignUp() {
    const [userObject, setUserObject] = useState({
        full_name: "",
        email: "",
        phone_number: "",
        password: "",
        confirm_password: ""
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const res = await registerUser(userObject);

        if (!res.ok) {
            setError(res.message);
            setIsLoading(false);
            return;
        }

        // Store success message in localStorage
        localStorage.setItem("successMessage", res.message);
        setIsLoading(false);
        
        // Redirect to the login page
        return redirect("/login");
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserObject((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="flex flex-col gap-6 md:gap-20 w-max mx-auto">  
            <div className="flex flex-col justify-center items-center gap-2 mt-10">
                <h1 className="font-bold text-xl">Welcome</h1>
                <p className="text-sm">Create your account now. Enjoy your journey in our store!</p> 
            </div>
            <form onSubmit={handleSubmit} className="bg-white mx-auto w-full p-4 rounded-md space-y-5">
                <h2 className="text-center text-lg font-semibold">Sign Up</h2>
                <hr />
                {error && <p className="text-center text-sm font-medium text-red-600">{error}</p>}
                <div className="flex flex-col gap-2 w-full text-sm">
                    <label htmlFor="full_name">Full Name</label>
                    <input 
                        type="text" 
                        name="full_name" 
                        required 
                        className="w-full px-2 bg-neutral-100 border border-neutral-200 rounded-md h-9" 
                        value={userObject.full_name}
                        onChange={handleChange}
                    />
                </div>

                <div className="flex flex-col gap-2 w-full text-sm">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        required 
                        className="w-full px-2 bg-neutral-100 border border-neutral-200 rounded-md h-9" 
                        value={userObject.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="flex flex-col gap-2 w-full text-sm">
                    <label htmlFor="phone_number">Phone Number</label>
                    <input
                        type="tel"
                        name="phone_number"
                        className="w-full px-2 bg-neutral-100 border border-neutral-200 rounded-md h-9"
                        value={userObject.phone_number}
                        onChange={handleChange}
                    />
                </div>

                <div className="flex flex-col gap-2 w-full text-sm">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        required
                        minLength="6"
                        className="w-full px-2 bg-neutral-100 border border-neutral-200 rounded-md h-9"
                        value={userObject.password}
                        onChange={handleChange}
                    />
                </div>

                <div className="flex flex-col gap-2 w-full text-sm">
                    <label htmlFor="confirm_password">Confirm Password</label>
                    <input
                        type="password"
                        name="confirm_password"
                        required
                        className="w-full px-2 bg-neutral-100 border border-neutral-200 rounded-md h-9"
                        value={userObject.confirm_password}
                        onChange={handleChange}
                    />
                </div>

                <button 
                    type="submit"
                    className="w-full bg-neutral-950 py-2 text-white rounded-md cursor-pointer hover:bg-neutral-100 hover:text-neutral-900 border border-transparent transition-all"
                    disabled={isLoading}
                >
                    {isLoading ? "Signing up..." : "Sign Up"}
                </button>
            </form>
        </div>
    );
}

export default SignUp;
