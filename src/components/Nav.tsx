import axios from "axios";
import React, { useEffect, useState }  from "react";

const Nav = () => {
    const [user, setUser] = useState({
        first_name: ''
    });

    // analogous to componentDidMount
    useEffect(() => {
        // function in useEffect cannot be async, hence this nested implementation with anon function
        (
            async () => {
                const {data} = await axios.get("user")

                if (data.id) {
                    setUser(data);
                }
            }
        )();
    }, []);
    // second argument is dependency list, rerender if any [object] changes
    // as this is empty, this will run once

    return (
        <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" href="#">Company name</a>

            <ul className="my-2 my-md-0 mr-md-3">
                <a href="#" className="p2 text-white text-decoration-none">{user.first_name}</a> 
                <a href="#" className="p-2 text-white">Sign out</a>
            </ul>
        </nav>
    )
}

export default Nav;