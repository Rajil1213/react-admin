import axios from "axios";
import React, { useEffect, useState }  from "react";
import { Link } from "react-router-dom";
import { User } from "../models/user";

const Nav = () => {
    const [user, setUser] = useState(new User());

    // analogous to componentDidMount
    useEffect(() => {
        // function in useEffect cannot be async, hence this nested implementation with anon function
        (
            async () => {
                const {data} = await axios.get("user")

                if (data.id) {
                    setUser(new User(
                        data.id,
                        data.first_name,
                        data.last_name,
                        data.email
                    ));
                }
            }
        )();
    }, []);
    // second argument is dependency list, rerender if any [object] changes
    // as this is empty, this will run once

    const logout = async () => {
        await axios.post("logout", {});
    }

    return (
        <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" href="#">Company name</a>

            <ul className="my-2 my-md-0 mr-md-3">
                <Link to="/profile" className="p2 text-white text-decoration-none">{user.name}</Link> 
                <Link to="/login" className="p-2 text-white" 
                    onClick={logout}
                >Sign out</Link>
            </ul>
        </nav>
    )
}

export default Nav;