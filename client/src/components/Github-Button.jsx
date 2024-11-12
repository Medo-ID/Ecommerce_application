import { useState } from "react";
import { Github } from "lucide-react";
import { Spinner } from "./Spinner";

export const GitHubButton = () => {
    const [isLoading, setIsLoading] = useState(false)
    const { REACT_APP_ENV, REACT_APP_PROD_URL, REACT_APP_DEV_URL } = process.env;
    const url = REACT_APP_ENV === 'production' ? REACT_APP_PROD_URL : REACT_APP_DEV_URL;

    // Redirects to GitHub authentication
    const handleSubmit = () => {
        try {
            setIsLoading(true)
            window.location.href = `${url}/auth/github`
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
