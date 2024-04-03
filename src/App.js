import { Outlet, Link } from 'react-router-dom';

export default function MainScreen(){
    return( 
            <>
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/1">1</Link>
                </nav>
                <Outlet/>
            </>
    )
}