import { useState } from "react";

export const LoginForm= () => {
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add submit logic here
        console.log("User logged in:", credentials);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto md:p-4 space-y-6">
            {/* Email */}
            <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-sm font-medium text-gray-700 ml-1">Email</label>
                <input
                    type="email"
                    name="email"
                    required
                    value={credentials.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-mainOrange transition-all duration-200"
                />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1">
                <label htmlFor="password" className="text-sm font-medium text-gray-700 ml-1">Password</label>
                <input
                    type="password"
                    name="password"
                    required
                    value={credentials.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-mainOrange transition-all duration-200"
                />
            </div>

            <button
                type="submit"
                className="w-full py-3 mt-4 bg-neutral-950 text-white font-semibold rounded-md hover:bg-mainOrange/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mainOrange transition-all duration-200"
            >
                Sign up
            </button>
        </form>
    );
};