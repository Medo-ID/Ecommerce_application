import { Link } from "react-router-dom"

export const Navbar = () => {
    const links = [
        {
            name: "Home",
            path: "/"
        },
        {
            name: "Products",
            path: "Products"
        }
    ]
    return (
        <nav className="flex justify-between items-center w-full border-b border-neutral-900 px-1 md:px-4">
            <h1 className="text-xl font-extrabold">NextStore</h1>
            <div className="flex justify-around gap-4">
                <ul className="space-x-4">
                    {
                    links.map(link => <Link
                            className="text-base font-light"
                            to={link.path}
                        >
                            {link.name}
                        </Link>
                    )}
                </ul>
                <Link to="/login">Log In</Link>
                <Link to="/signup">Sign Up</Link>
            </div>
        </nav>
    )
}