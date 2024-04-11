import { Outlet, Link } from 'react-router-dom';

export default function MainScreen(){
    return( 
            <>
                <nav>
                    <Link className="chip" to="/1">Home</Link>
                    <Link className="chip" to="/about">About</Link>
                </nav>
                <Outlet/>
            </>
    )
}