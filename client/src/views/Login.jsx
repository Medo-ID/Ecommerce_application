import { Link } from 'react-router-dom';
import { LoginForm } from '../components/Login-Form';

function Login() {
    return (
        <div 
            className="max-w-lg p-6 md:p-12 mx-auto my-4 md:my-20 space-y-6 bg-white shadow-sm rounded-xl"
        >
            <div className="space-y-1">
                <h1 className="text-2xl font-semibold text-mainOrange">Log In</h1>
                <p className="text-sm">Welcome back! We are happy to see you again.</p>
            </div>
            <LoginForm />
            <p className="text-sm text-center">You don't have an account? 
                <Link to="/signup" className="font-semibold ml-1 hover:text-mainOrange transition-colors delay-120">Sign up</Link>
            </p>
        </div>
    )
}

export default Login;