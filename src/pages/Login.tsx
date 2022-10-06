import axios from 'axios';
import React, { SyntheticEvent, useState } from 'react'
import { Navigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault()
        
        const { status, data } = await axios.post("login", {
            email: email,
            password: password
        });
        // `withCredentials` to get cookie, defined in `index.tsx`

        console.log(data)

        if (status === 200) {
            setRedirect(true);
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />;
    }
    
    return (
        <main className="form-signin">
            <form onSubmit={submit}>
                <h1 className="h3 mb-3 fw-normal">Login</h1>

                <input type="email" className="form-control" placeholder="Email" required
                        onChange={e => setEmail(e.target.value)}
                />

                <input type="password" className="form-control" placeholder="Password" required
                        onChange={e => setPassword(e.target.value)}
                />

                <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
            </form>
        </main>
    )
}

export default Login;