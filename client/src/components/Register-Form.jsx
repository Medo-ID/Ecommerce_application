import { useState } from "react";
import { registerUser } from "../apis/auth";
import { useNavigate } from "react-router-dom";
import { Spinner } from "./Spinner";
import { GitHubButton } from "./Github-Button";

export const RegisterForm = () => {
    const navigate = useNavigate();
    const [userObj, setUserObj] = useState({
        full_name: "",
        email: "",
        password: "",
        confirm_password: ""
    });
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserObj((prev) => ({ ...prev, [name]: value }))
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        
        const res = await registerUser(userObj)
        
        if (!res.success) {
            setErrors(Array.isArray(res.error) ? res.error : [res.error])
        } else {
            localStorage.setItem("success_register", res.message)
            navigate('/login')
        }
        setIsLoading(false)
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto md:p-4 space-y-6">
                {/* Full Name */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="full_name" className="text-sm font-medium text-gray-700 ml-1">Full Name</label>
                    <input
                        type="text"
                        name="full_name"
                        required
                        value={userObj.full_name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className="px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-mainOrange transition-all duration-120"
                        />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700 ml-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        required
                        value={userObj.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-mainOrange transition-all duration-120"
                        />
                </div>

                {/* Password */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="password" className="text-sm font-medium text-gray-700 ml-1">Password</label>
                    <input
                        type="password"
                        name="password"
                        required
                        value={userObj.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        className="px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-mainOrange transition-all duration-120"
                        />
                </div>

                {/* Confirm Password */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="confirm_password" className="text-sm font-medium text-gray-700 ml-1">Confirm Password</label>
                    <input
                        type="password"
                        name="confirm_password"
                        required
                        value={userObj.confirm_password}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                        className="px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-mainOrange transition-all duration-120"
                        />
                </div>

                {errors ? (
                    <ul>
                        {errors && errors.map((error, index) => (
                            <li 
                            key={index} 
                            className="text-xs text-red-600 font-light"
                            >
                                {error}
                            </li>
                        ))}
                    </ul>
                ) : 
                null}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 mt-6 bg-neutral-900 text-white font-semibold rounded-md hover:bg-mainOrange/90 transition-all duration-120"
                    >
                    {isLoading ? <Spinner /> : "Sign up"}
                </button>
            </form>

            {/* Separator */}
            <div className="flex items-center my-6">
                <div className="flex-grow h-px bg-gray-300"></div>
                <span className="px-3 text-sm text-gray-500 font-medium">Or</span>
                <div className="flex-grow h-px bg-gray-300"></div>
            </div>

            {/* Auth 2.0 */}
            <div className='max-w-lg mx-auto md:px-4'>
                <GitHubButton />
            </div>

        </>
    );
};