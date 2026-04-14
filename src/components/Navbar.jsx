import { Link } from "react-router-dom";


function Navbar() {

    return (
        <nav className="w-full shadow-md bg-white px-6 py-4 flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-orange-500">MakeMyPuzzle</Link>
           
            <div className="flex gap-6 text-gray-700 font-medium">
                <Link to="/" className="hover:text-orange-500 transition">Home</Link>
                <Link to="/play" className="hover:text-orange-500 transition">Play</Link>
            </div>



        </nav>
    )
}

export default Navbar;
