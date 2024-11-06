import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../apis/auth";
import { useAuth } from "../hooks/authContext";
import { toast } from "sonner";
import { Spinner } from "./Spinner";

export const LoginForm= () => {
    const navigate = useNavigate();
    const { checkAuthStatus } = useAuth();
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        const message = localStorage.getItem("success_login")
        if (message) {
            toast.success(message)
        }
        localStorage.removeItem("success_login")
    }, []);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)

        const res = await loginUser(credentials)

        if (!res.success) {
            setErrors(Array.isArray(res.error) ? res.error : [res.error])
        } else {
            checkAuthStatus()
            navigate('/')
        }
        setIsLoading(false)
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
                disabled={isLoading}
                className="w-full py-3 mt-4 bg-neutral-900 text-white font-semibold rounded-md hover:bg-mainOrange/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mainOrange transition-all duration-200"
            >
                {isLoading ? <Spinner /> : "Log in"}
            </button>
            {errors ? (
                <ul>
                    {errors?.map((error, index) => 
                        <li 
                            key={index}
                            className="text-xs text-red-600 font-light"
                        >
                            {error}
                        </li>
                    )}
                </ul>
            ) : 
                null
            }
        </form>
    );
};