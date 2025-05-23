import { Link } from "react-router-dom";
import { RegisterForm } from "../components/Register-Form";

function SignUp() {
    return (
        <div 
            className="max-w-lg bg-neutral-400/20 border border-neutral-400/50 p-6 md:p-12 mx-auto my-4 md:my-20 space-y-6 shadow-sm"
        >
            <div className="space-y-1">
                <h1 className="text-2xl font-semibold text-mainOrange">Sign Up</h1>
                <p className="text-sm">Create you account now! Enjoy the exclusive experience.</p>
            </div>
            <RegisterForm />
            <p className="text-sm text-center">Already have an account? 
                <Link to="/login" className="font-semibold ml-1 hover:text-mainOrange transition-colors delay-120">Log In</Link>
            </p>
        </div>
    )
}

export default SignUp;