import { useState, useEffect } from "react";
import { Github } from "lucide-react";
import { Spinner } from "./Spinner";

export const GitHubButton = () => {
    const [isLoading, setIsLoading] = useState(false)

    // Redirects to GitHub authentication
    const handleSubmit = () => {
        try {
            setIsLoading(true)
            window.location.href = 'http://localhost:3000/auth/github'
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <button
            onClick={handleSubmit}
            type="button"
            disabled={isLoading}
            className="w-full py-3 mt-4 font-semibold rounded-md flex justify-center items-center gap-2 bg-neutral-900 text-white hover:bg-mainTeal transition duration-200 ease-in-out"
        >
            {isLoading ? (
                <div className="flex items-center gap-2">
                    <Spinner className="h-5 w-5" /> 
                    <span>Signing in...</span>
                </div>
            ) : (
                <>
                    <span>Sign in with Github</span>
                    <Github className="fill-white" size={18} />
                </>
            )}
        </button>
    );
};
