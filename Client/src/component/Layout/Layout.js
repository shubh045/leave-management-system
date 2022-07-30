import Navbar from "../Navbar/navbar"
import {Outlet} from "react-router-dom"
import Profile from "../Profile/Profile"
import "./Layout.css"

const Layout = () => {

    return(
        <>
            <Navbar />
            <main>
                <Profile />
                <div className="container">
                    <Outlet />
                </div>

            </main>
        </>
    )
}

export default Layout;